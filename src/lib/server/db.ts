import fs from 'fs';
import path from 'path';
import { carDetails } from '@/data/carDetails';
import { getSupabaseClient } from '@/lib/server/supabase';
import {
  NipponStoreData,
  VehicleModel,
  HeroActionCard,
  CampaignSettings,
  BranchLocation,
  LeadRecord,
  RegionalRTOConfig,
  SocialLink,
} from '@/lib/types/admin';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'nippon-store.json');
const TMP_FILE = path.join(DATA_DIR, 'nippon-store.tmp');

const INITIAL_HERO_CARDS: HeroActionCard[] = [
  {
    id: 'test-drive',
    tag: 'VIP ACCESS',
    subTag: 'DOORSTEP OR SHOWROOM',
    title: 'BOOK A VIP TEST DRIVE',
    description: 'Skip the showroom queue. Experience the performance, hybrid efficiency, and prestige of your favorite Toyota first-hand.',
    pillsTitle: 'AVAILABLE FLEET READY FOR DRIVE',
    pills: [
      { label: 'Innova Hycross' },
      { label: 'Fortuner Legender' },
      { label: 'Hyryder Hybrid' },
      { label: 'Hilux 4x4' },
      { label: 'Glanza' },
    ],
    perks: ['Same-Day Slot Guarantee', 'Doorstep Delivery Available', 'Product Specialist Walkthrough'],
    cta: 'SCHEDULE TEST DRIVE',
    intent: 'TEST_DRIVE',
    badge: 'PRIORITY SLOTS',
    enabled: true,
    order: 1,
  },
  {
    id: 'exchange',
    tag: 'BEST VALUE',
    subTag: 'MULTI-BRAND TRADE-IN',
    title: 'EXCHANGE & UPGRADE',
    description: 'Upgrade your current car into a brand-new Toyota. Receive a transparent, top-of-market valuation in under 30 minutes with instant paperwork.',
    pillsTitle: 'TRANSPARENT 3-STEP VALUATION',
    pills: [
      { label: '1. 15-Min Doorstep Check' },
      { label: '2. Instant Market Price' },
      { label: '3. Immediate Key Handover' },
    ],
    perks: ['Any Make & Model Accepted', 'Zero Ownership Transfer Hassle', 'Up to ₹50,000 Exchange Bonus'],
    cta: 'GET CAR VALUATION',
    intent: 'EXCHANGE',
    badge: 'TOP VALUATION',
    enabled: true,
    order: 2,
  },
  {
    id: 'price-list',
    tag: '2026 PRICING',
    subTag: 'KERALA ON-ROAD SHEET',
    title: 'ON-ROAD PRICE LIST & EMI',
    description: 'Access official Kochi, Trivandrum, and Thrissur on-road pricing sheets with complete RTO tax breakdowns, insurance tiers, and customized EMI schemes.',
    pillsTitle: 'INSTANT PRICE BREAKDOWNS',
    pills: [
      { label: 'Ex-Showroom vs On-Road' },
      { label: 'Kerala RTO & Taxes' },
      { label: 'Low EMI Schemes' },
      { label: 'Festive Benefits' },
    ],
    perks: ['100% Verified Dealer Pricing', 'Zero Hidden Registration Fees', 'Instant Delivery to WhatsApp'],
    cta: 'VIEW ON-ROAD PRICE LIST',
    intent: 'PRICE_LIST',
    badge: 'LATEST OFFERS',
    enabled: true,
    order: 3,
  },
  {
    id: 'brochure',
    tag: 'DIGITAL SPECS',
    subTag: 'OFFICIAL FLEET BROCHURES',
    title: 'DOWNLOAD DIGITAL BROCHURE',
    description: 'Get high-resolution official model brochures packed with comprehensive technical specs, hybrid synergy drive schematics, safety features, and genuine accessories.',
    pillsTitle: 'BROCHURE CONTENTS',
    pills: [
      { label: 'Technical Engine Specs' },
      { label: 'Interior Trims & Dimensions' },
      { label: 'Toyota Safety Sense ADAS' },
      { label: 'Color Palette' },
    ],
    perks: ['Official Toyota Bharat Specs', 'High-Res Digital Catalog', 'Instant PDF Download'],
    cta: 'DOWNLOAD BROCHURE',
    intent: 'BROCHURE',
    badge: 'OFFICIAL CATALOG',
    enabled: true,
    order: 4,
  },
];

