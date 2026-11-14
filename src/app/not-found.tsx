import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#eb0a1e]/15 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-black tracking-tight text-white uppercase hover:text-white/90 transition-colors">
          NIPPON TOYOTA
        </Link>
        <span className="text-[10px] font-display font-medium tracking-[0.2em] text-white/40 uppercase">
          KERALA
        </span>
      </div>

      {/* 404 Center Message */}
      <div className="relative z-10 max-w-md w-full mx-auto my-auto text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#eb0a1e]">
          <Compass size={28} strokeWidth={1.5} />
        </div>

        <span className="font-mono text-xs text-[#eb0a1e] tracking-[0.3em] uppercase block mb-3 font-bold">
          404 — PAGE NOT FOUND
        </span>

        <h1 className="font-druk text-4xl sm:text-5xl uppercase tracking-wider text-white mb-4 leading-tight">
          ROUTE UNAVAILABLE
        </h1>

        <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-8 max-w-sm mx-auto">
          The destination you requested does not exist or may have been relocated.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[#eb0a1e] bg-[#eb0a1e] hover:bg-[#c90819] text-white text-xs font-display font-bold tracking-[0.2em] uppercase transition-all shadow-[0_10px_30px_rgba(235,10,30,0.3)]"
        >
          <ArrowLeft size={16} />
          <span>RETURN TO SHOWROOM</span>
        </Link>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center text-[10px] font-mono text-white/30 tracking-widest">
        NIPPON MOTOR CORPORATION KERALA · ALL RIGHTS RESERVED
      </div>
    </div>
  );
}
