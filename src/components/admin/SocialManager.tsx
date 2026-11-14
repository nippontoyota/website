"use client";

import { useState } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  X,
  Save,
  Share2,
} from 'lucide-react';
import { SocialLink, SocialPlatform } from '@/lib/types/admin';
import SocialIcon, { PLATFORM_CONFIG } from './SocialIcon';
import { toast } from '@/lib/toast';

interface SocialManagerProps {
  initialSocialLinks: SocialLink[];
}

const AVAILABLE_PLATFORMS: SocialPlatform[] = [
  'instagram',
  'facebook',
  'youtube',
  'whatsapp',
  'x',
  'linkedin',
  'threads',
  'custom',
];

export default function SocialManager({ initialSocialLinks }: SocialManagerProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

  // Form State
  const [platform, setPlatform] = useState<SocialPlatform>('instagram');
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [handle, setHandle] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  const openAddModal = () => {
    setEditingLink(null);
    setPlatform('instagram');
    setLabel('Instagram');
    setUrl(PLATFORM_CONFIG.instagram.placeholder);
    setHandle('@nippon.toyota');
    setEnabled(true);
    setIsModalOpen(true);
  };

  const openEditModal = (link: SocialLink) => {
    setEditingLink(link);
    setPlatform(link.platform);
    setLabel(link.label);
    setUrl(link.url);
    setHandle(link.handle || '');
    setEnabled(link.enabled);
    setIsModalOpen(true);
  };

  const handlePlatformChange = (p: SocialPlatform) => {
    setPlatform(p);
    // If creating new, auto-fill default label and placeholder
    if (!editingLink) {
      const cfg = PLATFORM_CONFIG[p];
      setLabel(cfg.name);
      setUrl(cfg.placeholder);
      if (p === 'whatsapp') {
        setHandle('+91 99461 01111');
      } else if (p === 'facebook') {
        setHandle('Nippon Toyota Kerala');
      } else if (p === 'linkedin') {
        setHandle('Nippon Toyota');
      } else {
        setHandle('@nippon.toyota');
      }
    }
  };

  const handleToggle = async (link: SocialLink) => {
    const nextEnabled = !link.enabled;
    const updated = { ...link, enabled: nextEnabled };

    // Optimistic UI update
    setSocialLinks((prev) => prev.map((s) => (s.id === link.id ? updated : s)));

    try {
      const res = await fetch('/api/admin/socials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: link.id, enabled: nextEnabled }),
      });
      if (!res.ok) throw new Error('Failed to update status');

      if (nextEnabled) {
        toast.success(`${link.label} is now LIVE on website`);
      } else {
        toast.info(`${link.label} is now hidden from website`);
      }
    } catch (err) {
      console.error(err);
      toast.error(`Failed to update ${link.label}`);
      setSocialLinks(socialLinks);
    }
  };

  const handleDelete = async (link: SocialLink) => {
    if (!window.confirm(`Are you sure you want to remove ${link.label}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/socials?id=${encodeURIComponent(link.id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete social link');

      setSocialLinks((prev) => prev.filter((s) => s.id !== link.id));
      toast.success(`Removed ${link.label}`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to delete ${link.label}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !url.trim()) {
      toast.error('Channel label and URL are required.');
      return;
    }

    setSaving(true);
    try {
      if (editingLink) {
        // Update existing
        const res = await fetch('/api/admin/socials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingLink.id,
            platform,
            label,
            url,
            handle,
            enabled,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update social link');

        setSocialLinks((prev) =>
          prev.map((s) => (s.id === editingLink.id ? data.socialLink : s))
        );
        toast.success(`Updated ${label}`);
      } else {
        // Add new
        const res = await fetch('/api/admin/socials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            platform,
            label,
            url,
            handle,
            enabled,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to add social link');

        setSocialLinks((prev) => [...prev, data.socialLink]);
        toast.success(`Added ${label} to channels`);
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const activeCount = socialLinks.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[9px] font-display font-bold tracking-[0.25em] text-[#eb0a1e] uppercase block mb-1">
            CHANNELS ({socialLinks.length})
          </span>
          <h1 className="font-druk text-3xl text-white uppercase tracking-wider">
            SOCIAL MEDIA
          </h1>
          <p className="text-xs text-white/60 font-light">
            Manage official dealership channels, handles, and public website links ({activeCount} live).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="py-2.5 px-4 bg-[#eb0a1e] hover:bg-[#c90819] text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)] shrink-0"
        >
          <Plus size={16} />
          <span>Add Social</span>
        </button>
      </div>

      {/* Social Links Grid */}
      {socialLinks.length === 0 ? (
        <div className="border border-white/10 bg-black/40 p-12 text-center space-y-3">
          <Share2 size={32} className="mx-auto text-white/30" />
          <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider">
            No Social Channels Configured
          </h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto font-light">
            Click &quot;+ Add Social&quot; to connect Instagram, WhatsApp, Facebook, YouTube, or custom platforms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {socialLinks.map((link) => {
            const cfg = PLATFORM_CONFIG[link.platform] || PLATFORM_CONFIG.custom;

            return (
              <div
                key={link.id}
                className="admin-dashboard-card group border border-white/10 bg-black/60 hover:border-white/25 transition-all p-5 flex flex-col justify-between relative"
              >
                <div>
                  {/* Top Bar: Icon + Status Switch */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center text-white shrink-0 group-hover:border-[#eb0a1e]/40 transition-colors">
                        <SocialIcon platform={link.platform} size={22} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-display text-[9px] font-bold tracking-widest text-[#eb0a1e] uppercase block">
                          {cfg.name}
                        </span>
                        <h3 className="font-display text-sm font-bold uppercase text-white truncate block">
                          {link.label}
                        </h3>
                      </div>
                    </div>

                    {/* Tactile Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggle(link)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        link.enabled ? 'bg-[#eb0a1e]' : 'bg-white/20'
                      }`}
                      title={link.enabled ? 'Click to disable' : 'Click to enable on live site'}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          link.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Handle & URL Details */}
                  <div className="space-y-1.5 mb-5 bg-white/[0.02] border border-white/5 p-3 rounded-xs">
                    {link.handle && (
                      <div className="text-xs font-mono font-medium text-white/90 truncate flex items-center gap-1.5">
                        <span className="text-white/40 text-[10px]">HANDLE:</span>
                        <span>{link.handle}</span>
                      </div>
                    )}
                    <div className="text-[11px] font-mono text-white/50 truncate flex items-center gap-1.5">
                      <span className="text-white/30 text-[10px]">URL:</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate hover:text-[#eb0a1e] hover:underline transition-colors flex items-center gap-1"
                        title={link.url}
                      >
                        <span className="truncate">{link.url}</span>
                        <ExternalLink size={11} className="shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer Controls: Live Status + Edit + Delete */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {link.enabled ? (
                      <span className="px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase border bg-emerald-500/20 text-emerald-400 border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE ON SITE</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase border bg-white/10 text-white/40 border-white/10">
                        DISABLED / OFF
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(link)}
                      className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                      title="Edit Channel"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(link)}
                      className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors cursor-pointer"
                      title="Delete Channel"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-lg border border-white/15 bg-[#0e0e11] p-5 sm:p-8 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-center text-[#eb0a1e]">
                  <Share2 size={16} />
                </div>
                <div>
                  <h2 className="font-display text-sm font-bold tracking-wider text-white uppercase">
                    {editingLink ? 'EDIT SOCIAL CHANNEL' : 'ADD SOCIAL CHANNEL'}
                  </h2>
                  <span className="text-[10px] text-white/50 block font-light">
                    Configure link and display settings for Nippon Toyota Kerala
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Platform Selector Buttons */}
              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-2">
                  Select Platform
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_PLATFORMS.map((p) => {
                    const isSelected = platform === p;
                    const cfg = PLATFORM_CONFIG[p];
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePlatformChange(p)}
                        className={`p-2.5 border text-xs font-display font-semibold uppercase tracking-wider flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#eb0a1e] bg-[#eb0a1e]/15 text-white shadow-[0_0_12px_rgba(235,10,30,0.25)]'
                            : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        <SocialIcon platform={p} size={18} />
                        <span className="text-[9px] truncate max-w-full">{cfg.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Label & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                    Channel Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="e.g. Instagram, WhatsApp Sales"
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-xs text-white placeholder:text-white/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                    Handle / Display Name
                  </label>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="e.g. @nippon.toyota"
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-xs text-white placeholder:text-white/30 outline-none"
                  />
                </div>
              </div>

              {/* Profile URL */}
              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                  Profile Destination URL *
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={PLATFORM_CONFIG[platform]?.placeholder || 'https://...'}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-xs text-white placeholder:text-white/30 font-mono outline-none"
                />
              </div>

              {/* Live Switch */}
              <div className="p-3 border border-white/10 bg-white/[0.02] flex items-center justify-between">
                <div>
                  <span className="font-display text-xs font-bold uppercase text-white block">
                    Display on Live Website
                  </span>
                  <span className="text-[10px] text-white/50 block font-light">
                    When active, link appears prominently in the website footer & contact sections.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEnabled(!enabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    enabled ? 'bg-[#eb0a1e]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white/70 font-display text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white font-display text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)]"
                >
                  <Save size={14} />
                  <span>{saving ? 'Saving...' : editingLink ? 'Update Channel' : 'Save Channel'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