const INITIAL_CAMPAIGNS: CampaignSettings = {
  announcementBar: {
    enabled: true,
    text: '2026 Festive Season Privileges — Priority Delivery & Exclusive Exchange Bonuses across Kerala Showrooms',
    link: '/contact',
    badge: 'KERALA PRIVILEGE',
  },
  exitIntentOffer: {
    enabled: true,
    headline: 'EXCLUSIVE KERALA VIP PRIVILEGE',
    subheadline: 'Before you leave, unlock our dealer-exclusive exchange and insurance vouchers.',
    voucherAmount: '₹25,000',
    perkDetails: [
      'Applicable on All 2026 Toyota Bookings',
      'Instant WhatsApp Voucher Delivery',
      'Valid at Kochi, Trivandrum & Thrissur Showrooms',
    ],
  },
};

const INITIAL_BRANCHES: BranchLocation[] = [
  {
    id: 'kochi-kalamassery',
    name: 'Kochi — Kalamassery (Headquarters)',
    type: '3S_FACILITY',
    city: 'Kochi',
    address: 'Nippon Toyota 3S Facility, NH 544, Kalamassery, Kochi, Kerala 683104',
    phone: '+91 484 255 5555',
    whatsapp: '+91 98470 12345',
    timing: 'Mon–Sat: 8:30 AM – 7:30 PM | Sun: 9:30 AM – 5:30 PM',
    mapUrl: 'https://maps.google.com/?q=Nippon+Toyota+Kalamassery',
    isMainBranch: true,
  },
  {
    id: 'kochi-nettoor',
    name: 'Kochi — Nettoor',
    type: '3S_FACILITY',
    city: 'Kochi',
    address: 'NH 66 Bypass, Nettoor, Maradu, Kochi, Kerala 682040',
    phone: '+91 484 270 0000',
    whatsapp: '+91 98470 12345',
    timing: 'Mon–Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM',
    mapUrl: 'https://maps.google.com/?q=Nippon+Toyota+Nettoor',
  },
  {
    id: 'trivandrum',
    name: 'Trivandrum — Venpalavattom',
    type: '3S_FACILITY',
    city: 'Trivandrum',
    address: 'NH 66 Bypass Road, Venpalavattom, Anayara P.O., Trivandrum, Kerala 695029',
    phone: '+91 471 274 4444',
    whatsapp: '+91 98471 23456',
    timing: 'Mon–Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM',
    mapUrl: 'https://maps.google.com/?q=Nippon+Toyota+Trivandrum',
  },
  {
    id: 'thrissur',
    name: 'Thrissur — Mannuthy',
    type: '3S_FACILITY',
    city: 'Thrissur',
    address: 'NH 544 Bypass, Mannuthy, Thrissur, Kerala 680651',
    phone: '+91 487 237 7777',
    whatsapp: '+91 98472 34567',
    timing: 'Mon–Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM',
    mapUrl: 'https://maps.google.com/?q=Nippon+Toyota+Thrissur',
  },
  {
    id: 'kozhikode',
    name: 'Kozhikode — Calicut Bypass',
    type: '3S_FACILITY',
    city: 'Kozhikode',
    address: 'NH 66 Bypass Road, Pantheerankavu, Kozhikode, Kerala 673019',
    phone: '+91 495 243 3333',
    whatsapp: '+91 98473 45678',
    timing: 'Mon–Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM',
    mapUrl: 'https://maps.google.com/?q=Nippon+Toyota+Calicut',
  },
  {
    id: 'kottayam',
    name: 'Kottayam — Thellakom',
    type: 'SHOWROOM',
    city: 'Kottayam',
    address: 'MC Road, Thellakom, Kottayam, Kerala 686630',
    phone: '+91 481 279 9999',
    whatsapp: '+91 98474 56789',
    timing: 'Mon–Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM',
    mapUrl: 'https://maps.google.com/?q=Nippon+Toyota+Kottayam',
  },
  {
    id: 'kollam',
    name: 'Kollam — Kavanad',
    type: 'SHOWROOM',
    city: 'Kollam',
    address: 'NH 66, Kavanad P.O., Kollam, Kerala 691003',
    phone: '+91 474 279 8888',
    whatsapp: '+91 98475 67890',
    timing: 'Mon–Sat: 9:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM',
    mapUrl: 'https://maps.google.com/?q=Nippon+Toyota+Kollam',
  },
];

