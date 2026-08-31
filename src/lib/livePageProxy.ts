import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const liveOrigin = 'https://www.nippon-toyota.com';

const liveVehicleRoutePattern = /^\/virtual-showroom\/(?:glanza|urbancruisertaisor|urbancruiserhyryder|urbancruiserebella|innovacrysta|innova|hilux|fortuner|legender|camry|vellfire|lc300|rumion)\.html$/i;
const liveVirtualShowroomRoutePattern = /^\/virtual-showroom\/?$/i;
const localVehicleDetailRoutePattern = /^\/virtual-showroom\/(?:glanza|urban-cruiser-taisor|urban-cruiser-hyryder|urban-cruiser-ebella|innova-crysta|innova-hycross|hilux|fortuner|legender|camry|vellfire|land-cruiser-300|rumion)$/i;
const localVehicleLegacyRoutePattern = /^\/virtual-showroom\/(?:glanza|urbancruiser|urbancruisertaisor|urbancruiserhyryder|urbancruiserebella|innovacrysta|innova|hilux|fortuner|legender|camry|vellfire|lc300|rumion)\.html$/i;

const virtualShowroomViewportPatch = `
<style id="nippon-virtual-showroom-viewport-patch">
  html,
  body {
    width: 100%;
    height: 100%;
    min-width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    background: #000 !important;
  }

  #header,
  #footer,
  #snav,
  footer,
  .footer,
  .tutorial {
    display: none !important;
  }

  .page-wrap,
  #one3d,
  .pnlm-container {
    width: 100% !important;
    max-width: 100vw !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .page-wrap,
  #one3d,
  .pnlm-container {
    height: 100dvh !important;
  }

  #nippon-showroom-nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 1000001;
    display: flex;
    height: 72px;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 0 clamp(20px, 4vw, 72px);
    color: #fff;
    background: linear-gradient(180deg, rgba(0, 0, 0, .82), rgba(0, 0, 0, .42), transparent);
    font-family: Arial, sans-serif;
  }

  #nippon-showroom-nav a {
    color: inherit;
    text-decoration: none;
  }

  .nippon-showroom-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-width: max-content;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  .nippon-showroom-brand-mark {
    display: grid;
    width: 25px;
    height: 25px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, .7);
    border-radius: 50%;
    font-size: 10px;
    letter-spacing: 0;
  }

  .nippon-showroom-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(18px, 3vw, 42px);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .15em;
    text-transform: uppercase;
  }

  .nippon-showroom-links a {
    opacity: .72;
    transition: opacity 160ms ease-out;
  }

  .nippon-showroom-links a:hover,
  .nippon-showroom-links a:focus-visible {
    opacity: 1;
  }

  .nippon-showroom-book {
    min-width: max-content;
    padding: 11px 15px;
    background: #ed1b2f;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  #nippon-showroom-guide {
    position: fixed;
    z-index: 1000002;
    left: clamp(20px, 5vw, 88px);
    bottom: clamp(24px, 6vh, 72px);
    width: min(360px, calc(100vw - 40px));
    padding: 22px;
    color: #151515;
    background: #fff;
    box-shadow: 0 20px 60px rgba(0, 0, 0, .32);
    font-family: Arial, sans-serif;
  }

  #nippon-showroom-guide[hidden] {
    display: none;
  }

  .nippon-showroom-guide-kicker {
    margin: 0;
    color: #ed1b2f;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  #nippon-showroom-guide h1 {
    margin: 8px 0 10px;
    font-size: 24px;
    line-height: 1.05;
  }

  #nippon-showroom-guide p:last-of-type {
    margin: 0;
    color: #535353;
    font-size: 14px;
    line-height: 1.5;
  }

  #nippon-showroom-guide button {
    width: 100%;
    margin-top: 18px;
    padding: 12px 14px;
    border: 0;
    color: #fff;
    background: #ed1b2f;
    cursor: pointer;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  @media screen and (max-width: 720px) {
    #nippon-showroom-nav {
      height: 60px;
      padding: 0 18px;
    }

    .nippon-showroom-links {
      display: none;
    }

    .nippon-showroom-brand {
      font-size: 10px;
    }

    .nippon-showroom-book {
      padding: 10px 12px;
      font-size: 9px;
    }
  }
</style>`;

const virtualShowroomOverlay = `
<nav id="nippon-showroom-nav" aria-label="Nippon Toyota showroom navigation">
  <a class="nippon-showroom-brand" href="/" aria-label="Nippon Toyota home">
    <span class="nippon-showroom-brand-mark" aria-hidden="true">T</span>
    <span>Nippon Toyota</span>
  </a>
  <div class="nippon-showroom-links">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/service">Service</a>
    <a href="/contact">Contact</a>
  </div>
  <a class="nippon-showroom-book" href="/testdrive">Book a test drive</a>
</nav>
<aside id="nippon-showroom-guide" role="dialog" aria-labelledby="nippon-showroom-guide-title" aria-modal="false">
  <p class="nippon-showroom-guide-kicker">Virtual showroom</p>
  <h1 id="nippon-showroom-guide-title">Drag to look around.</h1>
  <p>Tap an info icon for vehicle details. Use a red 360 button when you are ready to configure a model.</p>
  <button type="button" data-showroom-guide-dismiss>Got it</button>
</aside>
<script>
  (function () {
    var guide = document.getElementById('nippon-showroom-guide');
    if (!guide) return;
    if (sessionStorage.getItem('nippon-showroom-guide-dismissed') === 'true') {
      guide.hidden = true;
      return;
    }
    var dismiss = guide.querySelector('[data-showroom-guide-dismiss]');
    if (dismiss) {
      dismiss.addEventListener('click', function () {
        sessionStorage.setItem('nippon-showroom-guide-dismissed', 'true');
        guide.hidden = true;
      });
    }
  })();
</script>`;

