"use client";

import { useState } from 'react';
import {
  X,
  Save,
  Upload,
  Plus,
  Trash2,
  Sparkles,
  Car,
  Palette,
  FileText,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import Image from 'next/image';
import { VehicleModel, CarColor, CarVariant, CarSpec, VehicleStatus } from '@/lib/types/admin';
import { toast } from '@/lib/toast';

interface VehicleEditorModalProps {
  vehicle: VehicleModel | null; // null means adding a new vehicle
  isOpen: boolean;
  onClose: () => void;
  onSaved: (vehicle: VehicleModel) => void;
}

const CATEGORY_OPTIONS = ['cars', 'suv', 'mpv', 'hybrid', 'sedan', '4x4', 'ev'];
const STATUS_OPTIONS: { value: VehicleStatus; label: string }[] = [
  { value: 'AVAILABLE', label: 'Available in Showrooms' },
  { value: 'UPCOMING', label: 'Upcoming / Concept' },
  { value: 'BOOKINGS_OPEN', label: 'Bookings Open' },
  { value: 'WAITING_LIST', label: 'Waiting List' },
];

export default function VehicleEditorModal({
  vehicle,
  isOpen,
  onClose,
  onSaved,
}: VehicleEditorModalProps) {
  const isNew = !vehicle;

  const [activeTab, setActiveTab] = useState<'general' | 'media' | 'colors' | 'variants' | 'specs'>('general');

  // Form State initialized directly from vehicle prop
  const [name, setName] = useState(vehicle?.name || '');
  const [slug, setSlug] = useState(vehicle?.slug || '');
  const [fullName, setFullName] = useState(vehicle?.fullName || '');
  const [tagline, setTagline] = useState(vehicle?.tagline || '');
  const [category, setCategory] = useState<string[]>(vehicle?.category || ['cars']);
  const [status, setStatus] = useState<VehicleStatus>(vehicle?.status || 'AVAILABLE');
  const [badge, setBadge] = useState(vehicle?.badge || '');
  const [basePrice, setBasePrice] = useState(vehicle?.basePrice || '');
  const [exShowroomRange, setExShowroomRange] = useState(vehicle?.exShowroomRange || '');
  const [onRoadKochiRange, setOnRoadKochiRange] = useState(vehicle?.onRoadKochiRange || '');
  const [image, setImage] = useState(vehicle?.image || '/hycross.png');
  const [brochureUrl, setBrochureUrl] = useState(vehicle?.brochureUrl || '');
  const [disclaimer, setDisclaimer] = useState(
    vehicle?.disclaimer || 'Ex-showroom price, Kochi. Prices subject to change.'
  );
  const [featured, setFeatured] = useState(vehicle?.featured ?? false);

  // Sub-items
  const [colors, setColors] = useState<CarColor[]>(
    vehicle?.colors ? JSON.parse(JSON.stringify(vehicle.colors)) : []
  );
  const [variants, setVariants] = useState<CarVariant[]>(
    vehicle?.variants ? JSON.parse(JSON.stringify(vehicle.variants)) : []
  );
  const [specs, setSpecs] = useState<CarSpec[]>(
    vehicle?.specs ? JSON.parse(JSON.stringify(vehicle.specs)) : []
  );

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingBrochure, setUploadingBrochure] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Auto-generate slug from name if new
  const handleNameChange = (val: string) => {
    setName(val);
    if (isNew && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      );
    }
  };

  const toggleCategory = (cat: string) => {
    if (category.includes(cat)) {
      setCategory(category.filter((c) => c !== cat));
    } else {
      setCategory([...category, cat]);
    }
  };

  // Upload Handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'vehicles' | 'brochures') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'vehicles') setUploadingImage(true);
    else setUploadingBrochure(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      if (type === 'vehicles') {
        setImage(data.url);
        toast.success('Vehicle image uploaded');
      } else {
        setBrochureUrl(data.url);
        toast.success('Brochure PDF uploaded');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setError(msg);
      toast.error(msg);
    } finally {
      if (type === 'vehicles') setUploadingImage(false);
      else setUploadingBrochure(false);
    }
  };

  // Color Swatch Operations
  const addColor = () => {
    const id = `color-${Date.now().toString().slice(-4)}`;
    setColors([...colors, { id, name: '', hex: '#000000', dualTone: false }]);
  };

  const updateColor = (index: number, field: keyof CarColor, value: unknown) => {
    const next = [...colors];
    next[index] = { ...next[index], [field]: value };
    setColors(next);
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  // Variant Operations
  const addVariant = () => {
    const id = `var-${Date.now().toString().slice(-4)}`;
    setVariants([...variants, { id, name: '', fuel: 'Petrol', transmission: 'AT', price: '' }]);
  };

  const updateVariant = (index: number, field: keyof CarVariant, value: string) => {
    const next = [...variants];
    next[index] = { ...next[index], [field]: value };
    setVariants(next);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // Specs Operations
  const addSpec = () => {
    setSpecs([...specs, { label: '', value: '' }]);
  };

  const updateSpec = (index: number, field: keyof CarSpec, value: string) => {
    const next = [...specs];
    next[index] = { ...next[index], [field]: value };
    setSpecs(next);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      setError('Model Name and Slug are required.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload: VehicleModel = {
      id: vehicle?.id || slug,
      slug,
      name,
      fullName: fullName || `Toyota ${name}`,
      tagline,
      category,
      status,
      badge: badge.trim() || null,
      basePrice: basePrice || 'TBA',
      exShowroomRange: exShowroomRange || basePrice,
      onRoadKochiRange: onRoadKochiRange || 'Contact Dealer',
      image,
      brochureUrl: brochureUrl || undefined,
      colors,
      variants,
      specs,
      features: vehicle?.features || [],
      disclaimer,
      featured,
      order: vehicle?.order ?? 99,
    };

    try {
      const res = await fetch('/api/admin/vehicles', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save model');

      toast.success(isNew ? `Created ${name} successfully` : `Updated ${name} details successfully`);
      onSaved(data.vehicle || payload);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d0d10] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center text-[#eb0a1e]">
              <Car size={20} />
            </div>
            <div>
              <span className="font-display text-[9px] font-bold tracking-[0.25em] text-[#eb0a1e] uppercase block">
                {isNew ? 'ADD NEW MODEL TO FLEET' : `EDIT MODEL · ${(vehicle?.name || name).toUpperCase()}`}
              </span>
              <h2 className="font-druk text-2xl text-white uppercase tracking-wider">
                {name || vehicle?.name || (isNew ? 'New Toyota Model' : '')}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-white/10 bg-black/20 overflow-x-auto text-xs font-display font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'general' ? 'border-[#eb0a1e] text-white' : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Sliders size={14} />
            <span>General Info</span>
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'media' ? 'border-[#eb0a1e] text-white' : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Eye size={14} />
            <span>Image & Brochure</span>
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'colors' ? 'border-[#eb0a1e] text-white' : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Palette size={14} />
            <span>Colors ({colors.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('variants')}
            className={`py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'variants' ? 'border-[#eb0a1e] text-white' : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            <span>Variants & Trims ({variants.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-2.5 px-3.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'specs' ? 'border-[#eb0a1e] text-white' : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>Specs ({specs.length})</span>
          </button>
        </div>

        {/* Form Body with Smooth Scroll */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3.5 bg-[#eb0a1e]/15 border border-[#eb0a1e]/40 text-[#ff4d5a] text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: GENERAL INFO */}
          {activeTab === 'general' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                    Model Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Innova Hycross"
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs tracking-wider outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="e.g. innova-hycross"
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-mono tracking-wider outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                    Official Full Title
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. All-New Toyota Innova Hycross"
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                    Showroom Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. HYBRID, NEW, TOP SELLER"
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-display uppercase tracking-wider outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                  Marketing Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. The New High of Luxury & Hybrid Efficiency."
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs outline-none"
                />
              </div>

              {/* Showroom Status & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                    Showroom Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                    className="w-full px-3.5 py-2.5 bg-[#121216] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-display tracking-wider outline-none"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                    Category Tags
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORY_OPTIONS.map((cat) => {
                      const isSelected = category.includes(cat);
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`px-2.5 py-1 text-[10px] font-display font-bold uppercase tracking-wider border transition-colors ${
                            isSelected
                              ? 'border-[#eb0a1e] bg-[#eb0a1e]/20 text-white'
                              : 'border-white/10 bg-white/[0.03] text-white/60 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Pricing overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10">
                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                    Base Starting Price
                  </label>
                  <input
                    type="text"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    placeholder="e.g. ₹18.92 Lakhs*"
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                    Ex-Showroom Range
                  </label>
                  <input
                    type="text"
                    value={exShowroomRange}
                    onChange={(e) => setExShowroomRange(e.target.value)}
                    placeholder="e.g. ₹18.92L – ₹30.68L"
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                    On-Road Kochi Range
                  </label>
                  <input
                    type="text"
                    value={onRoadKochiRange}
                    onChange={(e) => setOnRoadKochiRange(e.target.value)}
                    placeholder="e.g. ₹22.82L – ₹38.45L"
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/70 uppercase mb-1.5">
                  Price Disclaimer Notice
                </label>
                <input
                  type="text"
                  value={disclaimer}
                  onChange={(e) => setDisclaimer(e.target.value)}
                  placeholder="Ex-showroom price, Kochi. Prices subject to change."
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#eb0a1e] bg-black"
                />
                <label htmlFor="featured-toggle" className="text-xs text-white/80 cursor-pointer">
                  Feature this vehicle on the home page showroom highlight
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA & BROCHURE */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Car Cutout PNG */}
              <div className="border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xs font-bold tracking-wider text-white uppercase">
                      Vehicle Cutout PNG Render
                    </h3>
                    <p className="text-xs text-white/50 font-light">
                      Transparent background exterior profile render used in the vehicle slider.
                    </p>
                  </div>
                  <label className="py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors">
                    <Upload size={12} />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'vehicles')}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-center">
                  <div className="w-48 h-32 bg-white/[0.03] border border-white/10 flex items-center justify-center relative p-3">
                    {image ? (
                      <Image
                        src={image}
                        alt="Preview"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    ) : (
                      <span className="text-[10px] text-white/30">No Image</span>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                      Image Path or URL
                    </label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="/hycross.png or /uploads/vehicles/..."
                      className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* PDF Brochure */}
              <div className="border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xs font-bold tracking-wider text-white uppercase">
                      Official PDF Brochure
                    </h3>
                    <p className="text-xs text-white/50 font-light">
                      Served when customers click &apos;Download Brochure&apos; on this car.
                    </p>
                  </div>
                  <label className="py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors">
                    <Upload size={12} />
                    <span>{uploadingBrochure ? 'Uploading...' : 'Upload PDF'}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileUpload(e, 'brochures')}
                      className="hidden"
                      disabled={uploadingBrochure}
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase">
                    Brochure URL / File Path
                  </label>
                  <input
                    type="text"
                    value={brochureUrl}
                    onChange={(e) => setBrochureUrl(e.target.value)}
                    placeholder="/brochures/innova-hycross.pdf or external CDN URL"
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-mono outline-none"
                  />
                  {brochureUrl && (
                    <a
                      href={brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#eb0a1e] hover:underline pt-1"
                    >
                      <CheckCircle2 size={12} />
                      <span>Test Brochure Link</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COLORS PALETTE */}
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xs font-bold tracking-wider text-white uppercase">
                    Exterior Paint Palette
                  </h3>
                  <p className="text-xs text-white/50 font-light">
                    Visual swatches shown on the 360 viewer and color selector.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addColor}
                  className="py-1.5 px-3 bg-[#eb0a1e] hover:bg-[#c90819] text-white text-[10px] font-display font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Color</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {colors.map((color, idx) => (
                  <div key={color.id || idx} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/10">
                    <input
                      type="color"
                      value={color.hex || '#000000'}
                      onChange={(e) => updateColor(idx, 'hex', e.target.value)}
                      className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => updateColor(idx, 'name', e.target.value)}
                      placeholder="Color Name (e.g. Platinum White Pearl)"
                      className="flex-1 px-3 py-1.5 bg-white/[0.04] border border-white/15 text-xs text-white outline-none"
                    />
                    <input
                      type="text"
                      value={color.hex}
                      onChange={(e) => updateColor(idx, 'hex', e.target.value)}
                      placeholder="#HEX"
                      className="w-24 px-2 py-1.5 bg-white/[0.04] border border-white/15 text-xs font-mono text-white/80 outline-none"
                    />
                    <label className="flex items-center gap-1.5 text-xs text-white/60 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={color.dualTone ?? false}
                        onChange={(e) => updateColor(idx, 'dualTone', e.target.checked)}
                        className="accent-[#eb0a1e]"
                      />
                      <span>Dual-Tone</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeColor(idx)}
                      className="p-1.5 text-white/40 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {colors.length === 0 && (
                  <p className="text-xs text-white/40 text-center py-6">No color swatches added yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: VARIANTS & TRIMS */}
          {activeTab === 'variants' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xs font-bold tracking-wider text-white uppercase">
                    Variant & Trim Matrix
                  </h3>
                  <p className="text-xs text-white/50 font-light">
                    Transmission, fuel type, and price breakdown.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addVariant}
                  className="py-1.5 px-3 bg-[#eb0a1e] hover:bg-[#c90819] text-white text-[10px] font-display font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Trim</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {variants.map((v, idx) => (
                  <div key={v.id || idx} className="grid grid-cols-12 gap-2 p-3 bg-white/[0.02] border border-white/10 items-center">
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={v.name}
                        onChange={(e) => updateVariant(idx, 'name', e.target.value)}
                        placeholder="Variant Name (e.g. GX 7-STR)"
                        className="w-full px-2.5 py-1.5 bg-white/[0.04] border border-white/15 text-xs text-white font-semibold outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={v.fuel}
                        onChange={(e) => updateVariant(idx, 'fuel', e.target.value)}
                        placeholder="Fuel (Petrol)"
                        className="w-full px-2 py-1.5 bg-white/[0.04] border border-white/15 text-xs text-white/80 outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={v.transmission}
                        onChange={(e) => updateVariant(idx, 'transmission', e.target.value)}
                        placeholder="MT / AT / e-CVT"
                        className="w-full px-2 py-1.5 bg-white/[0.04] border border-white/15 text-xs text-white/80 outline-none"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="text"
                        value={v.price}
                        onChange={(e) => updateVariant(idx, 'price', e.target.value)}
                        placeholder="Price (₹19.99 Lakhs*)"
                        className="w-full px-2 py-1.5 bg-white/[0.04] border border-white/15 text-xs font-mono text-emerald-400 outline-none"
                      />
                    </div>
                    <div className="col-span-1 text-right">
                      <button
                        type="button"
                        onClick={() => removeVariant(idx)}
                        className="p-1.5 text-white/40 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {variants.length === 0 && (
                  <p className="text-xs text-white/40 text-center py-6">No variant trims added yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xs font-bold tracking-wider text-white uppercase">
                    Technical Specifications
                  </h3>
                  <p className="text-xs text-white/50 font-light">
                    Engine, output, transmission, mileage, and dimensions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSpec}
                  className="py-1.5 px-3 bg-[#eb0a1e] hover:bg-[#c90819] text-white text-[10px] font-display font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Spec</span>
                </button>
              </div>

              <div className="space-y-2">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 bg-white/[0.02] border border-white/10">
                    <input
                      type="text"
                      value={spec.label}
                      onChange={(e) => updateSpec(idx, 'label', e.target.value)}
                      placeholder="Spec Label (e.g. Engine)"
                      className="w-1/3 px-3 py-1.5 bg-white/[0.04] border border-white/15 text-xs text-white font-semibold outline-none"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => updateSpec(idx, 'value', e.target.value)}
                      placeholder="Value (e.g. 2.0L Strong Hybrid)"
                      className="flex-1 px-3 py-1.5 bg-white/[0.04] border border-white/15 text-xs text-white/80 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpec(idx)}
                      className="p-1 text-white/40 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Save Actions */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-white/15 hover:bg-white/5 text-white/70 hover:text-white text-xs font-display font-medium uppercase tracking-wider"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)]"
            >
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