const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'lead-1',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    name: 'Rahul Nair',
    phone: '+91 98470 54321',
    leadType: 'TEST_DRIVE',
    targetCar: 'Innova Hycross',
    location: 'Kochi — Kalamassery',
    status: 'NEW',
    notes: 'Interested in ZX(O) Strong Hybrid. Requested doorstep test drive in Kakkanad.',
  },
  {
    id: 'lead-2',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    name: 'Anjali Menon',
    phone: '+91 97451 88990',
    leadType: 'EXCHANGE',
    targetCar: 'Fortuner Legender',
    currentCar: '2019 Hyundai Creta SX (O) Diesel AT',
    location: 'Trivandrum',
    status: 'CONTACTED',
    notes: 'Valuation team dispatched for home assessment.',
  },
  {
    id: 'lead-3',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    name: 'Dr. George Thomas',
    phone: '+91 94472 11223',
    leadType: 'PRICE_LIST',
    targetCar: 'All-New Camry',
    location: 'Thrissur',
    status: 'TEST_DRIVE_SCHEDULED',
    notes: 'Sent Kerala on-road sheet to WhatsApp. Test drive booked for Saturday 11 AM.',
  },
];

const INITIAL_RTO_CONFIG: RegionalRTOConfig = {
  lastUpdated: new Date().toISOString(),
  taxSlabs: [
    { id: 'slab-1', minPriceLakhs: 0, maxPriceLakhs: 5, taxPercent: 9, label: 'Under ₹5 Lakhs' },
    { id: 'slab-2', minPriceLakhs: 5, maxPriceLakhs: 10, taxPercent: 11, label: '₹5L to ₹10L' },
    { id: 'slab-3', minPriceLakhs: 10, maxPriceLakhs: 15, taxPercent: 13, label: '₹10L to ₹15L' },
    { id: 'slab-4', minPriceLakhs: 15, maxPriceLakhs: 20, taxPercent: 16, label: '₹15L to ₹20L' },
    { id: 'slab-5', minPriceLakhs: 20, maxPriceLakhs: 999, taxPercent: 21, label: 'Above ₹20 Lakhs' },
  ],
  evTaxPercent: 5,
  tcsPercent: 1,
  fastagFee: 500,
  registrationFee: 2500,
  defaultInsurancePercent: 3.8,
  districts: [
    { id: 'ernakulam', name: 'Ernakulam / Kochi', code: 'KL-07', cessAmount: 1000, active: true },
    { id: 'trivandrum', name: 'Thiruvananthapuram', code: 'KL-01', cessAmount: 1000, active: true },
    { id: 'thrissur', name: 'Thrissur', code: 'KL-08', cessAmount: 1000, active: true },
    { id: 'kozhikode', name: 'Kozhikode / Calicut', code: 'KL-11', cessAmount: 1000, active: true },
    { id: 'kottayam', name: 'Kottayam', code: 'KL-05', cessAmount: 1000, active: true },
    { id: 'kollam', name: 'Kollam', code: 'KL-02', cessAmount: 1000, active: true },
  ],
  emiInterestRate: 8.75,
  emiTenureMonths: 84,
};

