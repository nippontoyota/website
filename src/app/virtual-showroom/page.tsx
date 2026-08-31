'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import PannellumViewer from '@/components/PannellumViewer';
import showroomData from '../../../public/showroom-data.json';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Info, Menu, X } from 'lucide-react';

type ShowroomCar = {
  id: string;
  modelName: string;
  modelCategory: string;
  topHeading: string;
  startingPrice: string;
  takeTour: string;
  content: Array<{ contentList: string[] }>;
};

type HotspotCar = {
  id: string;
  pitch: number;
  yaw: number;
};

const showroomCars = showroomData.hotspotdata as ShowroomCar[];

const carPositions: HotspotCar[] = [
  { id: 'fortuner', pitch: 3.5, yaw: -40 },
  { id: 'legender', pitch: 3.5, yaw: -59 },
  { id: 'hilux', pitch: 3.5, yaw: -20 },
  { id: 'camry', pitch: 1, yaw: -84 },
  { id: 'vellfire', pitch: 4, yaw: -108 },
  { id: 'urban-cruiser-hyryder', pitch: 3.5, yaw: 80 },
  { id: 'ebella', pitch: 2.6, yaw: 57 },
  { id: 'rumion', pitch: 3, yaw: 103 },
  { id: 'taisor', pitch: 2, yaw: 123 },
  { id: 'glanza', pitch: 1.4, yaw: 140 },
  { id: 'innova-crysta', pitch: 3, yaw: 15 },
  { id: 'innovacrysta', pitch: 3, yaw: 34 },
  { id: 'land-cruiser-300', pitch: 3.5, yaw: -135 },
];

function cleanPrice(price: string) {
  return price.replace('â‚¹', '\u20b9').replace('â„¢', 'TM').replace('â€', '"');
}

function tourUrl(car: ShowroomCar) {
  return `/virtual-showroom/${car.takeTour}`;
}

function cleanDisplayText(value: string) {
  return cleanPrice(value)
    .replace(/\u00e2\u201a\u00b9|\u00c3\u00a2\u00e2\u20ac\u0161\u00c2\u00b9/g, '\u20b9')
    .replace(/\u00e2\u201e\u00a2|\u00c3\u00a2\u00e2\u20ac\u017e\u00c2\u00a2/g, 'TM')
    .replace(/\u00e2\u20ac\u0093|\u00c3\u00a2\u00e2\u20ac\u201c/g, '-')
    .replace(/\u00e2\u20ac\u009d|\u00c3\u00a2\u00e2\u20ac\u00c2\u009d/g, '"')
    .replace(/\u00c2\u00b0/g, String.fromCharCode(0x00b0))
    .replace(/\u00c2\u00b0/g, '°');
}

