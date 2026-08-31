import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  isLiveVehicleExperienceRequest,
  livePathForRequest,
  liveVehicleExperienceResponse,
  isLiveVirtualShowroomRequest,
  liveVirtualShowroomResponse,
  shouldUseLivePageProxy,
} from '@/lib/livePageProxy';

export async function proxy(request: NextRequest) {
  if (!shouldUseLivePageProxy(request)) {
    return NextResponse.next();
  }

  if (request.method === 'GET' && request.headers.get('accept')?.includes('text/html') && isLiveVehicleExperienceRequest(request)) {
    return liveVehicleExperienceResponse(request);
  }

  if (request.method === 'GET' && request.headers.get('accept')?.includes('text/html') && isLiveVirtualShowroomRequest(request)) {
    return liveVirtualShowroomResponse(request);
  }

  return NextResponse.rewrite(livePathForRequest(request));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|sitemap.xml|robots.txt).*)',
  ],
};