// Map existing carDetails to initial VehicleModel items
function buildInitialVehicles(): VehicleModel[] {
  const priceRangeMap: Record<string, { ex: string; onRoad: string; order: number }> = {
    glanza: { ex: '₹6.73L – ₹9.99L', onRoad: '₹8.37L – ₹12.20L', order: 1 },
    'urban-cruiser-taisor': { ex: '₹7.74L – ₹13.04L', onRoad: '₹9.20L – ₹15.80L', order: 2 },
    rumion: { ex: '₹10.44L – ₹13.73L', onRoad: '₹12.09L – ₹17.67L', order: 3 },
    'urban-cruiser-hyryder': { ex: '₹11.14L – ₹20.19L', onRoad: '₹13.50L – ₹24.80L', order: 4 },
    'urban-cruiser-ebella': { ex: 'TBA', onRoad: 'TBA', order: 5 },
    'innova-crysta': { ex: '₹19.99L – ₹26.30L', onRoad: '₹24.50L – ₹32.80L', order: 6 },
    'innova-hycross': { ex: '₹18.92L – ₹30.68L', onRoad: '₹22.82L – ₹38.45L', order: 7 },
    hilux: { ex: '₹30.40L – ₹37.90L', onRoad: '₹38.00L – ₹47.50L', order: 8 },
    fortuner: { ex: '₹33.43L – ₹51.44L', onRoad: '₹41.50L – ₹63.50L', order: 9 },
    legender: { ex: '₹43.66L – ₹50.09L', onRoad: '₹54.65L – ₹62.68L', order: 10 },
    camry: { ex: '₹46.17L – ₹48.50L', onRoad: '₹57.20L – ₹60.50L', order: 11 },
    vellfire: { ex: '₹1.22 Cr – ₹1.32 Cr', onRoad: '₹1.52 Cr – ₹1.65 Cr', order: 12 },
    'land-cruiser-300': { ex: '₹2.10 Crore', onRoad: '₹2.60 Cr – ₹2.70 Cr', order: 13 },
  };

  return Object.values(carDetails).map((c) => {
    const range = priceRangeMap[c.slug] || { ex: c.basePrice, onRoad: 'Contact Dealer', order: 99 };
    return {
      id: c.slug,
      slug: c.slug,
      name: c.name,
      fullName: c.fullName,
      tagline: c.tagline,
      category: c.category,
      status: c.slug === 'urban-cruiser-ebella' ? 'UPCOMING' : 'AVAILABLE',
      badge: c.badge,
      basePrice: c.basePrice,
      exShowroomRange: range.ex,
      onRoadKochiRange: range.onRoad,
      image: c.image,
      brochureUrl: `/brochures/${c.slug}.pdf`,
      colors: c.colors,
      variants: c.variants,
      specs: c.specs,
      features: c.features,
      disclaimer: c.disclaimer,
      featured: ['innova-hycross', 'fortuner', 'camry', 'urban-cruiser-hyryder'].includes(c.slug),
      order: range.order,
    };
  });
}

const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'social-instagram',
    platform: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/nippon.toyota/',
    handle: '@nippon.toyota',
    enabled: true,
    order: 1,
  },
  {
    id: 'social-facebook',
    platform: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/nipponkerala/',
    handle: 'Nippon Toyota Kerala',
    enabled: true,
    order: 2,
  },
  {
    id: 'social-youtube',
    platform: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@NipponToyotaKerala',
    handle: 'Nippon Toyota Kerala',
    enabled: true,
    order: 3,
  },
  {
    id: 'social-whatsapp',
    platform: 'whatsapp',
    label: 'WhatsApp Concierge',
    url: 'https://wa.me/919946101111',
    handle: '+91 99461 01111',
    enabled: true,
    order: 4,
  },
  {
    id: 'social-linkedin',
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/nippon-toyota/',
    handle: 'Nippon Toyota',
    enabled: true,
    order: 5,
  },
  {
    id: 'social-x',
    platform: 'x',
    label: 'X (Twitter)',
    url: 'https://x.com/nippontoyota',
    handle: '@nippontoyota',
    enabled: false,
    order: 6,
  },
];

