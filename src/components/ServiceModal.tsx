"use client";

import { useState, useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, Info, PlayCircle, Images, Share2 } from 'lucide-react';
import { qServiceInfo, type ServiceInfo } from '@/data/qservice-info';

type Tab = "info" | "video" | "gallery";

function Lightbox({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors"
      >
        <X size={28} />
      </button>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ModalDialog({ entry, onClose }: { entry: ServiceInfo; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("info");
  const [shared, setShared] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleShare = async () => {
    const shareData = {
      title: entry.title,
      text: `${entry.title} — Nippon Toyota`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // user cancelled share — no-op
    }
  };

  const hasVideos = !!entry.videos?.length;
  const hasGallery = !!entry.gallery?.length;

  return (
    <>
      <motion.div
        role="dialog"
        aria-modal="true"
        className="relative bg-white w-full max-w-lg shadow-2xl max-h-[85vh] flex flex-col"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="font-display font-bold text-xl md:text-2xl text-[#111] pr-6">
            {entry.title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-[var(--toyota-red)] transition-colors shrink-0"
          >
            <X size={22} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-gray-200">
          {[
            { id: "info" as Tab, label: "Info", Icon: Info },
            { id: "video" as Tab, label: "Video", Icon: PlayCircle },
            { id: "gallery" as Tab, label: "Gallery", Icon: Images },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 pb-3 text-sm font-bold tracking-wide border-b-2 -mb-px transition-colors ${
                tab === id
                  ? "text-[var(--toyota-red)] border-[var(--toyota-red)]"
                  : "text-gray-500 border-transparent hover:text-[#333]"
              }`}
            >
              <Icon size={16} />
              {label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto grow">
          {tab === "info" && (
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              {entry.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {tab === "video" && (
            hasVideos ? (
              <div className="grid grid-cols-3 gap-2">
                {entry.videos!.map((id) => (
                  <button
                    key={id}
                    onClick={() => setActiveVideo(id)}
                    className="relative aspect-video overflow-hidden bg-black group/thumb"
                  >
                    <Image
                      src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                      alt="Video thumbnail"
                      fill
                      className="object-cover opacity-90 group-hover/thumb:opacity-70 transition-opacity"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle size={28} className="text-white drop-shadow" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-gray-400">
                <PlayCircle size={40} className="mb-3" />
                <p className="text-sm font-semibold tracking-wide">Coming Soon</p>
              </div>
            )
          )}

          {tab === "gallery" && (
            hasGallery ? (
              <div className="grid grid-cols-3 gap-2">
                {entry.gallery!.map((src) => (
                  <button
                    key={src}
                    onClick={() => setActiveImage(src)}
                    className="relative aspect-square overflow-hidden bg-gray-100 group/thumb"
                  >
                    <Image
                      src={src}
                      alt="Gallery image"
                      fill
                      className="object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-gray-400">
                <Images size={40} className="mb-3" />
                <p className="text-sm font-semibold tracking-wide">Coming Soon</p>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[var(--toyota-red)] transition-colors"
          >
            <Share2 size={16} />
            {shared ? "LINK COPIED" : "SHARE"}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeVideo && (
          <Lightbox onClose={() => setActiveVideo(null)}>
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </Lightbox>
        )}
        {activeImage && (
          <Lightbox onClose={() => setActiveImage(null)}>
            <div className="relative w-full max-h-[80vh] aspect-[4/3]">
              <Image src={activeImage} alt="" fill className="object-contain" />
            </div>
          </Lightbox>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ServiceModal({
  infoKey,
  onClose,
}: {
  infoKey: string | null;
  onClose: () => void;
}) {
  const entry = infoKey ? qServiceInfo[infoKey] : null;

  useEffect(() => {
    if (!entry) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [entry, onClose]);

  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <ModalDialog key={infoKey} entry={entry} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
