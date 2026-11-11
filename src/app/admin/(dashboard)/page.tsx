import Link from 'next/link';
import {
  Car,
  Tag,
  BookOpen,
  Sparkles,
  MapPin,
  Inbox,
  Share2,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { getStoreData } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const store = await getStoreData();

  const totalModels = store.vehicles.length;
  const availableModels = store.vehicles.filter((v) => v.status === 'AVAILABLE').length;
  const hybridCount = store.vehicles.filter((v) => v.category.includes('hybrid')).length;
  const totalLeads = store.leads.length;
  const newLeads = store.leads.filter((l) => l.status === 'NEW').length;
  const totalHeroCards = store.heroCards.filter((c) => c.enabled).length;

  const recentLeads = store.leads.slice(0, 5);

  const MODULES = [
    {
      title: 'Vehicles',
      desc: 'Add new launches, edit specs, features, colors, and showroom display images.',
      href: '/admin/vehicles',
      icon: Car,
      stat: `${totalModels} Models · ${availableModels} Active`,
      badge: 'CATALOG',
    },
    {
      title: 'Pricing',
      desc: 'Configure variant ex-showroom prices, Kerala RTO tax slabs, and monthly EMI schemes.',
      href: '/admin/pricing',
      icon: Tag,
      stat: 'Kochi · TVM · Thrissur',
      badge: 'PRICING & RTO',
    },
    {
      title: 'Brochures',
      desc: 'Upload official high-resolution PDF brochures and assign them to Toyota models.',
      href: '/admin/brochures',
      icon: BookOpen,
      stat: `${store.vehicles.filter((v) => v.brochureUrl).length} Brochures Linked`,
      badge: 'ASSETS',
    },
    {
      title: 'Campaigns',
      desc: 'Customize the 4 homepage center-stage cards, festive top ticker, and exit-intent voucher.',
      href: '/admin/campaigns',
      icon: Sparkles,
      stat: `${totalHeroCards} Active Cards`,
      badge: 'PROMOTIONS',
    },
    {
      title: 'Branches',
      desc: 'Manage showroom & 3S service facility contacts, timings, and Google Maps pins.',
      href: '/admin/branches',
      icon: MapPin,
      stat: `${store.branches.length} Kerala Locations`,
      badge: 'LOCATIONS',
    },
    {
      title: 'Socials',
      desc: 'Configure official dealership social channels, handles, and public footer links.',
      href: '/admin/socials',
      icon: Share2,
      stat: `${store.socialLinks?.filter((s) => s.enabled).length || 0} Channels Active`,
      badge: 'CHANNELS',
    },
    {
      title: 'Leads',
      desc: 'Real-time feed of VIP test drive, exchange, and pricing requests with WhatsApp follow-up.',
      href: '/admin/leads',
      icon: Inbox,
      stat: `${newLeads} Pending / ${totalLeads} Total`,
      badge: 'CRM',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="border border-white/10 bg-gradient-to-r from-black via-black/80 to-[#eb0a1e]/10 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#eb0a1e]/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#eb0a1e] animate-pulse" />
              <span className="font-display text-[9px] font-bold tracking-[0.25em] text-[#eb0a1e] uppercase">
                OVERVIEW
              </span>
              <span className="text-white/30 text-[10px]">·</span>
              <span suppressHydrationWarning className="text-white/50 text-[10px] font-mono">
                Updated {new Date(store.lastUpdated).toLocaleTimeString()}
              </span>
            </div>
            <h1 className="font-druk text-3xl sm:text-4xl text-white uppercase tracking-wider mb-2">
              MARKETING PORTAL
            </h1>
            <p className="text-xs sm:text-sm text-white/60 font-light max-w-2xl leading-relaxed">
              Manage the live customer experience, vehicle catalog, Kerala pricing, and inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <span>View Website</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-stat-card border border-white/10 bg-black/60 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">
              SHOWROOM FLEET
            </span>
            <Car size={16} className="text-[#eb0a1e]" />
          </div>
          <div className="font-druk text-3xl sm:text-4xl text-white mb-1">
            {totalModels}
          </div>
          <div className="text-[11px] text-white/60 flex items-center gap-1 font-mono">
            <TrendingUp size={12} className="text-emerald-400" />
            <span>{hybridCount} Hybrids / EVs</span>
          </div>
        </div>

        <div className="admin-stat-card border border-white/10 bg-black/60 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">
              INQUIRIES
            </span>
            <Inbox size={16} className="text-[#eb0a1e]" />
          </div>
          <div className="font-druk text-3xl sm:text-4xl text-white mb-1">
            {totalLeads}
          </div>
          <div className="text-[11px] text-[#eb0a1e] font-display font-semibold uppercase tracking-wider flex items-center gap-1">
            <Clock size={12} />
            <span>{newLeads} New Inquiries</span>
          </div>
        </div>

        <div className="admin-stat-card border border-white/10 bg-black/60 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">
              ACTIVE CAMPAIGNS
            </span>
            <Sparkles size={16} className="text-[#eb0a1e]" />
          </div>
          <div className="font-druk text-3xl sm:text-4xl text-white mb-1">
            {totalHeroCards} / 4
          </div>
          <div className="text-[11px] text-emerald-400 font-display font-semibold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>Hero Cards Active</span>
          </div>
        </div>

        <div className="admin-stat-card border border-white/10 bg-black/60 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">
              SHOWROOMS
            </span>
            <MapPin size={16} className="text-[#eb0a1e]" />
          </div>
          <div className="font-druk text-3xl sm:text-4xl text-white mb-1">
            {store.branches.length}
          </div>
          <div className="text-[11px] text-white/60 font-mono">
            Kochi · TVM · TCR · CLT · KTM
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase">
            SECTIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod) => {
            const { title, desc, href, icon: Icon, stat, badge } = mod;
            return (
              <Link
                key={href}
                href={href}
                className="admin-dashboard-card group border border-white/10 bg-black/60 hover:bg-black/80 hover:border-white/30 p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              >
                {/* Ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-[#eb0a1e]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/90 group-hover:text-[#eb0a1e] group-hover:border-[#eb0a1e]/40 transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-[9px] font-display font-bold tracking-[0.2em] uppercase px-2 py-0.5 border border-white/10 bg-white/[0.03] text-white/60">
                      {badge}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase mb-2 group-hover:text-[#eb0a1e] transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-display">
                  <span className="text-[11px] font-mono text-white/50">{stat}</span>
                  <span className="flex items-center gap-1 text-[#eb0a1e] font-bold tracking-wider text-[11px] uppercase group-hover:translate-x-1 transition-transform">
                    <span>Manage</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Leads Preview */}
      <div className="admin-card border border-white/10 bg-black/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Inbox size={18} className="text-[#eb0a1e]" />
            <h2 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase">
              RECENT INQUIRIES
            </h2>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-display font-semibold tracking-wider text-[#eb0a1e] hover:underline uppercase flex items-center gap-1"
          >
            <span>View All ({totalLeads})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-white/10 text-[9px] font-display font-bold tracking-[0.2em] text-white/40 uppercase">
                <th className="py-2.5 px-3">CUSTOMER</th>
                <th className="py-2.5 px-3">PHONE</th>
                <th className="py-2.5 px-3">INTEREST / CAR</th>
                <th className="py-2.5 px-3">TYPE</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentLeads.map((lead) => {
                const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                const waUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(
                  `Hello ${lead.name}, thank you for contacting Nippon Toyota regarding the ${lead.targetCar || 'Toyota range'}. How can we assist you today?`
                )}`;

                return (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">
                      {lead.name}
                      <span suppressHydrationWarning className="block text-[10px] text-white/40 font-mono font-normal">
                        {new Date(lead.createdAt).toLocaleDateString()} · {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-white/80">
                      {lead.phone}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-display font-semibold text-white/90 uppercase">
                        {lead.targetCar || 'General Fleet'}
                      </span>
                      {lead.location && (
                        <span className="block text-[10px] text-white/40">
                          {lead.location}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-display text-[10px] tracking-wider text-white/70 uppercase">
                      {lead.leadType}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-[9px] font-display font-bold tracking-wider uppercase ${
                          lead.status === 'NEW'
                            ? 'bg-[#eb0a1e]/20 text-[#ff4d5a] border border-[#eb0a1e]/40'
                            : lead.status === 'CONTACTED'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-display font-bold uppercase tracking-wider bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-colors"
                      >
                        <MessageSquare size={12} />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