function buildInitialStoreData(): NipponStoreData {
  return {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    vehicles: buildInitialVehicles(),
    heroCards: INITIAL_HERO_CARDS,
    campaigns: INITIAL_CAMPAIGNS,
    branches: INITIAL_BRANCHES,
    leads: INITIAL_LEADS,
    rtoConfig: INITIAL_RTO_CONFIG,
    socialLinks: INITIAL_SOCIAL_LINKS,
  };
}

// In-memory cache with 10-second TTL to guarantee fresh data across serverless instances
let memoryCache: NipponStoreData | null = null;
let lastCacheFetchTime = 0;
const CACHE_TTL_MS = 10000; // 10 seconds

interface SupabaseLeadRow {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  lead_type: string;
  target_car: string | null;
  location: string | null;
  current_car: string | null;
  extra_info: string | null;
  status: string;
  notes: string | null;
}

function mapRowToLead(row: SupabaseLeadRow): LeadRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    phone: row.phone,
    leadType: row.lead_type as LeadRecord['leadType'],
    targetCar: row.target_car || undefined,
    location: row.location || undefined,
    currentCar: row.current_car || undefined,
    extraInfo: row.extra_info || undefined,
    status: (row.status as LeadRecord['status']) || 'NEW',
    notes: row.notes || undefined,
  };
}

export async function getStoreData(forceFresh = false): Promise<NipponStoreData> {
  const isCacheExpired = Date.now() - lastCacheFetchTime > CACHE_TTL_MS;
  if (memoryCache && !forceFresh && !isCacheExpired) {
    return memoryCache;
  }

  let parsed: NipponStoreData;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(STORE_FILE)) {
      const initial = buildInitialStoreData();
      await saveStoreData(initial);
      parsed = initial;
    } else {
      const raw = await fs.promises.readFile(STORE_FILE, 'utf-8');
      parsed = JSON.parse(raw) as NipponStoreData;
    }

    let needsResave = false;

    if (!parsed.rtoConfig) {
      parsed.rtoConfig = INITIAL_RTO_CONFIG;
      needsResave = true;
    }
    if (!parsed.campaigns) {
      parsed.campaigns = INITIAL_CAMPAIGNS;
      needsResave = true;
    }
    if (!parsed.heroCards) {
      parsed.heroCards = INITIAL_HERO_CARDS;
      needsResave = true;
    }
    if (!parsed.branches) {
      parsed.branches = INITIAL_BRANCHES;
      needsResave = true;
    }
    if (!parsed.leads) {
      parsed.leads = INITIAL_LEADS;
      needsResave = true;
    }
    if (!parsed.vehicles) {
      parsed.vehicles = buildInitialVehicles();
      needsResave = true;
    }
    if (!parsed.socialLinks) {
      parsed.socialLinks = INITIAL_SOCIAL_LINKS;
      needsResave = true;
    }

    if (needsResave) {
      await saveStoreData(parsed);
    }
  } catch (error) {
    console.error('Error reading nippon store, falling back to initial data:', error);
    parsed = buildInitialStoreData();
  }

  // Attempt to sync from Supabase if configured
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      // 1. Fetch config from Supabase
      const { data: configRow } = await supabase
        .from('nippon_config')
        .select('data')
        .eq('id', 'main_store')
        .maybeSingle();

      if (configRow?.data) {
        const cfg = configRow.data as Partial<NipponStoreData>;
        if (cfg.vehicles && Array.isArray(cfg.vehicles)) parsed.vehicles = cfg.vehicles;
        if (cfg.heroCards && Array.isArray(cfg.heroCards)) parsed.heroCards = cfg.heroCards;
        if (cfg.campaigns) parsed.campaigns = cfg.campaigns;
        if (cfg.branches && Array.isArray(cfg.branches)) parsed.branches = cfg.branches;
        if (cfg.rtoConfig) parsed.rtoConfig = cfg.rtoConfig;
        if (cfg.socialLinks && Array.isArray(cfg.socialLinks)) parsed.socialLinks = cfg.socialLinks;
      }

      // 2. Fetch leads from Supabase
      const { data: leadRows } = await supabase
        .from('nippon_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadRows && Array.isArray(leadRows) && leadRows.length > 0) {
        parsed.leads = (leadRows as SupabaseLeadRow[]).map(mapRowToLead);
      }
    } catch (sbErr) {
      // Supabase table may not exist yet or network issue; safely fall back to local file
      console.warn('Supabase sync skipped, using local store data:', sbErr);
    }
  }

  memoryCache = parsed;
  lastCacheFetchTime = Date.now();
  return parsed;
}

