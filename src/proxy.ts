import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. If someone visits /admin directly, redirect to /team-portal
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const target = pathname.replace(/^\/admin/, '/team-portal') || '/team-portal';
    return NextResponse.redirect(new URL(target, request.url));
  }

  // 2. Seamlessly route /team-portal to internal /admin app routes
  if (pathname.startsWith('/team-portal')) {
    const internalPath = pathname.replace(/^\/team-portal/, '/admin') || '/admin';
    return NextResponse.rewrite(new URL(internalPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/team-portal/:path*',
  ],
};
