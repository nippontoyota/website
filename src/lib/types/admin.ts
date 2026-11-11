export type CarColor = {
  id: string;
  name: string;
  hex: string;
  dualTone?: boolean;
};

export type CarVariant = {
  id: string;
  name: string;
  fuel: string;
  transmission: string;
  price: string;
};

export type CarFeature = {
  category: string;
  items: string[];
};

export type CarSpec = {
  label: string;
  value: string;
};

export type VehicleStatus = 'AVAILABLE' | 'UPCOMING' | 'BOOKINGS_OPEN' | 'WAITING_LIST';

export type VehicleModel = {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  category: string[];
  status: VehicleStatus;
  badge: string | null;
  basePrice: string;
  exShowroomRange: string;
  onRoadKochiRange: string;
  image: string;
  brochureUrl?: string;
  colors: CarColor[];
  variants: CarVariant[];
  specs: CarSpec[];
  features: CarFeature[];
  disclaimer?: string;
  featured?: boolean;
  order: number;
};

export type HeroActionCard = {
  id: string;
  tag: string;
  subTag: string;
  title: string;
  description: string;
  pillsTitle: string;
  pills: { label: string }[];
  perks: string[];
  cta: string;
  intent: 'TEST_DRIVE' | 'EXCHANGE' | 'PRICE_LIST' | 'BROCHURE' | 'SERVICE' | 'GENERIC';
  badge?: string;
  enabled: boolean;
  order: number;
};

export type CampaignSettings = {
  announcementBar: {
    enabled: boolean;
    text: string;
    link?: string;
    badge?: string;
  };
  exitIntentOffer: {
    enabled: boolean;
    headline: string;
    subheadline: string;
    voucherAmount: string;
    perkDetails: string[];
  };
};

export type BranchLocation = {
  id: string;
  name: string;
  type: 'SHOWROOM' | 'SERVICE' | '3S_FACILITY';
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  timing: string;
  mapUrl: string;
  isMainBranch?: boolean;
};

export type LeadStatus = 'NEW' | 'CONTACTED' | 'TEST_DRIVE_SCHEDULED' | 'BOOKED' | 'LOST';

export type LeadRecord = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  leadType: 'SALES' | 'SERVICE' | 'TEST_DRIVE' | 'EXCHANGE' | 'BROCHURE' | 'PRICE_LIST' | 'EXIT_OFFER' | 'GENERIC';
  targetCar?: string;
  location?: string;
  currentCar?: string;
  extraInfo?: string;
  status: LeadStatus;
  notes?: string;
};

export type TaxSlab = {
  id: string;
  minPriceLakhs: number;
  maxPriceLakhs: number;
  taxPercent: number;
  label: string;
};

export type KeralaDistrictRTO = {
  id: string;
  name: string;
  code: string;
  cessAmount: number;
  active: boolean;
};

export type RegionalRTOConfig = {
  lastUpdated: string;
  taxSlabs: TaxSlab[];
  evTaxPercent: number;
  tcsPercent: number;
  fastagFee: number;
  registrationFee: number;
  defaultInsurancePercent: number;
  districts: KeralaDistrictRTO[];
  emiInterestRate: number;
  emiTenureMonths: number;
};

export type SocialPlatform =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'whatsapp'
  | 'x'
  | 'linkedin'
  | 'threads'
  | 'custom';

export type SocialLink = {
  id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
  handle?: string;
  enabled: boolean;
  order: number;
};

export type NipponStoreData = {
  version: string;
  lastUpdated: string;
  vehicles: VehicleModel[];
  heroCards: HeroActionCard[];
  campaigns: CampaignSettings;
  branches: BranchLocation[];
  leads: LeadRecord[];
  rtoConfig?: RegionalRTOConfig;
  socialLinks?: SocialLink[];
};