export async function saveStoreData(data: NipponStoreData): Promise<void> {
  data.lastUpdated = new Date().toISOString();
  memoryCache = data;
  lastCacheFetchTime = Date.now();

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const json = JSON.stringify(data, null, 2);
    // Atomic write via temp file
    await fs.promises.writeFile(TMP_FILE, json, 'utf-8');
    await fs.promises.rename(TMP_FILE, STORE_FILE);
  } catch (error) {
    console.error('Error saving nippon store:', error);
  }

  // Asynchronously sync config to Supabase
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('nippon_config').upsert({
        id: 'main_store',
        data: {
          vehicles: data.vehicles,
          heroCards: data.heroCards,
          campaigns: data.campaigns,
          branches: data.branches,
          rtoConfig: data.rtoConfig,
          socialLinks: data.socialLinks,
        },
        updated_at: data.lastUpdated,
      });
    } catch (err) {
      console.warn('Failed to sync config to Supabase:', err);
    }
  }
}

// Helpers for specific modules
export async function updateVehicles(vehicles: VehicleModel[]): Promise<void> {
  const store = await getStoreData();
  store.vehicles = vehicles;
  await saveStoreData(store);
}

export async function updateVehicle(id: string, partial: Partial<VehicleModel>): Promise<VehicleModel> {
  const store = await getStoreData();
  const index = store.vehicles.findIndex((v) => v.id === id || v.slug === id);
  if (index === -1) {
    throw new Error(`Vehicle with id ${id} not found.`);
  }

  store.vehicles[index] = { ...store.vehicles[index], ...partial };
  await saveStoreData(store);
  return store.vehicles[index];
}

export async function addVehicle(vehicle: VehicleModel): Promise<VehicleModel> {
  const store = await getStoreData();
  if (store.vehicles.some((v) => v.id === vehicle.id || v.slug === vehicle.slug)) {
    throw new Error(`Vehicle with id ${vehicle.id} already exists.`);
  }

  store.vehicles.push(vehicle);
  await saveStoreData(store);
  return vehicle;
}

export async function deleteVehicle(id: string): Promise<void> {
  const store = await getStoreData();
  store.vehicles = store.vehicles.filter((v) => v.id !== id && v.slug !== id);
  await saveStoreData(store);
}

export async function updateHeroCards(cards: HeroActionCard[]): Promise<void> {
  const store = await getStoreData();
  store.heroCards = cards;
  await saveStoreData(store);
}

export async function updateCampaigns(campaigns: CampaignSettings): Promise<void> {
  const store = await getStoreData();
  store.campaigns = campaigns;
  await saveStoreData(store);
}

