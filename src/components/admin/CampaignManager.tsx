"use client";

import { useState } from 'react';
import {
  Sparkles,
  Save,
  CheckCircle2,
  Sliders,
  Megaphone,
  Gift,
  Plus,
  Trash2,
  Car,
  Repeat,
  Tag,
  BookOpen,
} from 'lucide-react';
import { HeroActionCard, CampaignSettings } from '@/lib/types/admin';
import { toast } from '@/lib/toast';

interface CampaignManagerProps {
  initialHeroCards: HeroActionCard[];
  initialCampaigns: CampaignSettings;
}

const INTENT_ICONS: Record<string, typeof Car> = {
  TEST_DRIVE: Car,
  EXCHANGE: Repeat,
  PRICE_LIST: Tag,
  BROCHURE: BookOpen,
};

export default function CampaignManager({
  initialHeroCards,
  initialCampaigns,
}: CampaignManagerProps) {
  const [heroCards, setHeroCards] = useState<HeroActionCard[]>(initialHeroCards);
  const [campaigns, setCampaigns] = useState<CampaignSettings>(initialCampaigns);
  const [activeTab, setActiveTab] = useState<'hero' | 'announcement' | 'exit'>('hero');

  // Currently editing card ID in Hero tab
  const [editingCardId, setEditingCardId] = useState<string>(heroCards[0]?.id || 'test-drive');

  const [saving, setSaving] = useState(false);

  const notify = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const currentCard = heroCards.find((c) => c.id === editingCardId) || heroCards[0];

  // Helper to update a field in current card
  const updateCurrentCard = <K extends keyof HeroActionCard>(field: K, value: HeroActionCard[K]) => {
    setHeroCards((prev) =>
      prev.map((c) => (c.id === currentCard.id ? { ...c, [field]: value } : c))
    );
  };

  // Add / Remove pills
  const addPill = () => {
    const nextPills = [...currentCard.pills, { label: 'New Highlight' }];
    updateCurrentCard('pills', nextPills);
  };

  const updatePill = (idx: number, label: string) => {
    const nextPills = [...currentCard.pills];
    nextPills[idx] = { label };
    updateCurrentCard('pills', nextPills);
  };

  const removePill = (idx: number) => {
    const nextPills = currentCard.pills.filter((_, i) => i !== idx);
    updateCurrentCard('pills', nextPills);
  };

  // Update Perks
  const updatePerk = (idx: number, text: string) => {
    const nextPerks = [...currentCard.perks];
    nextPerks[idx] = text;
    updateCurrentCard('perks', nextPerks);
  };

  const addPerk = () => {
    const nextPerks = [...currentCard.perks, 'New Customer Privilege'];
    updateCurrentCard('perks', nextPerks);
  };

  const removePerk = (idx: number) => {
    const nextPerks = currentCard.perks.filter((_, i) => i !== idx);
    updateCurrentCard('perks', nextPerks);
  };

  // Save All Hero Cards
  const handleSaveHeroCards = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/campaigns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'heroCards', heroCards }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update hero cards');
      notify('success', 'Hero action dock updated successfully.');
    } catch (err: unknown) {
      notify('error', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  // Save Announcement Bar
  const handleSaveAnnouncement = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/campaigns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'announcementBar', announcementBar: campaigns.announcementBar }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update announcement bar');
      notify('success', 'Announcement bar updated.');
    } catch (err: unknown) {
      notify('error', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  // Instant Toggle Announcement Bar
  const handleToggleAnnouncement = async (enabled: boolean) => {
    const updated = {
      ...campaigns,
      announcementBar: { ...campaigns.announcementBar, enabled },
    };
    setCampaigns(updated);

    try {
      const res = await fetch('/api/admin/campaigns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'announcementBar', announcementBar: updated.announcementBar }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      if (enabled) {
        toast.success('Announcement ticker is now LIVE on website');
      } else {
        toast.info('Announcement ticker is now OFF (hidden on website)');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update announcement status');
      setCampaigns(campaigns);
    }
  };

  // Save Exit Intent Offer
  const handleSaveExitIntent = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/campaigns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'exitIntent', exitIntentOffer: campaigns.exitIntentOffer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update exit-intent offer');
      notify('success', 'Exit-intent promotional offer updated.');
    } catch (err: unknown) {
      notify('error', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  // Instant Toggle Exit Intent Offer
  const handleToggleExitIntent = async (enabled: boolean) => {
    const updated = {
      ...campaigns,
      exitIntentOffer: { ...campaigns.exitIntentOffer, enabled },
    };
    setCampaigns(updated);

    try {
      const res = await fetch('/api/admin/campaigns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'exitIntent', exitIntentOffer: updated.exitIntentOffer }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      if (enabled) {
        toast.success('Exit-intent voucher popup is now LIVE');
      } else {
        toast.info('Exit-intent voucher popup is now OFF (disabled)');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update exit intent status');
      setCampaigns(campaigns);
    }
  };

  const IconComponent = INTENT_ICONS[currentCard.intent] || Car;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[9px] font-display font-bold tracking-[0.25em] text-[#eb0a1e] uppercase block mb-1">
            CAMPAIGNS
          </span>
          <h1 className="font-druk text-3xl text-white uppercase tracking-wider">
            CAMPAIGNS & PROMOTIONS
          </h1>
          <p className="text-xs text-white/60 font-light">
            Manage homepage hero action cards, top announcement banner, and promotional offers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'hero' && (
            <button
              onClick={handleSaveHeroCards}
              disabled={saving}
              className="py-2.5 px-5 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)]"
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save Hero Cards'}</span>
            </button>
          )}

          {activeTab === 'announcement' && (
            <button
              onClick={handleSaveAnnouncement}
              disabled={saving}
              className="py-2.5 px-5 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)]"
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save Ticker'}</span>
            </button>
          )}

          {activeTab === 'exit' && (
            <button
              onClick={handleSaveExitIntent}
              disabled={saving}
              className="py-2.5 px-5 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)]"
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save Exit Voucher'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          onClick={() => setActiveTab('hero')}
          className={`py-2 px-4 text-xs font-display font-semibold uppercase tracking-wider border transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'hero'
              ? 'border-[#eb0a1e] bg-[#eb0a1e]/15 text-white'
              : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Sliders size={14} />
          <span>Hero Cards</span>
        </button>

        <button
          onClick={() => setActiveTab('announcement')}
          className={`py-2 px-4 text-xs font-display font-semibold uppercase tracking-wider border transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'announcement'
              ? 'border-[#eb0a1e] bg-[#eb0a1e]/15 text-white'
              : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Megaphone size={14} />
          <span>Announcement Bar</span>
          <span
            className={`ml-1 px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase border ${
              campaigns.announcementBar.enabled
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-white/10 text-white/40 border-white/10'
            }`}
          >
            {campaigns.announcementBar.enabled ? 'LIVE' : 'OFF'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('exit')}
          className={`py-2 px-4 text-xs font-display font-semibold uppercase tracking-wider border transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'exit'
              ? 'border-[#eb0a1e] bg-[#eb0a1e]/15 text-white'
              : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Gift size={14} />
          <span>Promotional Voucher</span>
          <span
            className={`ml-1 px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase border ${
              campaigns.exitIntentOffer.enabled
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-white/10 text-white/40 border-white/10'
            }`}
          >
            {campaigns.exitIntentOffer.enabled ? 'LIVE' : 'OFF'}
          </span>
        </button>
      </div>

      {/* TAB 1: HERO ACTION DOCK (4 CARDS) */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Card Selector & Order */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-display font-bold tracking-[0.2em] text-white/50 uppercase block">
              SELECT CARD TO CUSTOMIZE
            </span>

            {heroCards.map((card) => {
              const isSelected = card.id === currentCard.id;
              const Icon = INTENT_ICONS[card.intent] || Car;

              return (
                <div
                  key={card.id}
                  onClick={() => setEditingCardId(card.id)}
                  data-selected={isSelected}
                  className={`admin-campaign-card p-4 border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#eb0a1e] bg-[#eb0a1e]/10 text-white shadow-[0_0_20px_rgba(235,10,30,0.15)]'
                      : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center text-[#eb0a1e] shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display text-xs font-bold uppercase text-white truncate block">
                        {card.title}
                      </span>
                    </div>
                  </div>

                  {card.enabled ? (
                    <span className="px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase border bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shrink-0">
                      LIVE
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase border bg-white/10 text-white/40 border-white/10 shrink-0">
                      OFF
                    </span>
                  )}
                </div>
              );
            })}

            <div className="p-3 border border-white/10 bg-white/[0.02] text-[11px] text-white/50 leading-relaxed font-light flex items-center gap-2">
              <Sparkles size={13} className="text-[#eb0a1e] shrink-0" />
              <span>Cards rotate automatically on the homepage hero banner.</span>
            </div>
          </div>

          {/* Right Column: Editor Workspace & Live Card Preview */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border border-white/10 bg-black/60 p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <IconComponent size={20} className="text-[#eb0a1e]" />
                  <h3 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase">
                    EDITING CARD: {currentCard.title}
                  </h3>
                </div>
                <label className="flex items-center gap-2 text-xs font-display font-semibold text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentCard.enabled}
                    onChange={(e) => updateCurrentCard('enabled', e.target.checked)}
                    className="w-4 h-4 accent-[#eb0a1e]"
                  />
                  <span>Card Enabled on Live Site</span>
                </label>
              </div>

              {/* Tag, SubTag & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                    Tag (e.g. VIP ACCESS)
                  </label>
                  <input
                    type="text"
                    value={currentCard.tag}
                    onChange={(e) => updateCurrentCard('tag', e.target.value)}
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-xs font-display font-semibold uppercase tracking-wider text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                    Sub-Tag
                  </label>
                  <input
                    type="text"
                    value={currentCard.subTag}
                    onChange={(e) => updateCurrentCard('subTag', e.target.value)}
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-xs font-display uppercase tracking-wider text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                    Promotional Badge
                  </label>
                  <input
                    type="text"
                    value={currentCard.badge || ''}
                    onChange={(e) => updateCurrentCard('badge', e.target.value)}
                    placeholder="e.g. PRIORITY SLOTS"
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-xs font-display font-semibold uppercase tracking-wider text-[#eb0a1e] outline-none"
                  />
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                  Card Main Title
                </label>
                <input
                  type="text"
                  value={currentCard.title}
                  onChange={(e) => updateCurrentCard('title', e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-sm font-druk uppercase tracking-wider text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={currentCard.description}
                  onChange={(e) => updateCurrentCard('description', e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-xs text-white/80 leading-relaxed outline-none"
                />
              </div>

              {/* Action Pills */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase">
                    Pills Title & Highlight Tags
                  </label>
                  <button
                    type="button"
                    onClick={addPill}
                    className="py-1 px-2.5 bg-white/10 hover:bg-white/20 text-[10px] font-display font-semibold uppercase tracking-wider text-white flex items-center gap-1"
                  >
                    <Plus size={12} />
                    <span>Add Tag</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={currentCard.pillsTitle}
                  onChange={(e) => updateCurrentCard('pillsTitle', e.target.value)}
                  placeholder="Pills Section Title (e.g. AVAILABLE FLEET READY FOR DRIVE)"
                  className="w-full px-3 py-1.5 bg-white/[0.03] border border-white/10 text-xs font-display text-white/70 outline-none"
                />

                <div className="flex flex-wrap gap-2 pt-1">
                  {currentCard.pills.map((pill, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-center bg-white/[0.05] border border-white/15 px-2.5 py-1 text-xs"
                    >
                      <input
                        type="text"
                        value={pill.label}
                        onChange={(e) => updatePill(pIdx, e.target.value)}
                        className="bg-transparent text-white text-xs font-display font-semibold uppercase tracking-wider outline-none w-32"
                      />
                      <button
                        type="button"
                        onClick={() => removePill(pIdx)}
                        className="text-white/40 hover:text-red-400 ml-1.5"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perks Checklist */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase">
                    Key Perks / Guarantees
                  </label>
                  <button
                    type="button"
                    onClick={addPerk}
                    className="py-1 px-2.5 bg-white/10 hover:bg-white/20 text-[10px] font-display font-semibold uppercase tracking-wider text-white flex items-center gap-1"
                  >
                    <Plus size={12} />
                    <span>Add Perk</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {currentCard.perks.map((perk, kIdx) => (
                    <div key={kIdx} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#eb0a1e] shrink-0" />
                      <input
                        type="text"
                        value={perk}
                        onChange={(e) => updatePerk(kIdx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-white/[0.03] border border-white/10 text-xs text-white/80 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removePerk(kIdx)}
                        className="text-white/40 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Label */}
              <div className="pt-2 border-t border-white/10">
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                  CTA Action Button Label
                </label>
                <input
                  type="text"
                  value={currentCard.cta}
                  onChange={(e) => updateCurrentCard('cta', e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-xs font-display font-bold uppercase tracking-wider text-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL ANNOUNCEMENT TICKER */}
      {activeTab === 'announcement' && (
        <div className="border border-white/10 bg-black/60 p-6 sm:p-8 max-w-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display text-sm font-bold tracking-[0.2em] text-white uppercase">
                  GLOBAL ANNOUNCEMENT TICKER
                </h2>
                <span
                  className={`px-2 py-0.5 text-[9px] font-display font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                    campaigns.announcementBar.enabled
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-white/10 text-white/50 border-white/15'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      campaigns.announcementBar.enabled
                        ? 'bg-emerald-400 animate-pulse'
                        : 'bg-zinc-500'
                    }`}
                  />
                  {campaigns.announcementBar.enabled ? 'LIVE ON SITE' : 'DISABLED / OFF'}
                </span>
              </div>
              <p className="text-xs text-white/60 font-light">
                Displayed prominently at the top of the website for festive benefits, booking alerts, or exclusive Kerala events.
              </p>
            </div>

            {/* Instant Tactile Toggle Switch */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-white/80">
                {campaigns.announcementBar.enabled ? 'Active' : 'Off'}
              </span>
              <button
                type="button"
                onClick={() => handleToggleAnnouncement(!campaigns.announcementBar.enabled)}
                className={`relative w-12 h-6.5 rounded-full transition-colors duration-200 cursor-pointer p-0.5 border ${
                  campaigns.announcementBar.enabled
                    ? 'bg-[#eb0a1e] border-[#eb0a1e]'
                    : 'bg-zinc-700 border-zinc-600'
                }`}
                role="switch"
                aria-checked={campaigns.announcementBar.enabled}
                title={campaigns.announcementBar.enabled ? 'Click to turn OFF banner' : 'Click to turn ON banner'}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                    campaigns.announcementBar.enabled ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                Badge Tag (e.g. KERALA PRIVILEGE / FESTIVE BENEFIT)
              </label>
              <input
                type="text"
                value={campaigns.announcementBar.badge || ''}
                onChange={(e) =>
                  setCampaigns({
                    ...campaigns,
                    announcementBar: { ...campaigns.announcementBar, badge: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-xs font-display font-bold uppercase tracking-wider text-[#eb0a1e] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                Announcement Message
              </label>
              <textarea
                rows={3}
                value={campaigns.announcementBar.text}
                onChange={(e) =>
                  setCampaigns({
                    ...campaigns,
                    announcementBar: { ...campaigns.announcementBar, text: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-xs text-white leading-relaxed outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                Destination Link URL (Optional)
              </label>
              <input
                type="text"
                value={campaigns.announcementBar.link || ''}
                onChange={(e) =>
                  setCampaigns({
                    ...campaigns,
                    announcementBar: { ...campaigns.announcementBar, link: e.target.value },
                  })
                }
                placeholder="/contact or /promotions"
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-xs font-mono text-white outline-none"
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-display font-bold tracking-widest text-white/40 uppercase">
                LIVE PREVIEW
              </span>
              {campaigns.announcementBar.enabled ? (
                <span className="text-[9px] font-display font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Showing to Customers on nippontoyota.co.in
                </span>
              ) : (
                <span className="text-[9px] font-display font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  Currently Hidden on Live Site
                </span>
              )}
            </div>

            {campaigns.announcementBar.enabled ? (
              <div className="py-2.5 px-4 bg-[#eb0a1e] text-white text-xs font-display flex items-center justify-center gap-2 text-center shadow-lg">
                {campaigns.announcementBar.badge && (
                  <span className="px-2 py-0.5 bg-black/30 font-bold tracking-widest uppercase text-[9px]">
                    {campaigns.announcementBar.badge}
                  </span>
                )}
                <span className="tracking-wider">{campaigns.announcementBar.text}</span>
                {campaigns.announcementBar.link && (
                  <span className="underline font-bold text-[10px] ml-1 opacity-90">Details →</span>
                )}
              </div>
            ) : (
              <div className="border border-dashed border-white/15 bg-white/[0.02] p-5 text-center">
                <div className="py-2 px-3 bg-white/[0.03] border border-white/10 text-white/40 text-xs font-display flex items-center justify-center gap-2 text-center opacity-60">
                  {campaigns.announcementBar.badge && (
                    <span className="px-2 py-0.5 bg-white/10 text-white/40 font-bold tracking-widest uppercase text-[9px]">
                      {campaigns.announcementBar.badge}
                    </span>
                  )}
                  <span className="tracking-wider">{campaigns.announcementBar.text}</span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-[10px] font-display font-bold text-white/40 tracking-wider uppercase">
                    BANNER IS CURRENTLY TURNED OFF
                  </span>
                  <span className="text-white/20">·</span>
                  <button
                    type="button"
                    onClick={() => handleToggleAnnouncement(true)}
                    className="text-[10px] font-display font-bold text-[#eb0a1e] hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    Click to Enable
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleSaveAnnouncement}
              disabled={saving}
              className="py-2.5 px-6 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(235,10,30,0.3)]"
            >
              <Save size={14} />
              <span>{saving ? 'Saving...' : 'Save Ticker Content'}</span>
            </button>
            <span className="text-[11px] text-white/40 font-mono">
              Status: {campaigns.announcementBar.enabled ? 'ACTIVE' : 'OFF'}
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: EXIT-INTENT VOUCHER */}
      {activeTab === 'exit' && (
        <div className="border border-white/10 bg-black/60 p-6 sm:p-8 max-w-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display text-sm font-bold tracking-[0.2em] text-white uppercase">
                  EXIT-INTENT POPUP VOUCHER
                </h2>
                <span
                  className={`px-2 py-0.5 text-[9px] font-display font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                    campaigns.exitIntentOffer.enabled
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-white/10 text-white/50 border-white/15'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      campaigns.exitIntentOffer.enabled
                        ? 'bg-emerald-400 animate-pulse'
                        : 'bg-zinc-500'
                    }`}
                  />
                  {campaigns.exitIntentOffer.enabled ? 'LIVE ON SITE' : 'DISABLED / OFF'}
                </span>
              </div>
              <p className="text-xs text-white/60 font-light">
                Triggers when a desktop customer moves their mouse toward the browser address bar / tabs to leave.
              </p>
            </div>

            {/* Instant Tactile Toggle Switch */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-white/80">
                {campaigns.exitIntentOffer.enabled ? 'Active' : 'Off'}
              </span>
              <button
                type="button"
                onClick={() => handleToggleExitIntent(!campaigns.exitIntentOffer.enabled)}
                className={`relative w-12 h-6.5 rounded-full transition-colors duration-200 cursor-pointer p-0.5 border ${
                  campaigns.exitIntentOffer.enabled
                    ? 'bg-[#eb0a1e] border-[#eb0a1e]'
                    : 'bg-zinc-700 border-zinc-600'
                }`}
                role="switch"
                aria-checked={campaigns.exitIntentOffer.enabled}
                title={campaigns.exitIntentOffer.enabled ? 'Click to turn OFF popup' : 'Click to turn ON popup'}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                    campaigns.exitIntentOffer.enabled ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                  Voucher Badge Amount
                </label>
                <input
                  type="text"
                  value={campaigns.exitIntentOffer.voucherAmount}
                  onChange={(e) =>
                    setCampaigns({
                      ...campaigns,
                      exitIntentOffer: { ...campaigns.exitIntentOffer, voucherAmount: e.target.value },
                    })
                  }
                  placeholder="₹25,000"
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-xs font-mono font-bold text-emerald-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                  Popup Headline
                </label>
                <input
                  type="text"
                  value={campaigns.exitIntentOffer.headline}
                  onChange={(e) =>
                    setCampaigns({
                      ...campaigns,
                      exitIntentOffer: { ...campaigns.exitIntentOffer, headline: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-xs font-display font-bold uppercase tracking-wider text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                Sub-Headline
              </label>
              <textarea
                rows={2}
                value={campaigns.exitIntentOffer.subheadline}
                onChange={(e) =>
                  setCampaigns({
                    ...campaigns,
                    exitIntentOffer: { ...campaigns.exitIntentOffer, subheadline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-xs text-white/80 leading-relaxed outline-none"
              />
            </div>

            {/* Perks */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase">
                Voucher Terms / Perks
              </label>
              {campaigns.exitIntentOffer.perkDetails.map((perk, pIdx) => (
                <div key={pIdx} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#eb0a1e] shrink-0" />
                  <input
                    type="text"
                    value={perk}
                    onChange={(e) => {
                      const next = [...campaigns.exitIntentOffer.perkDetails];
                      next[pIdx] = e.target.value;
                      setCampaigns({
                        ...campaigns,
                        exitIntentOffer: { ...campaigns.exitIntentOffer, perkDetails: next },
                      });
                    }}
                    className="flex-1 px-3 py-1.5 bg-white/[0.03] border border-white/10 text-xs text-white outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleSaveExitIntent}
              disabled={saving}
              className="py-2.5 px-6 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(235,10,30,0.3)]"
            >
              <Save size={14} />
              <span>{saving ? 'Saving...' : 'Save Exit Voucher'}</span>
            </button>
            <span className="text-[11px] text-white/40 font-mono">
              Status: {campaigns.exitIntentOffer.enabled ? 'ACTIVE' : 'OFF'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
