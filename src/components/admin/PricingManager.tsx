"use client";

import { useState, Fragment } from 'react';
import {
  Tag,
  Save,
  Calculator,
  ChevronDown,
  ChevronUp,
  Percent,
  Coins,
  ShieldCheck,
} from 'lucide-react';
import { VehicleModel, RegionalRTOConfig } from '@/lib/types/admin';
import { toast } from '@/lib/toast';

interface PricingManagerProps {
  initialVehicles: VehicleModel[];
  initialRtoConfig: RegionalRTOConfig;
}

export default function PricingManager({
  initialVehicles,
  initialRtoConfig,
}: PricingManagerProps) {
  const [vehicles, setVehicles] = useState<VehicleModel[]>(initialVehicles);
  const [rtoConfig, setRtoConfig] = useState<RegionalRTOConfig>(initialRtoConfig);
  const [activeTab, setActiveTab] = useState<'matrix' | 'rto' | 'calculator'>('matrix');

  // Expanded Vehicle for Variant Breakdown
  const [expandedVehicleId, setExpandedVehicleId] = useState<string | null>(null);

  // Status & Notification
  const [saving, setSaving] = useState(false);

  // Calculator State
  const [calcVehicleId, setCalcVehicleId] = useState<string>(vehicles[0]?.id || 'innova-hycross');
  const [calcExShowroomLakhs, setCalcExShowroomLakhs] = useState<number>(18.92);
  const [calcDistrict, setCalcDistrict] = useState<string>('ernakulam');
  const [calcTenureYears, setCalcTenureYears] = useState<number>(7);
  const [calcInterestRate, setCalcInterestRate] = useState<number>(rtoConfig.emiInterestRate || 8.75);

  const selectedVehicle = vehicles.find((v) => v.id === calcVehicleId) || vehicles[0];

  // Inline Vehicle Price Update
  const handleVehiclePriceChange = (id: string, field: 'basePrice' | 'exShowroomRange' | 'onRoadKochiRange', val: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: val } : v))
    );
  };

  // Inline Variant Price Update
  const handleVariantPriceChange = (vehicleId: string, variantIndex: number, newPrice: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== vehicleId) return v;
        const nextVariants = [...v.variants];
        nextVariants[variantIndex] = { ...nextVariants[variantIndex], price: newPrice };
        return { ...v, variants: nextVariants };
      })
    );
  };

  // Save All Vehicle Prices
  const handleSaveVehicles = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'vehicles', vehicles }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update pricing');
      toast.success('All vehicle and variant prices updated successfully');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  // Save RTO Config
  const handleSaveRtoConfig = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'rtoConfig', config: rtoConfig }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update RTO config');
      toast.success('Kerala RTO tax slabs and finance rules updated successfully');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  // RTO Calculation Engine
  const calculateOnRoad = (exLakhs: number, isEV = false) => {
    const exRupees = exLakhs * 100000;

    // 1. Road Tax
    let taxPercent = 21;
    if (isEV) {
      taxPercent = rtoConfig.evTaxPercent;
    } else {
      const slab = rtoConfig.taxSlabs.find(
        (s) => exLakhs >= s.minPriceLakhs && exLakhs < s.maxPriceLakhs
      );
      if (slab) taxPercent = slab.taxPercent;
    }
    const roadTax = (exRupees * taxPercent) / 100;

    // 2. Comprehensive Insurance (1+3 yrs)
    const insurance = (exRupees * rtoConfig.defaultInsurancePercent) / 100;

    // 3. TCS (1% for > 10L)
    const tcs = exLakhs > 10 ? (exRupees * rtoConfig.tcsPercent) / 100 : 0;

    // 4. Registration, Cess & Fastag
    const fees = rtoConfig.registrationFee + rtoConfig.fastagFee + 1000; // 1000 road safety cess

    const totalOnRoadRupees = exRupees + roadTax + insurance + tcs + fees;
    const totalOnRoadLakhs = totalOnRoadRupees / 100000;

    // 5. EMI Calculation (Assume 80% loan amount)
    const loanAmount = exRupees * 0.8;
    const monthlyRate = calcInterestRate / 12 / 100;
    const totalMonths = calcTenureYears * 12;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    return {
      roadTax: Math.round(roadTax),
      taxPercent,
      insurance: Math.round(insurance),
      tcs: Math.round(tcs),
      fees: Math.round(fees),
      totalOnRoadRupees: Math.round(totalOnRoadRupees),
      totalOnRoadLakhs: totalOnRoadLakhs.toFixed(2),
      monthlyEMI: Math.round(emi),
    };
  };

  const isSelectedCarEV = selectedVehicle?.category.includes('ev') || false;
  const breakdown = calculateOnRoad(calcExShowroomLakhs, isSelectedCarEV);

  // Apply Calculated Range to Vehicle Model
  const applyCalculatedRange = (vehicleId: string) => {
    const formatted = `₹${breakdown.totalOnRoadLakhs} Lakhs*`;
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, onRoadKochiRange: formatted } : v))
    );
    toast.success(`Updated On-Road estimate for ${selectedVehicle.name} to ${formatted}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[9px] font-display font-bold tracking-[0.25em] text-[#eb0a1e] uppercase block mb-1">
            PRICING
          </span>
          <h1 className="font-druk text-3xl text-white uppercase tracking-wider">
            PRICING & RTO
          </h1>
          <p className="text-xs text-white/60 font-light">
            Manage variant ex-showroom prices, trim levels, and Kerala MVD on-road tax calculations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'matrix' ? (
            <button
              onClick={handleSaveVehicles}
              disabled={saving}
              className="py-2.5 px-5 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)]"
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save Prices'}</span>
            </button>
          ) : activeTab === 'rto' ? (
            <button
              onClick={handleSaveRtoConfig}
              disabled={saving}
              className="py-2.5 px-5 bg-[#eb0a1e] hover:bg-[#c90819] disabled:opacity-50 text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(235,10,30,0.3)]"
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save RTO Rules'}</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`py-2 px-4 text-xs font-display font-semibold uppercase tracking-wider border transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'matrix'
              ? 'border-[#eb0a1e] bg-[#eb0a1e]/15 text-white'
              : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Tag size={14} />
          <span>Vehicle Prices ({vehicles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rto')}
          className={`py-2 px-4 text-xs font-display font-semibold uppercase tracking-wider border transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'rto'
              ? 'border-[#eb0a1e] bg-[#eb0a1e]/15 text-white'
              : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Percent size={14} />
          <span>Kerala RTO Rules</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`py-2 px-4 text-xs font-display font-semibold uppercase tracking-wider border transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'calculator'
              ? 'border-[#eb0a1e] bg-[#eb0a1e]/15 text-white'
              : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Calculator size={14} />
          <span>On-Road Calculator</span>
        </button>
      </div>

      {/* TAB 1: MODEL & VARIANT PRICING MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="border border-white/10 bg-black/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-white/10 text-[9px] font-display font-bold tracking-[0.2em] text-white/40 uppercase bg-white/[0.02]">
                    <th className="py-3 px-4">TOYOTA MODEL</th>
                    <th className="py-3 px-4">STARTING PRICE</th>
                    <th className="py-3 px-4">EX-SHOWROOM RANGE</th>
                    <th className="py-3 px-4">ON-ROAD KOCHI RANGE</th>
                    <th className="py-3 px-4 text-center">TRIMS</th>
                    <th className="py-3 px-4 text-right">EXPAND</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {vehicles.map((v) => {
                    const isExpanded = expandedVehicleId === v.id;

                    return (
                      <Fragment key={v.id}>
                        <tr className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-white">
                            <span className="font-display font-bold uppercase">{v.name}</span>
                            <span className="block text-[10px] text-white/40 font-mono font-normal">
                              {v.category.join(' · ')}
                            </span>
                          </td>

                          {/* Starting Price Input */}
                          <td className="py-3.5 px-4 font-mono">
                            <input
                              type="text"
                              value={v.basePrice}
                              onChange={(e) => handleVehiclePriceChange(v.id, 'basePrice', e.target.value)}
                              className="px-2.5 py-1 bg-white/[0.04] border border-white/10 focus:border-[#eb0a1e] text-xs text-emerald-400 font-semibold outline-none w-32"
                            />
                          </td>

                          {/* Ex-Showroom Range */}
                          <td className="py-3.5 px-4 font-mono">
                            <input
                              type="text"
                              value={v.exShowroomRange}
                              onChange={(e) => handleVehiclePriceChange(v.id, 'exShowroomRange', e.target.value)}
                              className="px-2.5 py-1 bg-white/[0.04] border border-white/10 focus:border-[#eb0a1e] text-xs text-white/90 outline-none w-40"
                            />
                          </td>

                          {/* On-Road Kochi Range */}
                          <td className="py-3.5 px-4 font-mono">
                            <input
                              type="text"
                              value={v.onRoadKochiRange}
                              onChange={(e) => handleVehiclePriceChange(v.id, 'onRoadKochiRange', e.target.value)}
                              className="px-2.5 py-1 bg-white/[0.04] border border-white/10 focus:border-[#eb0a1e] text-xs text-white/90 outline-none w-44"
                            />
                          </td>

                          <td className="py-3.5 px-4 text-center font-mono text-white/50">
                            {v.variants.length}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setExpandedVehicleId(isExpanded ? null : v.id)}
                              className="py-1 px-2.5 text-[10px] font-display font-semibold uppercase tracking-wider border border-white/10 hover:border-white/30 text-white/70 hover:text-white inline-flex items-center gap-1 transition-colors"
                            >
                              <span>{isExpanded ? 'Hide' : 'Variants'}</span>
                              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                          </td>
                        </tr>

                        {/* Expandable Trims Drawer */}
                        {isExpanded && (
                          <tr className="bg-black/90">
                            <td colSpan={6} className="p-4 sm:p-6 border-b border-white/15">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="font-display text-[10px] font-bold tracking-[0.2em] text-[#eb0a1e] uppercase">
                                    {v.name} TRIM BREAKDOWN ({v.variants.length} VARIANTS)
                                  </span>
                                  <span className="text-[10px] text-white/40 font-mono">
                                    Edits save when clicking &apos;Save All Prices&apos;
                                  </span>
                                </div>

                                <div className="space-y-2">
                                  {v.variants.map((variant, vIdx) => (
                                    <div
                                      key={variant.id || vIdx}
                                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-2.5 bg-white/[0.03] border border-white/10 items-center text-xs"
                                    >
                                      <div className="sm:col-span-4 font-semibold text-white">
                                        {variant.name}
                                      </div>
                                      <div className="sm:col-span-2 text-white/60 font-mono text-[11px]">
                                        {variant.fuel}
                                      </div>
                                      <div className="sm:col-span-2 text-white/60 font-mono text-[11px]">
                                        {variant.transmission}
                                      </div>
                                      <div className="sm:col-span-4">
                                        <input
                                          type="text"
                                          value={variant.price}
                                          onChange={(e) => handleVariantPriceChange(v.id, vIdx, e.target.value)}
                                          className="w-full px-2.5 py-1 bg-white/[0.05] border border-white/15 focus:border-[#eb0a1e] text-xs font-mono text-emerald-400 outline-none"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KERALA RTO TAX SLABS & CHARGES */}
      {activeTab === 'rto' && (
        <div className="space-y-6">
          {/* Tax Slabs Table */}
          <div className="border border-white/10 bg-black/60 p-6">
            <h2 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase mb-4">
              KERALA MOTOR VEHICLES DEPARTMENT (MVD) ROAD TAX SLABS
            </h2>
            <div className="space-y-3">
              {rtoConfig.taxSlabs.map((slab, sIdx) => (
                <div
                  key={slab.id}
                  className="grid grid-cols-12 gap-3 p-3 bg-white/[0.02] border border-white/10 items-center text-xs"
                >
                  <div className="col-span-4 font-semibold text-white">
                    {slab.label}
                  </div>
                  <div className="col-span-4 font-mono text-white/60 text-[11px]">
                    Price Range: ₹{slab.minPriceLakhs}L – ₹{slab.maxPriceLakhs === 999 ? 'Above' : `${slab.maxPriceLakhs}L`}
                  </div>
                  <div className="col-span-4 flex items-center justify-end gap-2 font-mono">
                    <span className="text-white/60 text-[11px]">Tax Rate:</span>
                    <input
                      type="number"
                      value={slab.taxPercent}
                      onChange={(e) => {
                        const next = [...rtoConfig.taxSlabs];
                        next[sIdx] = { ...next[sIdx], taxPercent: parseFloat(e.target.value) || 0 };
                        setRtoConfig({ ...rtoConfig, taxSlabs: next });
                      }}
                      className="w-16 px-2 py-1 bg-white/[0.05] border border-white/15 focus:border-[#eb0a1e] text-xs text-white font-semibold outline-none text-right"
                    />
                    <span className="text-white/60">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standard Statutory Fees & Finance Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-white/10 bg-black/60 p-6 space-y-4">
              <h2 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase">
                STATUTORY CHARGES & INSURANCE
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/10">
                  <span className="text-white/70">EV Concessional Road Tax</span>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      value={rtoConfig.evTaxPercent}
                      onChange={(e) => setRtoConfig({ ...rtoConfig, evTaxPercent: parseFloat(e.target.value) || 0 })}
                      className="w-16 px-2 py-1 bg-white/[0.05] border border-white/15 text-white text-right outline-none"
                    />
                    <span className="text-white/50">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/10">
                  <span className="text-white/70">Comprehensive Insurance (1+3 Yr)</span>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      step="0.1"
                      value={rtoConfig.defaultInsurancePercent}
                      onChange={(e) =>
                        setRtoConfig({ ...rtoConfig, defaultInsurancePercent: parseFloat(e.target.value) || 0 })
                      }
                      className="w-16 px-2 py-1 bg-white/[0.05] border border-white/15 text-white text-right outline-none"
                    />
                    <span className="text-white/50">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/10">
                  <span className="text-white/70">TCS (Ex-showroom &gt; ₹10 Lakhs)</span>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      value={rtoConfig.tcsPercent}
                      onChange={(e) => setRtoConfig({ ...rtoConfig, tcsPercent: parseFloat(e.target.value) || 0 })}
                      className="w-16 px-2 py-1 bg-white/[0.05] border border-white/15 text-white text-right outline-none"
                    />
                    <span className="text-white/50">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/10">
                  <span className="text-white/70">Fastag Charge</span>
                  <div className="flex items-center gap-1 font-mono">
                    <span className="text-white/50">₹</span>
                    <input
                      type="number"
                      value={rtoConfig.fastagFee}
                      onChange={(e) => setRtoConfig({ ...rtoConfig, fastagFee: parseInt(e.target.value) || 0 })}
                      className="w-20 px-2 py-1 bg-white/[0.05] border border-white/15 text-white text-right outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/10">
                  <span className="text-white/70">Registration & Road Safety Cess</span>
                  <div className="flex items-center gap-1 font-mono">
                    <span className="text-white/50">₹</span>
                    <input
                      type="number"
                      value={rtoConfig.registrationFee}
                      onChange={(e) => setRtoConfig({ ...rtoConfig, registrationFee: parseInt(e.target.value) || 0 })}
                      className="w-20 px-2 py-1 bg-white/[0.05] border border-white/15 text-white text-right outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Finance / EMI Config */}
            <div className="border border-white/10 bg-black/60 p-6 space-y-4">
              <h2 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase">
                FINANCE & EMI BENCHMARKS
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/10">
                  <span className="text-white/70">Annual Interest Rate Benchmark</span>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      step="0.05"
                      value={rtoConfig.emiInterestRate}
                      onChange={(e) =>
                        setRtoConfig({ ...rtoConfig, emiInterestRate: parseFloat(e.target.value) || 0 })
                      }
                      className="w-16 px-2 py-1 bg-white/[0.05] border border-white/15 text-white text-right outline-none"
                    />
                    <span className="text-white/50">% p.a.</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/10">
                  <span className="text-white/70">Max Finance Tenure</span>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      value={rtoConfig.emiTenureMonths}
                      onChange={(e) =>
                        setRtoConfig({ ...rtoConfig, emiTenureMonths: parseInt(e.target.value) || 0 })
                      }
                      className="w-16 px-2 py-1 bg-white/[0.05] border border-white/15 text-white text-right outline-none"
                    />
                    <span className="text-white/50">Months (7 Yrs)</span>
                  </div>
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/5 text-[11px] text-white/50 leading-relaxed font-light">
                  <ShieldCheck size={14} className="text-[#eb0a1e] inline mr-1" />
                  These rates power the customer monthly EMI badge calculations across the website and on-road sheets.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE SIMULATOR */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 border border-white/10 bg-black/60 p-6 space-y-4">
            <h2 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase mb-2">
              SIMULATOR PARAMETERS
            </h2>

            <div>
              <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                Select Model
              </label>
              <select
                value={calcVehicleId}
                onChange={(e) => {
                  setCalcVehicleId(e.target.value);
                  const found = vehicles.find((v) => v.id === e.target.value);
                  if (found) {
                    const priceNum = parseFloat(found.basePrice.replace(/[^0-9.]/g, '')) || 18.92;
                    setCalcExShowroomLakhs(priceNum);
                  }
                }}
                className="w-full px-3 py-2 bg-[#121216] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-display tracking-wider outline-none"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.basePrice})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                Ex-Showroom Price (in Lakhs ₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={calcExShowroomLakhs}
                onChange={(e) => setCalcExShowroomLakhs(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                Kerala District RTO
              </label>
              <select
                value={calcDistrict}
                onChange={(e) => setCalcDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-[#121216] border border-white/15 focus:border-[#eb0a1e] text-white text-xs font-display tracking-wider outline-none"
              >
                {rtoConfig.districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                  Tenure
                </label>
                <select
                  value={calcTenureYears}
                  onChange={(e) => setCalcTenureYears(parseInt(e.target.value) || 7)}
                  className="w-full px-2.5 py-1.5 bg-[#121216] border border-white/15 text-xs text-white outline-none"
                >
                  <option value={3}>3 Years (36 mo)</option>
                  <option value={5}>5 Years (60 mo)</option>
                  <option value={7}>7 Years (84 mo)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-white/60 uppercase mb-1">
                  Interest Rate
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={calcInterestRate}
                  onChange={(e) => setCalcInterestRate(parseFloat(e.target.value) || 8.75)}
                  className="w-full px-2.5 py-1.5 bg-white/[0.04] border border-white/15 text-xs text-white font-mono outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => applyCalculatedRange(calcVehicleId)}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Coins size={14} className="text-[#eb0a1e]" />
                <span>Apply as Model Kochi On-Road</span>
              </button>
            </div>
          </div>

          {/* Real-time Breakdown Sheet */}
          <div className="lg:col-span-7 border border-white/15 bg-black/80 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-display text-[9px] font-bold tracking-[0.25em] text-[#eb0a1e] uppercase">
                  CALCULATED ON-ROAD ESTIMATE
                </span>
                <h3 className="font-druk text-3xl text-white uppercase tracking-wider">
                  {selectedVehicle.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-display text-white/40 uppercase block">Total On-Road</span>
                <span className="font-display text-2xl font-bold text-emerald-400">
                  ₹{breakdown.totalOnRoadLakhs} Lakhs*
                </span>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-white/5 text-white/80">
                <span>1. Ex-Showroom Base</span>
                <span>₹{(calcExShowroomLakhs * 100000).toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-white/5 text-white/80">
                <span>
                  2. Kerala MVD Road Tax ({breakdown.taxPercent}%)
                </span>
                <span className="text-white">₹{breakdown.roadTax.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-white/5 text-white/80">
                <span>3. Comprehensive Nippon Insurance (1+3 Yrs)</span>
                <span className="text-white">₹{breakdown.insurance.toLocaleString('en-IN')}</span>
              </div>

              {breakdown.tcs > 0 && (
                <div className="flex justify-between py-1.5 border-b border-white/5 text-white/80">
                  <span>4. TCS (1% on Ex-Showroom &gt; 10L)</span>
                  <span className="text-white">₹{breakdown.tcs.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between py-1.5 border-b border-white/5 text-white/80">
                <span>5. Fastag, Registration & Kerala Road Safety Cess</span>
                <span className="text-white">₹{breakdown.fees.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Estimated EMI Callout */}
            <div className="p-4 bg-gradient-to-r from-white/[0.04] to-[#eb0a1e]/[0.08] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-display font-bold tracking-widest text-[#eb0a1e] uppercase block">
                  ESTIMATED STARTING MONTHLY EMI
                </span>
                <span className="font-display text-2xl text-white font-bold tracking-tight">
                  ₹{breakdown.monthlyEMI.toLocaleString('en-IN')} / month
                </span>
              </div>
              <span className="text-[10px] text-white/40 font-mono text-right">
                Based on 80% loan · {calcTenureYears} Years @ {calcInterestRate}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
