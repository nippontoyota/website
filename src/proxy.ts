import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GATEWAY_COOKIE = 'nippon_gateway_pass';
const DEFAULT_ACCESS_KEY = 'nippon2026';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const expectedKey = process.env.PORTAL_ACCESS_KEY || DEFAULT_ACCESS_KEY;

  // 1. HARD BLOCK ON /admin:
  // Any public hit directly on /admin or /admin/* receives an immediate 404 Not Found.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.rewrite(new URL('/not-found', request.url), { status: 404 });
  }

  // 2. PROTECT /api/admin/* FROM EXTERNAL PROBING:
  // Reject calls to admin APIs unless the gateway is unlocked
  if (pathname.startsWith('/api/admin/')) {
    const hasGatewayPass = request.cookies.get(GATEWAY_COOKIE)?.value === 'unlocked';
    const hasAdminSession = request.cookies.get('nippon_admin_session')?.value;
    if (!hasGatewayPass && !hasAdminSession) {
      return NextResponse.rewrite(new URL('/not-found', request.url), { status: 404 });
    }
  }

  // 3. SECRET PORTAL GATEWAY:
  // Gated behind both the secret path (/team-portal) and secret access parameter (?access=...)
  if (pathname === '/team-portal' || pathname.startsWith('/team-portal/')) {
    const providedKey = searchParams.get('access') || searchParams.get('key');
    const hasGatewayPass = request.cookies.get(GATEWAY_COOKIE)?.value === 'unlocked';

    // Step A: If the secret key parameter is provided and matches, unlock gateway
    if (providedKey && providedKey === expectedKey) {
      const cleanUrl = new URL(pathname, request.url);
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

    // Step B: If gateway is NOT unlocked, render 404 Not Found
    // (An outsider guessing the URL still sees a 404 Not Found error)
    if (!hasGatewayPass) {
      return NextResponse.rewrite(new URL('/not-found', request.url), { status: 404 });
    }

    // Step C: When gateway is unlocked, map internally to the admin route handlers
    const internalPath = pathname.replace(/^\/team-portal/, '/admin') || '/admin';
    return NextResponse.rewrite(new URL(internalPath, request.url));
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
