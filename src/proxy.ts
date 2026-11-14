import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GATEWAY_COOKIE = 'nippon_gateway_pass';
const DEFAULT_ACCESS_KEY = 'nippon2026';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const expectedKey = process.env.PORTAL_ACCESS_KEY || DEFAULT_ACCESS_KEY;
  const hasGatewayPass = request.cookies.get(GATEWAY_COOKIE)?.value === 'unlocked';
  const hasAdminSession = Boolean(request.cookies.get('nippon_admin_session')?.value);

  // 1. IF GATEWAY IS ALREADY UNLOCKED (OR ACTIVE ADMIN SESSION):
  // Allow full seamless access to both /team-portal and /admin
  if (hasGatewayPass || hasAdminSession) {
    if (pathname.startsWith('/team-portal')) {
      const internalPath = pathname.replace(/^\/team-portal/, '/admin') || '/admin';
      return NextResponse.rewrite(new URL(internalPath, request.url));
    }
    return NextResponse.next();
  }

  // 2. SECRET KEY UNLOCK (?access=nippon2026 or ?key=nippon2026):
  // Works on both /team-portal and /admin when the secret key is provided
  const providedKey = searchParams.get('access') || searchParams.get('key');
  if (providedKey && providedKey === expectedKey) {
    const targetPath = pathname.startsWith('/admin') ? '/team-portal' : pathname;
    const cleanUrl = new URL(targetPath, request.url);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(GATEWAY_COOKIE, 'unlocked', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    return response;
  }

  // 3. UNINVITED / UNAUTHORIZED REQUESTS:
  // Anyone hitting /admin or /team-portal without the key gets a 404 Not Found
  if (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/team-portal' ||
    pathname.startsWith('/team-portal/') ||
    pathname.startsWith('/api/admin/')
  ) {
    return NextResponse.rewrite(new URL('/not-found', request.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/team-portal/:path*',
    '/api/admin/:path*',
  ],
};
