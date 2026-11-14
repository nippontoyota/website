"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  Tag,
  CheckCircle2,
  Sparkles,
  Palette,
} from 'lucide-react';
import { VehicleModel, VehicleStatus } from '@/lib/types/admin';
import VehicleEditorModal from './VehicleEditorModal';
import { toast } from '@/lib/toast';

interface VehicleListProps {
  initialVehicles: VehicleModel[];
}

export default function VehicleList({ initialVehicles }: VehicleListProps) {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<VehicleModel[]>(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<VehicleModel | null>(null);

  // Filter Logic
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'ALL' || v.category.includes(selectedCategory.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || v.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddNew = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (v: VehicleModel) => {
    setEditingVehicle(v);
    setIsModalOpen(true);
  };

  const handleDelete = async (v: VehicleModel) => {
    if (!window.confirm(`Are you sure you want to remove "${v.name}" from the showroom catalog?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/vehicles?id=${encodeURIComponent(v.id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete vehicle');

      setVehicles((prev) => prev.filter((item) => item.id !== v.id));
      toast.success(`Removed "${v.name}" from catalog`);
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(`Failed to delete "${v.name}"`);
    }
  };

  const handleSaved = (saved: VehicleModel) => {
    setVehicles((prev) => {
      const index = prev.findIndex((item) => item.id === saved.id || item.slug === saved.slug);
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...saved };
        return next;
      }
      return [{ ...saved }, ...prev];
    });
    router.refresh();
  };

  const handleToggleStatus = async (v: VehicleModel) => {
    const nextStatus: VehicleStatus = v.status === 'AVAILABLE' ? 'UPCOMING' : 'AVAILABLE';
    const updated = { ...v, status: nextStatus };

    // Optimistic UI update
    setVehicles((prev) => prev.map((item) => (item.id === v.id ? updated : item)));

    try {
      const res = await fetch('/api/admin/vehicles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error('Failed to update status');
      toast.success(`Updated status of ${v.name} to ${nextStatus}`);
    } catch (err) {
      console.error('Status toggle error:', err);
      // Revert on failure
      setVehicles((prev) => prev.map((item) => (item.id === v.id ? v : item)));
      toast.error(`Failed to update ${v.name} status`);
    }
  };

  const CATEGORIES = ['ALL', 'SUV', 'HYBRID', 'MPV', 'SEDAN', '4X4', 'EV'];
  const STATUSES = [
    { key: 'ALL', label: 'All Status' },
    { key: 'AVAILABLE', label: 'Available' },
    { key: 'UPCOMING', label: 'Upcoming' },
    { key: 'BOOKINGS_OPEN', label: 'Bookings Open' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[9px] font-display font-bold tracking-[0.25em] text-[#eb0a1e] uppercase block mb-1">
            CATALOG ({vehicles.length})
          </span>
          <h1 className="font-druk text-3xl text-white uppercase tracking-wider">
            VEHICLES
          </h1>
          <p className="text-xs text-white/60 font-light">
            Manage showroom models, specifications, colors, variants, and display imagery.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="py-2.5 px-4 bg-[#eb0a1e] hover:bg-[#c90819] text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)] shrink-0"
        >
          <Plus size={16} />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by model name (e.g. Hycross, Fortuner, Camry)..."
            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/10 focus:border-[#eb0a1e] text-xs text-white placeholder:text-white/30 tracking-wider outline-none"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Filter size={14} className="text-white/40" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2.5 bg-[#121216] border border-white/10 focus:border-[#eb0a1e] text-xs font-display text-white tracking-wider outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1 px-3 text-[10px] font-display font-bold tracking-wider uppercase border transition-colors ${
                isSelected
                  ? 'border-[#eb0a1e] bg-[#eb0a1e]/20 text-white'
                  : 'border-white/10 bg-black/40 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVehicles.map((v) => {
          const isAvailable = v.status === 'AVAILABLE';

          return (
            <div
              key={v.id}
              className="border border-white/10 bg-black/60 hover:border-white/25 transition-all p-5 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header status bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    {v.badge && (
                      <span className="px-2 py-0.5 text-[8px] font-display font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white flex items-center gap-1">
                        <Sparkles size={9} className="text-[#eb0a1e]" />
                        {v.badge}
                      </span>
                    )}
                    <span className="text-[9px] font-display font-bold tracking-[0.2em] text-[#eb0a1e] uppercase">
                      {v.category.join(' · ')}
                    </span>
                  </div>

                  {/* Clickable Quick Status Toggle */}
                  <button
                    onClick={() => handleToggleStatus(v)}
                    title="Click to toggle status"
                    className={`px-2 py-0.5 text-[9px] font-display font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                      isAvailable
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                        : 'bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/25'
                    }`}
                  >
                    {v.status}
                  </button>
                </div>

                {/* Car Render Image */}
                <div className="w-full h-36 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 relative p-2 mb-4 flex items-center justify-center overflow-hidden">
                  {v.image ? (
                    <Image
                      key={`${v.id}-${v.image}`}
                      src={v.image}
                      alt={v.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xs text-white/30 font-mono">No Image Asset</span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="font-druk text-2xl text-white uppercase tracking-wider mb-1">
                  {v.name}
                </h3>
                <p className="text-xs text-white/60 font-light mb-4 line-clamp-2">
                  {v.tagline}
                </p>

                {/* Pricing Overview */}
                <div className="space-y-1.5 py-3 border-y border-white/10 text-xs font-mono">
                  <div className="flex justify-between items-center text-white/70">
                    <span className="text-[10px] uppercase font-display tracking-wider">Base Ex-Showroom</span>
                    <span className="text-white font-semibold">{v.basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/70">
                    <span className="text-[10px] uppercase font-display tracking-wider">On-Road Kochi</span>
                    <span className="text-emerald-400 font-semibold">{v.onRoadKochiRange}</span>
                  </div>
                </div>

                {/* Features & Color Indicators */}
                <div className="flex items-center justify-between pt-3 text-[10px] font-display text-white/50 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Tag size={11} className="text-[#eb0a1e]" />
                    {v.variants.length} Trims
                  </span>
                  <span className="flex items-center gap-1">
                    <Palette size={11} className="text-[#eb0a1e]" />
                    {v.colors.length} Colors
                  </span>
                  {v.brochureUrl && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      PDF Ready
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(v)}
                  className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                  title="Remove Model"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  onClick={() => handleEdit(v)}
                  className="py-1.5 px-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Edit3 size={12} />
                  <span>Edit Model</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-16 border border-white/10 bg-black/40">
          <p className="text-xs text-white/40 font-mono mb-3">No vehicles match the selected search or filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('ALL');
              setSelectedStatus('ALL');
            }}
            className="text-xs font-display font-semibold text-[#eb0a1e] uppercase tracking-wider hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Vehicle Editor Modal */}
      {isModalOpen && (
        <VehicleEditorModal
          key={editingVehicle ? (editingVehicle.id || editingVehicle.slug) : 'new-model'}
          vehicle={editingVehicle}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingVehicle(null);
          }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
