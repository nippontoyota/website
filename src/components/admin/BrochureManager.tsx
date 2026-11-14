"use client";

import { useState } from 'react';
import Image from 'next/image';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Search,
  Trash2,
  Link as LinkIcon,
} from 'lucide-react';
import { VehicleModel } from '@/lib/types/admin';
import { toast } from '@/lib/toast';

interface BrochureManagerProps {
  initialVehicles: VehicleModel[];
}

export default function BrochureManager({ initialVehicles }: BrochureManagerProps) {
  const [vehicles, setVehicles] = useState<VehicleModel[]>(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [editingUrlId, setEditingUrlId] = useState<string | null>(null);
  const [urlInputValue, setUrlInputValue] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const notify = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const filtered = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const linkedCount = vehicles.filter((v) => Boolean(v.brochureUrl)).length;

  // Upload handler for a specific vehicle
  const handleFileUpload = async (vehicleId: string, file: File) => {
    if (!file) return;
    setUploadingId(vehicleId);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'brochures');

      // 1. Upload to storage
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadText = await uploadRes.text();
      let uploadData: { url?: string; error?: string } = {};
      try {
        uploadData = JSON.parse(uploadText);
      } catch {
        if (uploadRes.status === 413) {
          throw new Error('Brochure PDF is too large. Please upload a PDF under 4.5MB.');
        }
        throw new Error(`Upload server error (${uploadRes.status}): ${uploadText.slice(0, 100)}`);
      }

      if (!uploadRes.ok || !uploadData.url) throw new Error(uploadData.error || 'Upload failed');

      // 2. Assign to vehicle
      const updateRes = await fetch('/api/admin/brochures', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId, brochureUrl: uploadData.url }),
      });

      const updateText = await updateRes.text();
      let updateData: { vehicle?: VehicleModel; error?: string } = {};
      try {
        updateData = JSON.parse(updateText);
      } catch {
        throw new Error(`Server error (${updateRes.status}): ${updateText.slice(0, 100)}`);
      }

      if (!updateRes.ok) throw new Error(updateData.error || 'Failed to link brochure to vehicle');

      // Update state
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicleId ? { ...v, brochureUrl: uploadData.url } : v))
      );
      notify('success', `Brochure successfully uploaded and linked to ${updateData.vehicle?.name || 'vehicle'}`);
    } catch (err: unknown) {
      notify('error', err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingId(null);
    }
  };

  // Manual URL save
  const handleSaveUrl = async (vehicleId: string) => {
    try {
      const updateRes = await fetch('/api/admin/brochures', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId, brochureUrl: urlInputValue }),
      });

      const updateData = await updateRes.json();
      if (!updateRes.ok) throw new Error(updateData.error || 'Failed to update URL');

      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicleId ? { ...v, brochureUrl: urlInputValue } : v))
      );
      setEditingUrlId(null);
      notify('success', 'Brochure URL updated.');
    } catch (err: unknown) {
      notify('error', err instanceof Error ? err.message : 'Save failed');
    }
  };

  // Clear Brochure Link
  const handleRemoveBrochure = async (vehicleId: string, name: string) => {
    if (!window.confirm(`Unlink brochure from ${name}?`)) return;

    try {
      const updateRes = await fetch('/api/admin/brochures', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId, brochureUrl: '' }),
      });

      if (!updateRes.ok) throw new Error('Failed to unlink brochure');

      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicleId ? { ...v, brochureUrl: undefined } : v))
      );
      notify('success', `Brochure unlinked from ${name}`);
    } catch (err) {
      console.error(err);
      notify('error', 'Failed to unlink brochure');
    }
  };

  // Copy Link to Clipboard
  const handleCopy = (id: string, url: string) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    toast.success('Brochure link copied to clipboard');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[9px] font-display font-bold tracking-[0.25em] text-[#eb0a1e] uppercase block mb-1">
            BROCHURES
          </span>
          <h1 className="font-druk text-3xl text-white uppercase tracking-wider">
            PDF BROCHURES
          </h1>
          <p className="text-xs text-white/60 font-light">
            Manage official model PDF brochures and direct download links.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 border border-white/10 bg-black/60 flex items-center gap-2 text-xs">
            <span className="text-white/50">Linked:</span>
            <span className="font-mono font-bold text-emerald-400">
              {linkedCount} / {vehicles.length} Models
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter models (e.g. Fortuner, Hycross)..."
          className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/10 focus:border-[#eb0a1e] text-xs text-white placeholder:text-white/30 tracking-wider outline-none"
        />
      </div>

      {/* Brochure Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((v) => {
          const isLinked = Boolean(v.brochureUrl);
          const isUploading = uploadingId === v.id;
          const isEditing = editingUrlId === v.id;
          const isCopied = copiedId === v.id;

          return (
            <div
              key={v.id}
              className={`border transition-all p-5 flex flex-col justify-between ${
                isLinked
                  ? 'border-white/10 bg-black/60 hover:border-white/25'
                  : 'border-amber-500/30 bg-amber-500/[0.02]'
              }`}
            >
              <div>
                {/* Header Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-display font-bold tracking-[0.2em] text-[#eb0a1e] uppercase">
                    {v.category.join(' · ')}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[9px] font-display font-bold uppercase tracking-wider flex items-center gap-1 ${
                      isLinked
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {isLinked ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                    <span>{isLinked ? 'Brochure Active' : 'Pending PDF'}</span>
                  </span>
                </div>

                {/* Car Render Snippet */}
                <div className="w-full h-28 bg-white/[0.02] border border-white/5 relative mb-3 flex items-center justify-center overflow-hidden">
                  {v.image ? (
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  ) : (
                    <span className="text-[10px] text-white/30">No Image</span>
                  )}
                </div>

                {/* Car Title */}
                <h3 className="font-druk text-xl text-white uppercase tracking-wider mb-1">
                  {v.name}
                </h3>

                {/* Brochure Path info */}
                {isEditing ? (
                  <div className="space-y-2 my-3">
                    <input
                      type="text"
                      value={urlInputValue}
                      onChange={(e) => setUrlInputValue(e.target.value)}
                      placeholder="/uploads/brochures/filename.pdf or https://..."
                      className="w-full px-2.5 py-1.5 bg-white/[0.05] border border-white/20 text-xs font-mono text-white outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveUrl(v.id)}
                        className="py-1 px-3 bg-[#eb0a1e] text-white text-[10px] font-display font-bold uppercase tracking-wider"
                      >
                        Save URL
                      </button>
                      <button
                        onClick={() => setEditingUrlId(null)}
                        className="py-1 px-2 text-white/50 hover:text-white text-[10px] font-display uppercase"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="my-3 py-2 px-3 bg-white/[0.02] border border-white/5 text-[11px] font-mono text-white/60 truncate flex items-center justify-between">
                    <span className="truncate">{v.brochureUrl || 'No brochure linked yet'}</span>
                    {v.brochureUrl && (
                      <button
                        onClick={() => handleCopy(v.id, v.brochureUrl!)}
                        className="text-white/40 hover:text-white shrink-0 ml-2"
                        title="Copy Brochure URL"
                      >
                        {isCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs font-display">
                <div className="flex items-center gap-2">
                  {/* File Upload Button */}
                  <label className="py-1.5 px-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors">
                    <Upload size={12} />
                    <span>{isUploading ? 'Uploading...' : 'Upload PDF'}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(v.id, file);
                      }}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>

                  {/* Edit URL link button */}
                  <button
                    onClick={() => {
                      setEditingUrlId(v.id);
                      setUrlInputValue(v.brochureUrl || '');
                    }}
                    className="p-1.5 text-white/50 hover:text-white"
                    title="Paste External CDN URL"
                  >
                    <LinkIcon size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {isLinked && (
                    <>
                      <a
                        href={v.brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-white/60 hover:text-white flex items-center gap-1 text-[11px]"
                        title="Preview PDF"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={() => handleRemoveBrochure(v.id, v.name)}
                        className="p-1.5 text-white/30 hover:text-red-400"
                        title="Unlink Brochure"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
