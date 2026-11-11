"use client";

import { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  X,
  Save,
  Building2,
  Search,
} from 'lucide-react';
import { BranchLocation } from '@/lib/types/admin';
import { toast } from '@/lib/toast';

interface BranchManagerProps {
  initialBranches: BranchLocation[];
}

export default function BranchManager({ initialBranches }: BranchManagerProps) {
  const [branches, setBranches] = useState<BranchLocation[]>(initialBranches);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchLocation | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<'3S_FACILITY' | 'SHOWROOM' | 'SERVICE'>('3S_FACILITY');
  const [city, setCity] = useState('Kochi');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [timing, setTiming] = useState('Mon–Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM');
  const [mapUrl, setMapUrl] = useState('');
  const [isMainBranch, setIsMainBranch] = useState(false);

  const [saving, setSaving] = useState(false);

  const notify = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const openAddModal = () => {
    setEditingBranch(null);
    setName('');
    setType('3S_FACILITY');
    setCity('Kochi');
    setAddress('');
    setPhone('');
    setWhatsapp('');
    setTiming('Mon–Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM');
    setMapUrl('');
    setIsMainBranch(false);
    setIsModalOpen(true);
  };

  const openEditModal = (b: BranchLocation) => {
    setEditingBranch(b);
    setName(b.name);
    setType(b.type);
    setCity(b.city);
    setAddress(b.address);
    setPhone(b.phone);
    setWhatsapp(b.whatsapp);
    setTiming(b.timing);
    setMapUrl(b.mapUrl);
    setIsMainBranch(b.isMainBranch ?? false);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city || !phone) {
      notify('error', 'Name, City, and Phone are required.');
      return;
    }

    setSaving(true);
    const payload: BranchLocation = {
      id: editingBranch?.id || `branch-${Date.now().toString().slice(-5)}`,
      name,
      type,
      city,
      address,
      phone,
      whatsapp,
      timing,
      mapUrl: mapUrl || `https://maps.google.com/?q=${encodeURIComponent(name + ' ' + city)}`,
      isMainBranch,
    };

    try {
      const res = await fetch('/api/admin/branches', {
        method: editingBranch ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save branch');

      if (editingBranch) {
        setBranches((prev) => prev.map((b) => (b.id === payload.id ? payload : b)));
        notify('success', `Updated ${payload.name}`);
      } else {
        setBranches((prev) => [...prev, payload]);
        notify('success', `Added ${payload.name}`);
      }

      setIsModalOpen(false);
    } catch (err: unknown) {
      notify('error', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (b: BranchLocation) => {
    if (!window.confirm(`Are you sure you want to delete ${b.name}?`)) return;

    try {
      const res = await fetch(`/api/admin/branches?id=${encodeURIComponent(b.id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete branch');

      setBranches((prev) => prev.filter((item) => item.id !== b.id));
      notify('success', `Removed ${b.name}`);
    } catch (err) {
      console.error(err);
      notify('error', 'Failed to delete branch');
    }
  };

  // Filter Branches
  const filtered = branches.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = selectedCity === 'ALL' || b.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const CITIES = ['ALL', 'Kochi', 'Trivandrum', 'Thrissur', 'Kozhikode', 'Kottayam', 'Kollam'];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[9px] font-display font-bold tracking-[0.25em] text-[#eb0a1e] uppercase block mb-1">
            LOCATIONS ({branches.length})
          </span>
          <h1 className="font-druk text-3xl text-white uppercase tracking-wider">
            BRANCH DIRECTORY
          </h1>
          <p className="text-xs text-white/60 font-light">
            Manage showroom addresses, phone numbers, WhatsApp desks, and map locations.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="py-2.5 px-4 bg-[#eb0a1e] hover:bg-[#c90819] text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)] shrink-0"
        >
          <Plus size={16} />
          <span>Add Branch</span>
        </button>
      </div>

      {/* Search & City Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search branches by location or street..."
            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/10 focus:border-[#eb0a1e] text-xs text-white placeholder:text-white/30 tracking-wider outline-none"
          />
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {CITIES.map((c) => {
            const isSelected = selectedCity === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`py-1 px-3 text-[10px] font-display font-bold tracking-wider uppercase border transition-colors ${
                  isSelected
                    ? 'border-[#eb0a1e] bg-[#eb0a1e]/20 text-white'
                    : 'border-white/10 bg-black/40 text-white/50 hover:text-white'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="border border-white/10 bg-black/60 hover:border-white/25 transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-display font-bold tracking-[0.2em] text-[#eb0a1e] uppercase">
                  {b.type.replace('_', ' ')}
                </span>
                {b.isMainBranch && (
                  <span className="px-2 py-0.5 text-[8px] font-display font-bold uppercase bg-white/10 border border-white/20 text-white flex items-center gap-1">
                    <Building2 size={10} className="text-[#eb0a1e]" />
                    HEADQUARTERS
                  </span>
                )}
              </div>

              <h3 className="font-druk text-xl text-white uppercase tracking-wider mb-2">
                {b.name}
              </h3>
              <p className="text-xs text-white/60 font-light mb-4 leading-relaxed">
                {b.address}
              </p>

              <div className="space-y-2 py-3 border-y border-white/10 text-xs font-mono text-white/80">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 font-display uppercase text-[10px]">Helpline</span>
                  <a href={`tel:${b.phone}`} className="hover:text-white hover:underline flex items-center gap-1">
                    <Phone size={11} className="text-[#eb0a1e]" />
                    {b.phone}
                  </a>
                </div>

                {b.whatsapp && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 font-display uppercase text-[10px]">WhatsApp</span>
                    <a
                      href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <MessageSquare size={11} />
                      {b.whatsapp}
                    </a>
                  </div>
                )}

                <div className="text-[11px] text-white/50 pt-1">
                  {b.timing}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-between text-xs font-display">
              <a
                href={b.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white flex items-center gap-1 text-[11px] uppercase tracking-wider"
              >
                <MapPin size={12} className="text-[#eb0a1e]" />
                <span>Google Map</span>
                <ExternalLink size={11} />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(b)}
                  className="py-1 px-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <Edit3 size={11} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(b)}
                  className="p-1.5 text-white/30 hover:text-red-400"
                  title="Remove Branch"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Branch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0d0d10] border border-white/20 p-5 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h2 className="font-druk text-xl text-white uppercase tracking-wider">
                {editingBranch ? 'EDIT BRANCH' : 'ADD NEW BRANCH'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-display font-bold tracking-wider text-white/60 uppercase mb-1">
                  Branch Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kochi — Kalamassery"
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-display font-bold tracking-wider text-white/60 uppercase mb-1">
                    Facility Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as '3S_FACILITY' | 'SHOWROOM' | 'SERVICE')}
                    className="w-full px-3 py-2 bg-[#121216] border border-white/15 text-white outline-none"
                  >
                    <option value="3S_FACILITY">3S Facility (Sales + Service + Spares)</option>
                    <option value="SHOWROOM">Showroom Only</option>
                    <option value="SERVICE">Service Center Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-wider text-white/60 uppercase mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Kochi"
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-white outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-wider text-white/60 uppercase mb-1">
                  Full Postal Address
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Landmark, City, PIN"
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-display font-bold tracking-wider text-white/60 uppercase mb-1">
                    Phone Helpline *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 484 255 5555"
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-white font-mono outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-wider text-white/60 uppercase mb-1">
                    WhatsApp Desk Number
                  </label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+91 98470 12345"
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-wider text-white/60 uppercase mb-1">
                  Operating Timings
                </label>
                <input
                  type="text"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-wider text-white/60 uppercase mb-1">
                  Google Maps URL
                </label>
                <input
                  type="text"
                  value={mapUrl}
                  onChange={(e) => setMapUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 text-white font-mono text-[11px] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="main-branch-toggle"
                  checked={isMainBranch}
                  onChange={(e) => setIsMainBranch(e.target.checked)}
                  className="w-4 h-4 accent-[#eb0a1e]"
                />
                <label htmlFor="main-branch-toggle" className="text-xs text-white/80 cursor-pointer">
                  Mark as Nippon Toyota Kerala Headquarters / Primary Facility
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 border border-white/15 text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="py-2 px-5 bg-[#eb0a1e] hover:bg-[#c90819] text-white font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save size={14} />
                  <span>{saving ? 'Saving...' : 'Save Branch'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