const vehicleViewportPatch = `
<style id="nippon-vehicle-viewport-patch">
  html,
  body {
    width: 100%;
    max-width: 100%;
    min-width: 0 !important;
    overflow-x: hidden !important;
  }

  #one3d,
  .page-wrap,
  .one3d-main-section,
  .one3d-object-wrapper,
  .one3d-object-container {
    width: 100% !important;
    max-width: 100vw !important;
    min-width: 0 !important;
  }

  .one3d-nav-wrapper-desktop {
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    max-width: 100vw !important;
    padding-left: clamp(24px, 4vw, 72px) !important;
    padding-right: clamp(24px, 4vw, 72px) !important;
    overflow-x: auto !important;
    scrollbar-width: none;
    overscroll-behavior-inline: contain;
  }

  .one3d-nav-wrapper-desktop::-webkit-scrollbar {
    display: none;
  }

  .one3d-nav-wrapper-desktop .one3d-nav {
    width: max-content !important;
    min-width: 100% !important;
    justify-content: flex-start !important;
  }

  .one3d-nav-wrapper-desktop .one3d-nav-links {
    flex: 0 0 auto !important;
  }

  #one3dcontent {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  #one3dcontent canvas {
    max-width: 100% !important;
  }

  #rotateDivice,
  .rotateDivice,
  #one3d_rotate_to_landscape,
  #one3d_rotate_to_portrait,
  .one3d-alert-fail {
    display: none !important;
  }

  @media screen and (min-width: 1440px) {
    #one3dcontent canvas {
      transform: translateX(clamp(24px, 4vw, 76px));
    }
  }
</style>`;

const livePathByLocalPath: Record<string, string> = {
  '/virtual-showroom': '/virtual-showroom/index.html?dealer-group=GR034',
  '/service': '/q-service/',
  '/service/full-menu': '/q-service/full-menu/',
  '/loan': '/apply-loan/',
  '/about': '/about-us.html',
  '/contact': '/contact-co01a.html',
  '/disclaimer': '/disclaimer.html',
  '/used-cars': '/used-cars.html',
  '/accessories': '/accessories.html',
  '/events': '/events.html',
  '/driving-school': '/driving-school.html/',
};

export function livePathForRequest(request: NextRequest) {
  const localPath = request.nextUrl.pathname.replace(/\/$/, '') || '/';
  const mappedPath = livePathByLocalPath[localPath] ?? request.nextUrl.pathname;
  const liveUrl = new URL(mappedPath, liveOrigin);

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    if (!liveUrl.searchParams.has(key)) {
      liveUrl.searchParams.append(key, value);
    }
  }

  return liveUrl;
}

export function isLiveVehicleExperienceRequest(request: NextRequest) {
  return liveVehicleRoutePattern.test(request.nextUrl.pathname);
}

export function isLiveVirtualShowroomRequest(request: NextRequest) {
  return liveVirtualShowroomRoutePattern.test(request.nextUrl.pathname);
}

async function liveHtmlResponse(request: NextRequest, viewportPatch: string, bodyOverlay = '') {
  const liveUrl = livePathForRequest(request);
  const upstream = await fetch(liveUrl, {
    headers: {
      accept: request.headers.get('accept') ?? 'text/html',
      'accept-language': request.headers.get('accept-language') ?? 'en-IN,en;q=0.9',
      'user-agent': request.headers.get('user-agent') ?? 'Mozilla/5.0',
    },
  });

  const contentType = upstream.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) {
    return NextResponse.rewrite(liveUrl);
  }

  const html = await upstream.text();
  const htmlWithViewportPatch = html.replace('</head>', `${viewportPatch}</head>`);
  const patchedHtml = bodyOverlay
    ? htmlWithViewportPatch.replace(/<body([^>]*)>/i, `<body$1>${bodyOverlay}`)
    : htmlWithViewportPatch;
  const headers = new Headers(upstream.headers);
  headers.delete('content-length');

  return new NextResponse(patchedHtml, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

export function liveVehicleExperienceResponse(request: NextRequest) {
  return liveHtmlResponse(request, vehicleViewportPatch);
}

export function liveVirtualShowroomResponse(request: NextRequest) {
  return liveHtmlResponse(request, virtualShowroomViewportPatch, virtualShowroomOverlay);
}

export function shouldUseLivePageProxy(request: NextRequest) {
  if (process.env.NIPPON_LIVE_PAGE_PROXY === 'false') return false;
  if (request.nextUrl.pathname === '/') return false;

  // Vehicle pages stay local so their embedded One3D runtime loads from Nippon's
  // original origin. Proxying that runtime breaks its relative asset requests.
  if (localVehicleDetailRoutePattern.test(request.nextUrl.pathname) || localVehicleLegacyRoutePattern.test(request.nextUrl.pathname)) {
    return false;
  }

  // Keep the homepage's local media available while the customer pages use the live site.
  if (/^\/[^/]+\.(?:avif|jpeg|jpg|mp4|png|svg|webp)$/i.test(request.nextUrl.pathname)) {
    return false;
  }

  return true;
}
