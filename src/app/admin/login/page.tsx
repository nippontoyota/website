"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the admin password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#eb0a1e]/10 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-black tracking-tight text-white uppercase hover:text-white/90 transition-colors">
          NIPPON TOYOTA
        </Link>

        <Link
          href="/"
          className="text-xs font-display font-medium tracking-wider text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>Return to Website</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full mx-auto my-auto py-12">
        <div className="border border-white/15 bg-black/80 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(235,10,30,0.06),inset_0_1px_0_0_rgba(255,255,255,0.15)] relative overflow-hidden">
          {/* Subtle red accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#eb0a1e] to-transparent" />

          <div className="mb-8 text-center">
            <span className="inline-block px-2.5 py-1 text-[9px] font-display font-bold tracking-[0.2em] uppercase bg-white/[0.05] border border-white/10 text-white/70 mb-3">
              MARKETING & FLEET CONSOLE
            </span>
            <h1 className="font-druk text-3xl sm:text-4xl uppercase text-white tracking-wider mb-2">
              ADMIN PORTAL
            </h1>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Enter your master marketing credentials to manage Toyota models, Kerala on-road pricing, and digital brochures.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-[#eb0a1e]/15 border border-[#eb0a1e]/40 text-[#ff4d5a] text-xs flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0 text-[#eb0a1e]" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-2"
              >
                Master Passkey
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full pl-10 pr-10 py-3 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] focus:bg-white/[0.06] text-white text-sm tracking-wider outline-none transition-all placeholder:text-white/30"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="mt-2 text-[10px] text-white/40 font-mono">
                Default Master Key: <code className="text-white/70 bg-white/10 px-1 py-0.5">nippon2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white font-display text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-[0_10px_25px_rgba(235,10,30,0.35)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>ACCESS CONSOLE</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-[10px] text-white/40 font-display tracking-widest uppercase">
        NIPPON TOYOTA KERALA · AUTHORIZED MARKETING ADMINISTRATION
      </div>
    </div>
  );
}