export default function VirtualShowroom() {
  const [entered, setEntered] = useState(false);
  const [activeCar, setActiveCar] = useState<ShowroomCar | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const viewerConfig = useMemo(() => ({
    default: {
      firstScene: 'cars',
      author: '',
      sceneFadeDuration: 0,
      autoLoad: true,
      showControls: false,
    },
    scenes: {
      cars: {
        title: 'CARS',
        type: 'multires',
        showControls: false,
        autoRotate: -1,
        hfov: 70,
        minHfov: 70,
        maxHfov: 70,
        multiResMaxHfov: 70,
        multiResMinHfov: 70,
        maxLevel: 1,
        pitch: 0,
        yaw: 2,
        compass: false,
        multiRes: {
          basePath: 'https://static3.toyotabharat.com/assets/toyota-360/interior',
          shtHash: '5*~payWCt7ayofWCj[a}WBV[jtWBayaxofj[axj[WBj[j[fQj@j[ayjtj[a}fkjZfQj[j[fkj[',
          path: '/%l/%s%y_%x',
          fallbackPath: '/fallback/%s',
          extension: 'jpg',
          tileResolution: 512,
          maxLevel: 4,
          cubeResolution: 2544,
        },
        hotSpots: carPositions.flatMap(({ id, pitch, yaw }) => {
          const car = showroomCars.find((item) => item.id === id);
          if (!car) return [];
          return [
            {
              pitch,
              yaw,
              type: 'info',
              cssClass: `${id}-info nippon-info-hotspot`,
              scale: true,
              clickHandlerFunc: () => setActiveCar(car),
            },
            {
              pitch,
              yaw: yaw + 7,
              type: 'info',
              cssClass: `${id}-url nippon-tour-hotspot`,
              scale: true,
              clickHandlerFunc: () => {
                window.location.href = tourUrl(car);
              },
            },
          ];
        }),
      },
    },
  }), []);

  const selectedFeatures = activeCar?.content[0]?.contentList.map(cleanDisplayText) ?? [];

  const stepInside = () => {
    setEntered(true);
  };

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-black font-sans text-white">
      <link rel="stylesheet" href="https://static3.toyotabharat.com/assets/toyota-360/css/showroom.css" />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body { overflow: hidden; }
            .pnlm-container { background: #000 !important; }
            .pnlm-tooltip { display: none !important; }
            .nippon-info-hotspot {
              width: 32px !important;
              height: 32px !important;
              border: 4px solid #ed1b2f !important;
              border-radius: 999px !important;
              background: #fff !important;
              box-shadow: 0 2px 12px rgba(0,0,0,.3) !important;
            }
            .nippon-info-hotspot::after {
              content: 'i';
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ed1b2f;
              font: 900 22px Georgia, serif;
              font-style: italic;
              line-height: 1;
            }
            .nippon-tour-hotspot {
              width: 234px !important;
              height: 38px !important;
              border-radius: 0 !important;
              background: #ed1b2f !important;
              box-shadow: 0 2px 12px rgba(0,0,0,.24) !important;
            }
            .nippon-tour-hotspot::after {
              content: 'VIEW 360° TOUR & CONFIGURE  »';
              display: flex;
              height: 100%;
              align-items: center;
              justify-content: center;
              color: #fff;
              font: 800 13px Arial, sans-serif;
              white-space: nowrap;
            }
            .nippon-info-hotspot,
            .nippon-tour-hotspot { cursor: pointer; transition: box-shadow 180ms ease-out, filter 180ms ease-out; }
            .nippon-info-hotspot:hover,
            .nippon-tour-hotspot:hover { filter: brightness(1.08); box-shadow: 0 8px 20px rgba(237,27,47,.35) !important; }
            .nippon-tour-hotspot:hover::after { letter-spacing: .02em; }
            .showroom-control { transition: background-color 180ms ease-out, border-color 180ms ease-out, transform 160ms ease-out; }
            .showroom-control:active { transform: scale(.98); }
            .showroom-control:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
            .showroom-vehicle-cta { font-size: 0 !important; }
            .showroom-vehicle-cta::before { content: 'View vehicle'; font-size: 10px; }
            @media (prefers-reduced-motion: reduce) {
              .showroom-control { transition: none; }
              .nippon-info-hotspot,
              .nippon-tour-hotspot { transition: none; }
              .nippon-info-hotspot:hover,
              .nippon-tour-hotspot:hover { transform: none; }
            }
          `,
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-36 bg-gradient-to-b from-black/75 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-black/25 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1560px] items-center justify-between px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <Link href="/" className="showroom-control flex shrink-0 items-center gap-2 rounded-md px-1 py-1" aria-label="Back to Nippon Toyota home">
              <Image src="/nippon-toyota.png" alt="Nippon Toyota" width={140} height={32} className="h-7 w-auto object-contain brightness-0 invert" priority />
              <span className="hidden border-l border-white/25 pl-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white/75 sm:block">Nippon Toyota</span>
            </Link>
            <span className="hidden h-5 w-px bg-white/20 md:block" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65 md:block">Virtual showroom</span>
          </div>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Showroom navigation">
            <Link href="/" className="showroom-control text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 hover:text-white">Home</Link>
            <Link href="/service" className="showroom-control text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 hover:text-white">Services</Link>
            <Link href="/about" className="showroom-control text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 hover:text-white">About</Link>
            <Link href="/contact" className="showroom-control rounded-full border border-white/35 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white hover:border-white hover:bg-white/10">Contact</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="showroom-control hidden items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/80 hover:border-white hover:bg-white/10 sm:flex">
              <ArrowLeft size={13} /> Exit showroom
            </Link>
            <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="showroom-control flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white hover:bg-white/10 lg:hidden" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="absolute inset-x-3 top-[80px] z-40 rounded-2xl border border-white/15 bg-[#101010]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden" aria-label="Mobile showroom navigation">
          <div className="flex flex-col gap-1">
            {[
              ['Home', '/'],
              ['Services', '/service'],
              ['About', '/about'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="showroom-control rounded-xl px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">
                {label}
              </Link>
            ))}
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="showroom-control mt-2 flex items-center gap-2 border-t border-white/10 px-4 pt-4 text-sm font-semibold text-white/80 hover:text-white">
              <ArrowLeft size={15} /> Exit showroom
            </Link>
          </div>
        </nav>
      )}

      {entered && (
        <PannellumViewer config={viewerConfig} id="panorama" className="h-full w-full" />
      )}

      {!entered && (
        <section className="absolute inset-0 z-30 bg-black">
          <Image
            src="/assets/toyota-360/images/one3d-entrance-static.jpg"
            alt="Toyota Virtual Showroom"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-[7%] left-1/2 w-[min(92vw,520px)] -translate-x-1/2 text-left md:bottom-[10%]">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">Toyota virtual showroom</p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-[-0.04em] text-white">Explore the Toyota range</h1>
            <p className="mt-4 max-w-md text-base leading-6 text-white/80">Step inside, look around, and choose a model to explore in 360°.</p>
            <button
              type="button"
              onClick={stepInside}
              className="showroom-control mt-7 flex h-12 w-full items-center justify-center bg-[#ed1b2f] text-[11px] font-bold uppercase tracking-[0.18em] text-white hover:bg-[#c90013] sm:w-64"
            >
              Enter showroom <ChevronRight size={15} className="ml-2" />
            </button>
          </div>
        </section>
      )}

      {activeCar && (
        <section className="absolute inset-x-0 bottom-4 z-40 px-3 sm:bottom-7 sm:px-7" aria-live="polite" aria-label={`${activeCar.modelName} details`}>
          <div className="relative mx-auto flex max-w-[1560px] flex-col gap-5 rounded-2xl border border-white/20 bg-[#101010]/95 p-5 text-white shadow-2xl backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActiveCar(null)}
              className="showroom-control absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
            <div className="min-w-0 pr-8">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ed1b2f]"><Info size={13} /> Selected vehicle</div>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.02em] sm:text-3xl">{activeCar.topHeading}</h2>
              <p className="mt-2 text-sm font-semibold text-white/65">Starting from {cleanDisplayText(activeCar.startingPrice)}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70">
              {selectedFeatures.map((feature) => (
                <li key={feature}>{feature.replace('â„¢', 'TM').replace('â€', '"')}</li>
              ))}
            </ul>
            </div>
            <a
              href={tourUrl(activeCar)}
              aria-label={`View ${activeCar.modelName}`}
              className="showroom-control showroom-vehicle-cta inline-flex shrink-0 items-center justify-center bg-[#ed1b2f] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-white hover:bg-[#c90013]"
            >
              TAKE 360° TOUR
            </a>
          </div>
        </div>
        </section>
      )}
    </main>
  );
}