export async function updateBranches(branches: BranchLocation[]): Promise<void> {
  const store = await getStoreData();
  store.branches = branches;
  await saveStoreData(store);
}

export async function addLead(leadData: Omit<LeadRecord, 'id' | 'createdAt' | 'status'>): Promise<LeadRecord> {
  const store = await getStoreData();
  const newLead: LeadRecord = {
    ...leadData,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'NEW',
  };

  store.leads.unshift(newLead); // Newest leads first
  await saveStoreData(store);

  // Sync to Supabase table
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('nippon_leads').insert({
        id: newLead.id,
        created_at: newLead.createdAt,
        name: newLead.name,
        phone: newLead.phone,
        lead_type: newLead.leadType,
        target_car: newLead.targetCar || null,
        location: newLead.location || null,
        current_car: newLead.currentCar || null,
        extra_info: newLead.extraInfo || null,
        status: newLead.status,
        notes: newLead.notes || null,
      });
    } catch (err) {
      console.warn('Failed to insert lead to Supabase:', err);
    }
  }

  return newLead;
}

export async function updateLead(id: string, update: Partial<LeadRecord>): Promise<LeadRecord> {
  const store = await getStoreData();
  const index = store.leads.findIndex((l) => l.id === id);
  if (index === -1) {
    throw new Error(`Lead with id ${id} not found.`);
  }

  store.leads[index] = { ...store.leads[index], ...update };
  await saveStoreData(store);

  // Sync update to Supabase
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const dbPayload: Record<string, unknown> = {};
      if (update.status) dbPayload.status = update.status;
      if (update.notes !== undefined) dbPayload.notes = update.notes;

      if (Object.keys(dbPayload).length > 0) {
        await supabase.from('nippon_leads').update(dbPayload).eq('id', id);
      }
    } catch (err) {
      console.warn('Failed to update lead in Supabase:', err);
    }
  }

  return store.leads[index];
}

export async function deleteLead(id: string): Promise<void> {
  const store = await getStoreData();
  store.leads = store.leads.filter((l) => l.id !== id);
  await saveStoreData(store);

  // Sync deletion to Supabase
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('nippon_leads').delete().eq('id', id);
    } catch (err) {
      console.warn('Failed to delete lead in Supabase:', err);
    }
  }
}

export async function updateRtoConfig(config: RegionalRTOConfig): Promise<void> {
  const store = await getStoreData();
  config.lastUpdated = new Date().toISOString();
  store.rtoConfig = config;
  await saveStoreData(store);
}

export async function updateSocialLinks(links: SocialLink[]): Promise<void> {
  const store = await getStoreData();
  store.socialLinks = links;
  await saveStoreData(store);
}

export async function addSocialLink(linkData: Omit<SocialLink, 'id' | 'order'>): Promise<SocialLink> {
  const store = await getStoreData();
  const currentLinks = store.socialLinks || [];
  const newLink: SocialLink = {
    ...linkData,
    id: `social-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    order: currentLinks.length + 1,
  };
  currentLinks.push(newLink);
  store.socialLinks = currentLinks;
  await saveStoreData(store);
  return newLink;
}

export async function updateSocialLink(id: string, partial: Partial<SocialLink>): Promise<SocialLink> {
  const store = await getStoreData();
  const currentLinks = store.socialLinks || [];
  const index = currentLinks.findIndex((s) => s.id === id);
  if (index === -1) {
    throw new Error(`Social link with id ${id} not found.`);
  }
  currentLinks[index] = { ...currentLinks[index], ...partial };
  store.socialLinks = currentLinks;
  await saveStoreData(store);
  return currentLinks[index];
}

export async function deleteSocialLink(id: string): Promise<void> {
  const store = await getStoreData();
  const currentLinks = store.socialLinks || [];
  store.socialLinks = currentLinks.filter((s) => s.id !== id);
  await saveStoreData(store);
}
