"use client";

import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  MessageSquare,
  Phone,
  Trash2,
  User,
  X,
  Edit2,
} from 'lucide-react';
import { LeadRecord, LeadStatus } from '@/lib/types/admin';
import { toast } from '@/lib/toast';

interface LeadsManagerProps {
  initialLeads: LeadRecord[];
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; bg: string; text: string; border: string }> = {
  NEW: { label: 'New Inquiry', bg: 'bg-[#eb0a1e]/15', text: 'text-[#ff4d5a]', border: 'border-[#eb0a1e]/40' },
  CONTACTED: { label: 'Contacted', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  TEST_DRIVE_SCHEDULED: { label: 'Drive Scheduled', bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
  BOOKED: { label: 'Vehicle Booked', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  LOST: { label: 'Lost / Closed', bg: 'bg-zinc-500/15', text: 'text-zinc-400', border: 'border-zinc-500/30' },
};

const LEAD_TYPES = [
  { key: 'ALL', label: 'All Inquiries' },
  { key: 'TEST_DRIVE', label: 'Test Drive' },
  { key: 'EXCHANGE', label: 'Car Exchange' },
  { key: 'PRICE_LIST', label: 'Price List' },
  { key: 'BROCHURE', label: 'Brochure' },
  { key: 'EXIT_OFFER', label: 'Exit Voucher' },
  { key: 'SERVICE', label: 'Service' },
];

export default function LeadsManager({ initialLeads }: LeadsManagerProps) {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Notes Modal State
  const [editingNotesLead, setEditingNotesLead] = useState<LeadRecord | null>(null);
  const [notesText, setNotesText] = useState('');

  const notify = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // Status Update Handler
  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update lead status');
      notify('success', `Status updated to ${STATUS_CONFIG[newStatus].label}`);
    } catch (err) {
      console.error(err);
      notify('error', 'Failed to update status');
    }
  };

  // Save Notes Handler
  const handleSaveNotes = async () => {
    if (!editingNotesLead) return;

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingNotesLead.id, notes: notesText }),
      });
      if (!res.ok) throw new Error('Failed to save notes');

      setLeads((prev) =>
        prev.map((l) => (l.id === editingNotesLead.id ? { ...l, notes: notesText } : l))
      );
      setEditingNotesLead(null);
      notify('success', 'Lead notes saved.');
    } catch (err) {
      console.error(err);
      notify('error', 'Failed to save notes');
    }
  };

  // Delete Lead Handler
  const handleDeleteLead = async (id: string, name: string) => {
    if (!window.confirm(`Delete lead entry for ${name}?`)) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete lead');

      setLeads((prev) => prev.filter((l) => l.id !== id));
      notify('success', `Deleted lead for ${name}`);
    } catch (err) {
      console.error(err);
      notify('error', 'Failed to delete lead');
    }
  };

  // Export Filtered Leads as CSV
  const handleExportCSV = () => {
    const headers = [
      'Lead ID',
      'Date',
      'Time',
      'Customer Name',
      'Phone Number',
      'Inquiry Type',
      'Target Car',
      'Trade-in Car',
      'Dealership Location',
      'Status',
      'Notes',
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.id}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${new Date(l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.leadType}"`,
      `"${(l.targetCar || 'Not Specified').replace(/"/g, '""')}"`,
      `"${(l.currentCar || '-').replace(/"/g, '""')}"`,
      `"${(l.location || '-').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `nippon-toyota-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('success', `Exported ${filteredLeads.length} leads to CSV.`);
  };

  // Filter Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.targetCar && l.targetCar.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.location && l.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.notes && l.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'ALL' || l.leadType === selectedType;
    const matchesStatus = selectedStatus === 'ALL' || l.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === 'NEW').length;
  const inProgressCount = leads.filter((l) =>
    ['CONTACTED', 'TEST_DRIVE_SCHEDULED'].includes(l.status)
  ).length;
  const bookedCount = leads.filter((l) => l.status === 'BOOKED').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[9px] font-display font-bold tracking-[0.25em] text-[#eb0a1e] uppercase block mb-1">
            CRM ({totalCount})
          </span>
          <h1 className="font-druk text-3xl text-white uppercase tracking-wider">
            CUSTOMER LEADS
          </h1>
          <p className="text-xs text-white/60 font-light">
            Inquiries from test drive bookings, exchange valuations, pricing requests, and brochures.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-colors shrink-0"
        >
          <Download size={14} />
          <span>Export CSV ({filteredLeads.length})</span>
        </button>
      </div>

      {/* Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="border border-white/10 bg-black/60 p-4">
          <span className="text-[9px] font-display font-bold tracking-widest text-white/50 uppercase block mb-1">
            TOTAL INQUIRIES
          </span>
          <span className="font-druk text-2xl text-white">{totalCount}</span>
        </div>

        <div className="border border-white/10 bg-black/60 p-4">
          <span className="text-[9px] font-display font-bold tracking-widest text-[#eb0a1e] uppercase block mb-1">
            NEW / UNTOUCHED
          </span>
          <span className="font-druk text-2xl text-[#ff4d5a]">{newCount}</span>
        </div>

        <div className="border border-white/10 bg-black/60 p-4">
          <span className="text-[9px] font-display font-bold tracking-widest text-amber-400 uppercase block mb-1">
            IN FOLLOW-UP
          </span>
          <span className="font-druk text-2xl text-amber-400">{inProgressCount}</span>
        </div>

        <div className="border border-white/10 bg-black/60 p-4">
          <span className="text-[9px] font-display font-bold tracking-widest text-emerald-400 uppercase block mb-1">
            BOOKED VEHICLES
          </span>
          <span className="font-druk text-2xl text-emerald-400">{bookedCount}</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone, car (e.g. Hycross), or notes..."
            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/10 focus:border-[#eb0a1e] text-xs text-white placeholder:text-white/30 tracking-wider outline-none"
          />
        </div>

        {/* Lead Status Filter */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Filter size={14} className="text-white/40" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2.5 bg-[#121216] border border-white/10 focus:border-[#eb0a1e] text-xs font-display text-white tracking-wider outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="TEST_DRIVE_SCHEDULED">Drive Scheduled</option>
            <option value="BOOKED">Booked</option>
            <option value="LOST">Lost</option>
          </select>
        </div>
      </div>

      {/* Inquiry Type Pills */}
      <div className="flex flex-wrap gap-1.5">
        {LEAD_TYPES.map((t) => {
          const isSelected = selectedType === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setSelectedType(t.key)}
              className={`py-1 px-3 text-[10px] font-display font-bold tracking-wider uppercase border transition-colors ${
                isSelected
                  ? 'border-[#eb0a1e] bg-[#eb0a1e]/20 text-white'
                  : 'border-white/10 bg-black/40 text-white/50 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="border border-white/10 bg-black/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-white/10 text-[9px] font-display font-bold tracking-[0.2em] text-white/40 uppercase bg-white/[0.02]">
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">CUSTOMER</th>
                <th className="py-3 px-4">CONTACT</th>
                <th className="py-3 px-4">TARGET CAR</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map((lead) => {
                const statusStyle = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;
                const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                const waUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(
                  `Hello ${lead.name}, thank you for contacting Nippon Toyota regarding the ${lead.targetCar || 'Toyota range'}. How can we assist you today?`
                )}`;

                return (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Timestamp */}
                    <td suppressHydrationWarning className="py-3.5 px-4 font-mono text-[11px] text-white/50 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                      <span suppressHydrationWarning className="block text-[10px] text-white/30">
                        {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-1.5">
                        <User size={12} className="text-[#eb0a1e] shrink-0" />
                        <span>{lead.name}</span>
                      </div>
                      {lead.location && (
                        <span className="block text-[10px] text-white/40 font-normal pl-4">
                          {lead.location}
                        </span>
                      )}
                      {lead.notes && (
                        <div className="flex items-center gap-1 text-[10px] text-white/50 font-normal mt-1 pl-4">
                          <span className="italic truncate max-w-xs">&quot;{lead.notes}&quot;</span>
                        </div>
                      )}
                    </td>

                    {/* Contact Phone */}
                    <td className="py-3.5 px-4 font-mono text-white/90 whitespace-nowrap">
                      <a href={`tel:${lead.phone}`} className="hover:text-white hover:underline flex items-center gap-1">
                        <Phone size={11} className="text-white/40" />
                        {lead.phone}
                      </a>
                    </td>

                    {/* Target Car & Trade-in */}
                    <td className="py-3.5 px-4">
                      <span className="font-display font-semibold text-white uppercase block">
                        {lead.targetCar || 'General Lineup'}
                      </span>
                      {lead.currentCar && (
                        <span className="block text-[10px] text-white/40 font-mono">
                          Trade-In: {lead.currentCar}
                        </span>
                      )}
                    </td>

                    {/* Inquiry Type */}
                    <td className="py-3.5 px-4 font-display text-[10px] tracking-wider text-white/70 uppercase">
                      {lead.leadType.replace('_', ' ')}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`px-2 py-1 text-[9px] font-display font-bold uppercase tracking-wider border rounded-none outline-none cursor-pointer ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="TEST_DRIVE_SCHEDULED">Drive Scheduled</option>
                        <option value="BOOKED">Booked</option>
                        <option value="LOST">Lost</option>
                      </select>
                    </td>

                    {/* Quick Follow-Up Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* WhatsApp Direct Chat */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1 px-2.5 text-[10px] font-display font-bold uppercase tracking-wider bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1 transition-colors"
                          title="Open WhatsApp Chat"
                        >
                          <MessageSquare size={12} />
                          <span>WhatsApp</span>
                        </a>

                        {/* Edit Notes */}
                        <button
                          onClick={() => {
                            setEditingNotesLead(lead);
                            setNotesText(lead.notes || '');
                          }}
                          className="p-1 text-white/40 hover:text-white"
                          title="Add/Edit Rep Notes"
                        >
                          <Edit2 size={13} />
                        </button>

                        {/* Delete Lead */}
                        <button
                          onClick={() => handleDeleteLead(lead.id, lead.name)}
                          className="p-1 text-white/30 hover:text-red-400"
                          title="Delete Entry"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-16 border border-white/10 bg-black/40">
          <p className="text-xs text-white/40 font-mono mb-3">No leads match the selected search or filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('ALL');
              setSelectedStatus('ALL');
            }}
            className="text-xs font-display font-semibold text-[#eb0a1e] uppercase tracking-wider hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Internal Notes Modal */}
      {editingNotesLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#0d0d10] border border-white/20 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="font-druk text-lg text-white uppercase tracking-wider">
                LEAD NOTES: {editingNotesLead.name}
              </h3>
              <button onClick={() => setEditingNotesLead(null)} className="text-white/50 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-white/50 mb-3">
              Record customer preferences, test drive appointment time, or negotiation details.
            </p>

            <textarea
              rows={4}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="e.g. Customer requested door-step test drive on Saturday at 11 AM in Kakkanad. Interested in Fortuner Legender 4x4 AT."
              className="w-full p-3 bg-white/[0.04] border border-white/15 text-xs text-white leading-relaxed outline-none focus:border-[#eb0a1e]"
              autoFocus
            />

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setEditingNotesLead(null)}
                className="py-1.5 px-3 border border-white/15 text-white/70 text-xs font-display uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="py-1.5 px-4 bg-[#eb0a1e] hover:bg-[#c90819] text-white text-xs font-display font-bold uppercase tracking-wider"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
