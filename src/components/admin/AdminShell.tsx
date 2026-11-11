"use client";

import { useState, useSyncExternalStore, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, LayoutGroup } from 'framer-motion';
import ToastContainer from './ToastContainer';
import {
  LayoutDashboard,
  Car,
  Tag,
  BookOpen,
  Sparkles,
  MapPin,
  Inbox,
  Share2,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';

interface AdminShellProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/vehicles', label: 'Vehicles', icon: Car },
  { href: '/admin/pricing', label: 'Pricing', icon: Tag },
  { href: '/admin/brochures', label: 'Brochures', icon: BookOpen },
  { href: '/admin/campaigns', label: 'Campaigns', icon: Sparkles },
  { href: '/admin/branches', label: 'Branches', icon: MapPin },
  { href: '/admin/socials', label: 'Socials', icon: Share2 },
  { href: '/admin/leads', label: 'Leads', icon: Inbox },
];

function subscribeTheme(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('nippon-theme-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('nippon-theme-change', callback);
  };
}

function getThemeSnapshot(): 'dark' | 'light' {
  try {
    const saved = localStorage.getItem('nippon_admin_theme');
    return saved === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function getServerThemeSnapshot(): 'dark' | 'light' {
  return 'dark';
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('nippon_admin_theme', next);
      window.dispatchEvent(new Event('nippon-theme-change'));
    } catch {
      // storage unavailable
    }
  }, [theme]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
      setLoggingOut(false);
    }
  };

  return (
    <div
      data-admin-theme={theme}
      className={`admin-shell-root min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#070709] text-white' : 'bg-[#f4f5f8] text-zinc-900'
      }`}
    >
      {/* Top Bar - Clean & De-bloated */}
      <header
        className={`admin-header h-16 border-b sticky top-0 z-40 px-3.5 sm:px-8 flex items-center justify-between backdrop-blur-xl transition-colors duration-200 ${
          theme === 'dark' ? 'border-white/10 bg-black/80' : 'border-zinc-200 bg-white/95 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 transition-colors ${
              theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Clean Brand Typography - Just NIPPON TOYOTA */}
          <Link href="/admin" className="group">
            <span
              className={`font-display text-base font-black tracking-tight uppercase transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-zinc-900'
              }`}
            >
              NIPPON TOYOTA
            </span>
          </Link>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Theme Toggle - Icon Only */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-white/15 bg-white/[0.04] hover:bg-white/10 text-white/80 hover:text-white'
                : 'border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 shadow-xs'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="text-zinc-700" />
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`px-3 py-1.5 border text-xs font-display font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer rounded-md ${
              theme === 'dark'
                ? 'border-white/10 hover:border-red-500/40 hover:bg-red-500/10 text-white/70 hover:text-red-400'
                : 'border-zinc-200 hover:border-red-500/40 hover:bg-red-50 text-zinc-600 hover:text-red-600 shadow-xs'
            }`}
            title="Log out of admin"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`admin-sidebar w-64 border-r hidden md:flex flex-col shrink-0 p-4 transition-colors duration-200 ${
            theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-zinc-200 bg-white shadow-xs'
          }`}
        >
          <div
            className={`px-3 py-2 text-[9px] font-display font-bold tracking-[0.25em] uppercase ${
              theme === 'dark' ? 'text-white/40' : 'text-zinc-400'
            }`}
          >
            NAVIGATION
          </div>
          <LayoutGroup id="desktop-sidebar-nav">
            <nav className="space-y-1 relative">
              {NAV_ITEMS.map((item) => {
                const { icon: Icon, href, label } = item;
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    data-active={isActive ? 'true' : 'false'}
                    className={`admin-nav-item group relative flex items-center gap-3 px-3 py-2.5 text-xs font-display tracking-wider uppercase transition-colors duration-200 border border-transparent ${
                      isActive
                        ? theme === 'dark'
                          ? 'admin-nav-active text-white font-bold'
                          : 'admin-nav-active text-[#eb0a1e] font-bold'
                        : theme === 'dark'
                        ? 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                    }`}
                  >
                    {/* Magnetic Glide Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="desktop-active-nav-indicator"
                        className={`absolute inset-0 z-0 pointer-events-none border ${
                          theme === 'dark'
                            ? 'border-[#eb0a1e]/70 bg-[#eb0a1e]/10 shadow-[0_0_20px_rgba(235,10,30,0.18)]'
                            : 'border-[#eb0a1e] bg-[#fef2f2] shadow-xs'
                        }`}
                        transition={{
                          type: 'spring',
                          stiffness: 480,
                          damping: 36,
                          mass: 0.5,
                        }}
                      >
                        {/* Precision Left Red Blade */}
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#eb0a1e] shadow-[0_0_8px_rgba(235,10,30,0.7)]" />
                      </motion.div>
                    )}

                    <Icon
                      size={16}
                      style={isActive && theme === 'light' ? { color: '#eb0a1e' } : undefined}
                      className={`relative z-10 shrink-0 transition-colors duration-200 ${
                        isActive
                          ? 'text-[#eb0a1e]'
                          : theme === 'dark'
                          ? 'text-white/40 group-hover:text-white/80'
                          : 'text-zinc-400 group-hover:text-zinc-700'
                      }`}
                    />
                    <span
                      style={isActive && theme === 'light' ? { color: '#eb0a1e' } : undefined}
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive
                          ? theme === 'dark'
                            ? 'text-white'
                            : 'text-[#eb0a1e]'
                          : ''
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>
        </aside>

        {/* Mobile Slide-Over Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-md flex">
            <div
              className={`admin-drawer w-72 max-w-[85vw] border-r p-5 sm:p-6 flex flex-col justify-between h-full ${
                theme === 'dark' ? 'bg-[#0c0c0e] border-white/15' : 'bg-white border-zinc-200 shadow-xl'
              }`}
            >
              <div>
                <div
                  className={`flex items-center justify-between mb-6 pb-4 border-b ${
                    theme === 'dark' ? 'border-white/10' : 'border-zinc-200'
                  }`}
                >
                  <span
                    className={`font-display text-sm font-black tracking-tight uppercase ${
                      theme === 'dark' ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    NIPPON TOYOTA
                  </span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className={theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'}
                  >
                    <X size={20} />
                  </button>
                </div>

                <LayoutGroup id="mobile-sidebar-nav">
                  <nav className="space-y-1 relative">
                    {NAV_ITEMS.map((item) => {
                      const { icon: Icon, href, label } = item;
                      const isActive = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          data-active={isActive ? 'true' : 'false'}
                          onClick={() => setMobileOpen(false)}
                          className={`admin-nav-item group relative flex items-center gap-3 px-3.5 py-3 text-xs font-display tracking-wider uppercase transition-colors duration-200 border border-transparent ${
                            isActive
                              ? theme === 'dark'
                                ? 'admin-nav-active text-white font-bold'
                                : 'admin-nav-active text-[#eb0a1e] font-bold'
                              : theme === 'dark'
                              ? 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="mobile-active-nav-indicator"
                              className={`absolute inset-0 z-0 pointer-events-none border ${
                                theme === 'dark'
                                  ? 'border-[#eb0a1e]/70 bg-[#eb0a1e]/10 shadow-[0_0_20px_rgba(235,10,30,0.18)]'
                                  : 'border-[#eb0a1e] bg-[#fef2f2] shadow-xs'
                              }`}
                              transition={{
                                type: 'spring',
                                stiffness: 480,
                                damping: 36,
                                mass: 0.5,
                              }}
                            >
                              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#eb0a1e] shadow-[0_0_8px_rgba(235,10,30,0.7)]" />
                            </motion.div>
                          )}
                          <Icon
                            size={18}
                            style={isActive && theme === 'light' ? { color: '#eb0a1e' } : undefined}
                            className={`relative z-10 shrink-0 transition-colors duration-200 ${
                              isActive ? 'text-[#eb0a1e]' : 'opacity-40'
                            }`}
                          />
                          <span
                            style={isActive && theme === 'light' ? { color: '#eb0a1e' } : undefined}
                            className={`relative z-10 transition-colors duration-200 ${
                              isActive
                                ? theme === 'dark'
                                  ? 'text-white'
                                  : 'text-[#eb0a1e]'
                                : ''
                            }`}
                          >
                            {label}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                </LayoutGroup>
              </div>

              <div className={`pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-zinc-200'}`}>
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 px-3 border border-red-500/30 text-red-500 text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-500/10 rounded-md"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Global Executive Toast Feedback */}
      <ToastContainer theme={theme} />
    </div>
  );
}
