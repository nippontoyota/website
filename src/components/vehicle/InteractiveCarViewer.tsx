"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ExternalLink, Image as ImageIcon, Rotate3d } from 'lucide-react';
import { experienceForVehicle } from '@/data/vehicleExperiences';

type InteractiveCarViewerProps = {
  image: string;
  alt: string;
  modelSlug: string;
  showroomHref: string;
};

export default function InteractiveCarViewer({ image, alt, modelSlug, showroomHref }: InteractiveCarViewerProps) {
  const experience = experienceForVehicle(modelSlug);
  const [showLiveExperience, setShowLiveExperience] = useState(Boolean(experience));
  const [isLoading, setIsLoading] = useState(Boolean(experience));

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[#111]">
      <div className={`absolute inset-0 transition-opacity duration-300 ${showLiveExperience ? 'opacity-0' : 'opacity-100'}`} aria-hidden={showLiveExperience}>
        <Image src={image} alt={alt} fill priority sizes="(max-width: 640px) 100vw, 896px" className="object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.85)]" />
      </div>

      {experience && showLiveExperience && (
        <iframe
          title={`${alt} 3D experience`}
          src={experience.sourceUrl}
          className="absolute inset-0 h-full w-full border-0 bg-white"
          allow="fullscreen; xr-spatial-tracking"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setIsLoading(false)}
        />
      )}

      <div className="absolute inset-x-4 bottom-4 z-10 flex flex-wrap items-center justify-center gap-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2">
        {experience && showLiveExperience ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black shadow-lg">
              <Rotate3d size={14} /> {isLoading ? 'Loading 3D experience' : 'Drag to rotate. Pinch to zoom.'}
            </span>
            <a
              href={experience.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors hover:border-white"
            >
              <ExternalLink size={13} /> Open full view
            </a>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
              <ImageIcon size={14} /> Image preview
            </span>
            <Link href={showroomHref} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md transition-colors hover:border-white hover:text-white">
              <Rotate3d size={14} /> Explore showroom
            </Link>
          </>
        )}
      </div>

      {experience && !isLoading && showLiveExperience && (
        <button
          type="button"
          onClick={() => setShowLiveExperience(false)}
          className="absolute right-4 top-4 z-10 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-black shadow-lg transition-colors hover:bg-white"
        >
          Use image preview
        </button>
      )}
    </div>
  );
}
