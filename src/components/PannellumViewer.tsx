'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

type PannellumInstance = {
  destroy: () => void;
  resize?: () => void;
  setYaw?: (yaw: number) => void;
  getYaw?: () => number;
  loadScene?: (sceneId: string) => void;
};

type PannellumApi = {
  viewer: (id: string, config: unknown) => PannellumInstance;
  getViewer?: () => { setYaw?: (yaw: number) => void };
};

declare global {
  interface Window {
    pannellum?: PannellumApi;
    virtualShowroomViewer?: PannellumInstance;
  }
}

interface PannellumViewerProps {
  config: unknown;
  id?: string;
  className?: string;
}

export default function PannellumViewer({ config, id = 'panorama', className = '' }: PannellumViewerProps) {
  const viewerRef = useRef<PannellumInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let retryTimer: number | undefined;
    let resizeTimer: number | undefined;
    let attempts = 0;
    let cancelled = false;

    const initializeViewer = () => {
      if (cancelled) return;

      if (!window.pannellum || !containerRef.current) {
        attempts += 1;
        if (attempts < 40) {
          retryTimer = window.setTimeout(initializeViewer, 100);
        } else {
          setStatus('error');
        }
        return;
      }

      try {
        if (viewerRef.current) viewerRef.current.destroy();
        viewerRef.current = window.pannellum.viewer(containerRef.current.id, config);
        window.virtualShowroomViewer = viewerRef.current;
        setStatus('ready');

        resizeTimer = window.setTimeout(() => {
          if (viewerRef.current && typeof viewerRef.current.resize === 'function') {
            viewerRef.current.resize();
          }
          window.dispatchEvent(new Event('resize'));
        }, 100);
      } catch {
        setStatus('error');
      }
    };

    if (scriptReady) initializeViewer();

    return () => {
      cancelled = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      if (viewerRef.current) {
        const activeViewer = viewerRef.current;
        viewerRef.current.destroy();
        viewerRef.current = null;
        if (window.virtualShowroomViewer === activeViewer) {
          window.virtualShowroomViewer = undefined;
        }
      }
    };
  }, [config, retryKey, scriptReady]);

  useEffect(() => {
    if (!window.pannellum) return;

    const readyTimer = window.setTimeout(() => setScriptReady(true), 0);
    return () => window.clearTimeout(readyTimer);
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
      <Script 
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js" 
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => setStatus('error')}
      />
      <div className={`relative h-full w-full ${className}`}>
        <div
          ref={containerRef}
          id={id}
          className="absolute inset-0"
        />
        {status !== 'ready' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black text-white">
            {status === 'loading' ? (
              <div className="text-center">
                <div className="mx-auto mb-4 h-1 w-16 bg-[#ed1b2f]" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Loading showroom</p>
              </div>
            ) : (
              <div className="px-6 text-center">
                <p className="text-sm font-semibold">The showroom could not load.</p>
                <button
                  type="button"
                  onClick={() => { setStatus('loading'); setRetryKey((key) => key + 1); }}
                  className="mt-4 border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] hover:bg-white/10"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
