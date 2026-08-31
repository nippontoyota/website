export type CarColor = { id: string; name: string; hex: string; dualTone?: boolean; };
export type CarVariant = { id: string; name: string; fuel: string; transmission: string; price: string; };
export type CarFeature = { category: string; items: string[]; };
export type CarSpec = { label: string; value: string; };
export type CarDetailData = {
  slug: string; name: string; fullName: string; tagline: string;
  image: string; category: string[]; badge: string | null; basePrice: string;
  colors: CarColor[]; variants: CarVariant[]; specs: CarSpec[]; features: CarFeature[];
  disclaimer: string;
};

export const carDetails: Record<string, CarDetailData> = {
  "glanza": {
    slug: "glanza", name: "Glanza", fullName: "Toyota Glanza",
    tagline: "Premium Hatchback. Precision Engineering.",
    image: "/glanza.png", category: ["cars"], badge: null,
    basePrice: "6.73 Lakhs*",
    colors: [
      { id: "white", name: "Platinum White Pearl", hex: "#F5F5F0" },
      { id: "silver", name: "Silky Silver", hex: "#C0C0C0" },
      { id: "grey", name: "Celestial Grey", hex: "#808080" },
      { id: "blue", name: "Enticing Blue", hex: "#1A4D8F" },
      { id: "red", name: "Fiery Red", hex: "#CC0000" },
      { id: "brown", name: "Earthy Brown", hex: "#8B4513" },
    ],
    variants: [
      { id: "e-mt", name: "E", fuel: "Petrol", transmission: "MT", price: "6.73 Lakhs*" },
      { id: "s-mt", name: "S", fuel: "Petrol", transmission: "MT", price: "7.52 Lakhs*" },
      { id: "s-cng", name: "S CNG", fuel: "CNG", transmission: "MT", price: "8.41 Lakhs*" },
      { id: "g-mt", name: "G", fuel: "Petrol", transmission: "MT", price: "8.27 Lakhs*" },
      { id: "g-cng", name: "G CNG", fuel: "CNG", transmission: "MT", price: "9.07 Lakhs*" },
      { id: "v-mt", name: "V", fuel: "Petrol", transmission: "MT", price: "9.12 Lakhs*" },
      { id: "v-at", name: "V AMT", fuel: "Petrol", transmission: "AMT", price: "9.53 Lakhs*" },
      { id: "z-mt", name: "Z", fuel: "Petrol", transmission: "MT", price: "9.61 Lakhs*" },
      { id: "z-at", name: "Z AMT", fuel: "Petrol", transmission: "AMT", price: "9.99 Lakhs*" },
    ],
    specs: [
      { label: "Engine", value: "1.2L DualJet Petrol" },
      { label: "Power", value: "89 bhp @ 6000 rpm" },
      { label: "Torque", value: "113 Nm @ 4400 rpm" },
      { label: "Transmission", value: "5-Speed MT / AMT" },
      { label: "Fuel Efficiency", value: "22.94 km/l (MT)" },
      { label: "Seating", value: "5" },
      { label: "Boot Space", value: "268 L" },
      { label: "Fuel Tank", value: "37 L" },
    ],
    features: [
      { category: "Safety", items: ["6 Airbags (Z variant)", "ABS with EBD", "Electronic Stability Control", "Hill Assist Control", "360-degree Camera (Z)", "Rear Parking Camera"] },
      { category: "Technology", items: ["9-inch SmartPlay Pro+ Touchscreen", "Wireless Android Auto & Apple CarPlay", "Head-Up Display", "Auto AC with rear AC vents", "Connected Car Tech"] },
      { category: "Comfort & Style", items: ["Alloy Wheels", "LED Headlamps", "LED Rear Combination Lamps", "Keyless Entry & Push Start", "Auto-folding ORVMs", "Leather-wrapped Steering"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change. Additional premium for dual-tone colours."
  },

  "urban-cruiser-taisor": {
    slug: "urban-cruiser-taisor", name: "Urban Cruiser Taisor", fullName: "Toyota Urban Cruiser Taisor",
    tagline: "The Bold Sub-4m Crossover.",
    image: "/taisor.png", category: ["cars"], badge: null,
    basePrice: "7.74 Lakhs*",
    colors: [
      { id: "white", name: "Arctic White", hex: "#F5F5F0" },
      { id: "blue", name: "Opulent Blue", hex: "#1D3D7A" },
      { id: "grey", name: "Grandeur Grey", hex: "#70747A" },
      { id: "red", name: "Blazing Red", hex: "#C01020" },
      { id: "dual-wb", name: "White + Blue", hex: "#1D3D7A", dualTone: true },
      { id: "dual-wr", name: "White + Red", hex: "#C01020", dualTone: true },
    ],
    variants: [
      { id: "e-mt", name: "E", fuel: "Petrol", transmission: "MT", price: "7.74 Lakhs*" },
      { id: "s-mt", name: "S", fuel: "Petrol", transmission: "MT", price: "8.67 Lakhs*" },
      { id: "g-mt", name: "G", fuel: "Petrol", transmission: "MT", price: "9.54 Lakhs*" },
      { id: "g-turbo-mt", name: "G Turbo", fuel: "Petrol Turbo", transmission: "MT", price: "10.55 Lakhs*" },
      { id: "v-at", name: "V AMT", fuel: "Petrol", transmission: "AMT", price: "11.63 Lakhs*" },
      { id: "z-turbo-at", name: "Z+ Turbo AT", fuel: "Petrol Turbo", transmission: "AT", price: "13.04 Lakhs*" },
    ],
    specs: [
      { label: "Engine", value: "1.2L NA / 1.0L Turbo Petrol" },
      { label: "Power", value: "89 bhp (NA) / 99 bhp (Turbo)" },
      { label: "Torque", value: "113 Nm (NA) / 148 Nm (Turbo)" },
      { label: "Transmission", value: "5-MT / AMT / 5-AT" },
      { label: "Fuel Efficiency", value: "21.5 km/l (NA MT)" },
      { label: "Seating", value: "5" },
      { label: "Boot Space", value: "308 L" },
      { label: "Ground Clearance", value: "190 mm" },
    ],
    features: [
      { category: "Safety", items: ["6 Airbags", "ABS with EBD", "Electronic Stability Program", "Hill Hold Control", "Rear Parking Sensors & Camera", "ISOFIX Child Seat"] },
      { category: "Technology", items: ["9-inch SmartPlay Pro Touchscreen", "Wireless Android Auto & Apple CarPlay", "Arkamys Sound Studio", "Connected Car with Remote Features", "Auto AC"] },
      { category: "Comfort & Style", items: ["16-inch Alloy Wheels", "LED Projector Headlamps with DRLs", "Panoramic Sunroof (Z+)", "Keyless Entry & Start/Stop", "Electric Sunroof", "360-degree Camera (Z+)"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change. Additional premium for dual-tone colours."
  },

  "camry": {
    slug: "camry", name: "All-New Camry", fullName: "All-New Toyota Camry",
    tagline: "Executive Luxury. Electrified.",
    image: "/camry.png", category: ["cars", "hybrid"], badge: "HYBRID",
    basePrice: "46.17 Lakhs*",
    colors: [
      { id: "white", name: "Platinum White Pearl", hex: "#F5F5F0" },
      { id: "black", name: "Attitude Black", hex: "#1A1A1A" },
      { id: "silver", name: "Silver Metallic", hex: "#C8C8C8" },
      { id: "grey", name: "Graphite", hex: "#555555" },
      { id: "red", name: "Emotional Red", hex: "#AA0020" },
    ],
    variants: [
      { id: "hybrid", name: "Hybrid", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "46.17 Lakhs*" },
    ],
    specs: [
      { label: "Engine", value: "2.5L Self-Charging Strong Hybrid" },
      { label: "System Power", value: "218 bhp" },
      { label: "Fuel Efficiency", value: "22.2 km/l" },
      { label: "Transmission", value: "e-CVT" },
      { label: "0-100 km/h", value: "8.3 sec" },
      { label: "Seating", value: "5" },
      { label: "Boot Space", value: "493 L" },
      { label: "Fuel Tank", value: "50 L" },
    ],
    features: [
      { category: "Safety", items: ["Toyota Safety Sense (TSS)", "Pre-Collision System", "Radar Cruise Control", "Lane Departure Alert", "Automatic High Beam", "9 SRS Airbags"] },
      { category: "Technology", items: ["12.3-inch Touchscreen", "Wireless Apple CarPlay & Android Auto", "JBL 9-Speaker Premium Sound", "Digital Instrument Cluster", "Head-Up Display", "nanoe-X Air Purification"] },
      { category: "Comfort & Style", items: ["Panoramic Sunroof", "Ventilated & Heated Front Seats", "Ottoman Rear Seats", "Ambient Lighting (64 colours)", "PM2.5 Air Filter", "Power Boot"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change."
  },

  "urban-cruiser-hyryder": {
    slug: "urban-cruiser-hyryder", name: "Urban Cruiser Hyryder", fullName: "Toyota Urban Cruiser Hyryder",
    tagline: "The Mid-Size SUV. Reimagined.",
    image: "/hyryder.png", category: ["suv", "hybrid"], badge: "HYBRID",
    basePrice: "11.14 Lakhs*",
    colors: [
      { id: "white", name: "Pearl White", hex: "#F5F5F0" },
      { id: "grey", name: "Grandeur Grey", hex: "#70747A" },
      { id: "blue", name: "Opulent Blue", hex: "#1D3D7A" },
      { id: "red", name: "Blazing Red", hex: "#C01020" },
      { id: "silver", name: "Metallic Silver", hex: "#C0C0C0" },
      { id: "brown", name: "Earthen Brown", hex: "#6B4226" },
    ],
    variants: [
      { id: "e-neo", name: "E Neo Drive", fuel: "Petrol", transmission: "MT", price: "11.14 Lakhs*" },
      { id: "s-neo", name: "S Neo Drive", fuel: "Petrol", transmission: "MT", price: "13.17 Lakhs*" },
      { id: "s-hybrid", name: "S Strong Hybrid", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "15.27 Lakhs*" },
      { id: "g-hybrid", name: "G Strong Hybrid", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "16.51 Lakhs*" },
      { id: "v-hybrid", name: "V Strong Hybrid", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "18.89 Lakhs*" },
      { id: "z-hybrid", name: "Z Strong Hybrid", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "20.19 Lakhs*" },
    ],
    specs: [
      { label: "Engine", value: "1.5L TNGA Petrol / Strong Hybrid" },
      { label: "Fuel Efficiency", value: "27.97 km/l (Strong Hybrid)" },
      { label: "Transmission", value: "5-MT / e-CVT" },
      { label: "Seating", value: "5" },
      { label: "Boot Space", value: "373 L" },
      { label: "Ground Clearance", value: "210 mm" },
      { label: "Turning Radius", value: "5.3 m" },
      { label: "AWD", value: "Available (e-AWD)" },
    ],
    features: [
      { category: "Safety", items: ["6 Airbags", "ABS with EBD + BA", "ESC + HAC", "360-degree Camera", "TPMS", "ISOFIX Child Seat"] },
      { category: "Technology", items: ["9-inch Touchscreen with Connected Features", "Wireless Android Auto & Apple CarPlay", "Digital Instrument Cluster", "Remote Engine Start", "Head-Up Display"] },
      { category: "Comfort & Style", items: ["Panoramic Sunroof (Z)", "Ventilated Front Seats", "PM2.5 Air Purifier", "Paddle Shifters (Hybrid)", "17-inch Alloy Wheels", "Ambient Lighting"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change. Additional premium for dual-tone colours."
  },

  "fortuner": {
    slug: "fortuner", name: "Fortuner", fullName: "Toyota Fortuner",
    tagline: "The Iconic Legend. Unstoppable.",
    image: "/fortuner-v2.png", category: ["suv"], badge: null,
    basePrice: "33.43 Lakhs*",
    colors: [
      { id: "white", name: "White Pearl Crystal Shine", hex: "#F8F8F0" },
      { id: "silver", name: "Silver Metallic", hex: "#BDBDBD" },
      { id: "brown", name: "Phantom Brown", hex: "#4A4040" },
      { id: "black", name: "Attitude Black", hex: "#1A1A1A" },
      { id: "red", name: "Super Red", hex: "#C80000" },
    ],
    variants: [
      { id: "petrol-4x2-mt", name: "2WD Petrol MT", fuel: "Petrol", transmission: "MT", price: "33.43 Lakhs*" },
      { id: "petrol-4x2-at", name: "2WD Petrol AT", fuel: "Petrol", transmission: "AT", price: "34.98 Lakhs*" },
      { id: "diesel-4x2-mt", name: "2WD Diesel MT", fuel: "Diesel", transmission: "MT", price: "36.57 Lakhs*" },
      { id: "diesel-4x2-at", name: "2WD Diesel AT", fuel: "Diesel", transmission: "AT", price: "40.46 Lakhs*" },
      { id: "diesel-4x4-at", name: "4WD Diesel AT", fuel: "Diesel", transmission: "AT", price: "44.75 Lakhs*" },
      { id: "diesel-4x4-black", name: "4WD Black Edition", fuel: "Diesel", transmission: "AT", price: "51.44 Lakhs*" },
    ],
    specs: [
      { label: "Petrol Engine", value: "2.7L 4-cyl, 163 bhp" },
      { label: "Diesel Engine", value: "2.8L 4-cyl, 201 bhp, 500 Nm" },
      { label: "Transmission", value: "6-MT / 6-AT" },
      { label: "Drive System", value: "4x2 / 4x4" },
      { label: "Seating", value: "7" },
      { label: "Ground Clearance", value: "225 mm" },
      { label: "Wading Depth", value: "700 mm" },
      { label: "Turning Radius", value: "5.8 m" },
    ],
    features: [
      { category: "Safety", items: ["7 Airbags", "ABS + EBD + BA", "VSC + TRC", "HAC & DAC", "Crawl Control (4x4)", "Multi-Terrain Select (4x4)"] },
      { category: "Technology", items: ["9-inch Touchscreen", "Apple CarPlay & Android Auto", "4-camera 360 View", "Parking Sensors", "Connected Car Features"] },
      { category: "Comfort & Style", items: ["18-inch Alloy Wheels", "LED Headlamps & DRLs", "Power Sunroof", "Leather Upholstery", "Ventilated Front Seats", "Dual-zone Climate Control"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change."
  },

  "legender": {
    slug: "legender", name: "Legender", fullName: "Toyota Fortuner Legender",
    tagline: "Fortuner. Elevated. Amplified.",
    image: "/legender.png", category: ["suv"], badge: null,
    basePrice: "43.66 Lakhs*",
    colors: [
      { id: "white", name: "Pearl White", hex: "#F8F8F0" },
      { id: "black", name: "Attitude Black", hex: "#1A1A1A" },
      { id: "red", name: "Super Red", hex: "#C80000" },
      { id: "dual-wb", name: "White + Black", hex: "#1A1A1A", dualTone: true },
      { id: "dual-rb", name: "Red + Black", hex: "#C80000", dualTone: true },
    ],
    variants: [
      { id: "2wd-diesel-at", name: "2WD Diesel AT", fuel: "Diesel", transmission: "AT", price: "43.66 Lakhs*" },
      { id: "4wd-diesel-at", name: "4WD Diesel AT", fuel: "Diesel", transmission: "AT", price: "50.09 Lakhs*" },
    ],
    specs: [
      { label: "Diesel Engine", value: "2.8L 4-cyl, 201 bhp, 500 Nm" },
      { label: "Transmission", value: "6-Speed AT" },
      { label: "Drive System", value: "4x2 / 4x4" },
      { label: "Seating", value: "7" },
      { label: "Ground Clearance", value: "225 mm" },
      { label: "Headlamps", value: "Bi-LED with Sequential DRLs" },
      { label: "Audio", value: "JBL 9-Speaker Premium" },
      { label: "Sunroof", value: "Power Sunroof" },
    ],
    features: [
      { category: "Safety", items: ["7 Airbags", "ABS + EBD + BA", "VSC + TRC", "HAC & DAC", "Crawl Control (4x4)", "360-degree Camera"] },
      { category: "Technology", items: ["9-inch Touchscreen", "Wireless CarPlay & Android Auto", "JBL 9-Speaker System", "Sequential Turn Signals", "Connected Car Features"] },
      { category: "Comfort & Style", items: ["Exclusive Bi-LED Headlamps", "Dual-Tone Body", "Wireless Charging", "Leather Ventilated Seats", "18-inch Premium Alloys", "Ambient Lighting"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change. Additional premium for dual-tone colours."
  },

  "hilux": {
    slug: "hilux", name: "Hilux", fullName: "Toyota Hilux",
    tagline: "Built Tough. Born Ready.",
    image: "/hilux.png", category: ["suv"], badge: null,
    basePrice: "30.40 Lakhs*",
    colors: [
      { id: "white", name: "White Pearl Crystal Shine", hex: "#F8F8F0" },
      { id: "silver", name: "Silver Metallic", hex: "#C0C0C0" },
      { id: "grey", name: "Graphite", hex: "#4A4A4A" },
      { id: "red", name: "Super Red", hex: "#C80000" },
      { id: "dual-wg", name: "White + Grey", hex: "#4A4A4A", dualTone: true },
      { id: "dual-gb", name: "Grey + Black", hex: "#1A1A1A", dualTone: true },
    ],
    variants: [
      { id: "std", name: "Standard", fuel: "Diesel", transmission: "MT", price: "30.40 Lakhs*" },
      { id: "high", name: "High", fuel: "Diesel", transmission: "MT", price: "34.75 Lakhs*" },
      { id: "high-at", name: "High AT", fuel: "Diesel", transmission: "AT", price: "37.90 Lakhs*" },
    ],
    specs: [
      { label: "Engine", value: "2.8L GD Series Diesel" },
      { label: "Power", value: "201 bhp @ 3400 rpm" },
      { label: "Torque", value: "500 Nm @ 1600 rpm" },
      { label: "Transmission", value: "6-MT / 6-AT" },
      { label: "Drive System", value: "4x4 (Hi/Lo Range)" },
      { label: "Ground Clearance", value: "310 mm" },
      { label: "Wading Depth", value: "700 mm" },
      { label: "Payload", value: "1 Tonne" },
    ],
    features: [
      { category: "Safety", items: ["6 Airbags (High)", "ABS + EBD + BA", "VSC + TRC", "HAC & DAC", "Multi-Terrain Select", "Crawl Control"] },
      { category: "Technology", items: ["9-inch Touchscreen (High)", "Apple CarPlay & Android Auto", "360-degree Camera (High AT)", "Parking Sensors", "Connected Car Tech"] },
      { category: "Off-Road Capability", items: ["4x4 Hi & Lo Range", "Rear Diff Lock", "Approach Angle 29 degrees", "Departure Angle 26 degrees", "Ramp Breakover 24 degrees", "GVW 2915 kg"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change. Additional premium for dual-tone colours."
  },

  "land-cruiser-300": {
    slug: "land-cruiser-300", name: "Land Cruiser 300", fullName: "Toyota Land Cruiser 300",
    tagline: "The Pinnacle of Off-Road Luxury.",
    image: "/land-cruiser-300.png", category: ["suv"], badge: null,
    basePrice: "2.10 Crore*",
    colors: [
      { id: "white", name: "White Pearl Crystal Shine", hex: "#F8F8F0" },
      { id: "black", name: "Attitude Black", hex: "#1A1A1A" },
      { id: "bronze", name: "Copper Bronze", hex: "#8B6B3D" },
      { id: "grey", name: "Dark Grey", hex: "#404040" },
    ],
    variants: [
      { id: "vx", name: "VX-R", fuel: "Diesel", transmission: "AT", price: "2.10 Crore*" },
    ],
    specs: [
      { label: "Engine", value: "3.3L V6 Twin-Turbo Diesel" },
      { label: "Power", value: "305 bhp" },
      { label: "Torque", value: "700 Nm" },
      { label: "Transmission", value: "10-Speed AT" },
      { label: "Drive System", value: "4x4 with E-KDSS" },
      { label: "Ground Clearance", value: "235 mm" },
      { label: "Wading Depth", value: "700 mm" },
      { label: "0-100 km/h", value: "6.7 sec" },
    ],
    features: [
      { category: "Safety", items: ["Toyota Safety Sense", "10 Airbags", "Pre-Collision System", "Radar Cruise Control", "Lane Departure Alert", "Blind Spot Monitor"] },
      { category: "Technology", items: ["12.3-inch Touchscreen", "JBL 14-Speaker Audio", "Digital Rear-View Mirror", "Multi-Terrain Monitor", "Connected Car Features"] },
      { category: "Off-Road", items: ["E-KDSS Electronic Suspension", "Multi-Terrain Select", "Crawl Control (5 modes)", "Centre Diff Lock", "Active Height Control Suspension", "Kinetic Dynamic Suspension"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change."
  },

  "vellfire": {
    slug: "vellfire", name: "Vellfire", fullName: "Toyota Vellfire",
    tagline: "Move In Pure Luxury.",
    image: "/vellfire.png", category: ["mpv", "hybrid"], badge: "HYBRID",
    basePrice: "1.22 Crore*",
    colors: [
      { id: "white", name: "White Pearl Crystal Shine", hex: "#F8F8F0" },
      { id: "black", name: "Attitude Black", hex: "#1A1A1A" },
      { id: "silver", name: "Precious Silver", hex: "#D0D0D0" },
    ],
    variants: [
      { id: "hybrid", name: "Strong Hybrid", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "1.22 Crore*" },
    ],
    specs: [
      { label: "Engine", value: "2.5L TNGA Strong Hybrid" },
      { label: "System Power", value: "197 bhp" },
      { label: "Fuel Efficiency", value: "23.35 km/l" },
      { label: "Transmission", value: "e-CVT" },
      { label: "Seating", value: "7 (2+2+3)" },
      { label: "Wheelbase", value: "3000 mm" },
      { label: "Dual Sunroofs", value: "Yes" },
      { label: "Executive Lounge", value: "Available" },
    ],
    features: [
      { category: "Safety", items: ["Toyota Safety Sense", "9 SRS Airbags", "Pre-Collision System", "Radar Cruise Control", "Lane Departure Alert", "Automatic High Beam"] },
      { category: "Technology", items: ["11.6-inch Rear Entertainment Screens", "14-Speaker JBL Premium Audio", "Rear Seat Remote Control", "Wireless Charging", "Digital Instrument Cluster"] },
      { category: "Luxury", items: ["Ottoman Rear Seats", "VIP Executive Lounge Package", "Dual Panoramic Sunroofs", "Power Side Steps", "Power Sliding Doors", "64-colour Ambient Lighting"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change."
  },

  "innova-hycross": {
    slug: "innova-hycross", name: "Innova HyCross", fullName: "Toyota Innova HyCross",
    tagline: "The Future of Family MPV.",
    image: "/hycross.png", category: ["mpv", "hybrid"], badge: "HYBRID",
    basePrice: "18.92 Lakhs*",
    colors: [
      { id: "white", name: "Platinum White Pearl", hex: "#F5F5F0" },
      { id: "silver", name: "Silver Metallic", hex: "#BDBDBD" },
      { id: "grey", name: "Midnight Storm", hex: "#363636" },
      { id: "brown", name: "Vintage Brown", hex: "#6B4226" },
      { id: "black", name: "Attitude Black", hex: "#1A1A1A" },
    ],
    variants: [
      { id: "g-petrol", name: "G Petrol", fuel: "Petrol", transmission: "CVT", price: "18.92 Lakhs*" },
      { id: "gx-petrol", name: "GX Petrol", fuel: "Petrol", transmission: "CVT", price: "20.08 Lakhs*" },
      { id: "gx-hybrid", name: "GX Strong Hybrid", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "22.28 Lakhs*" },
      { id: "vx-hybrid", name: "VX Strong Hybrid", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "25.74 Lakhs*" },
      { id: "zx-hybrid", name: "ZX Strong Hybrid", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "28.96 Lakhs*" },
      { id: "zx-hybrid-7s", name: "ZX Strong Hybrid 7-Seater", fuel: "Petrol Hybrid", transmission: "e-CVT", price: "30.68 Lakhs*" },
    ],
    specs: [
      { label: "Engine", value: "2.0L Petrol / 2.0L Strong Hybrid" },
      { label: "Hybrid Power", value: "186 bhp (system)" },
      { label: "Fuel Efficiency", value: "23.24 km/l (Hybrid)" },
      { label: "Transmission", value: "CVT / e-CVT" },
      { label: "Seating", value: "7 / 8" },
      { label: "Boot Space", value: "690 L (2nd row folded)" },
      { label: "Wheelbase", value: "2850 mm" },
      { label: "Ground Clearance", value: "185 mm" },
    ],
    features: [
      { category: "Safety", items: ["Toyota Safety Sense (TSS)", "7 Airbags", "AEB", "Radar Cruise Control", "Lane Departure Alert", "360-degree Camera"] },
      { category: "Technology", items: ["10-inch Touchscreen", "Wireless CarPlay & Android Auto", "Connected Car with Remote Start", "Digital Instrument Cluster", "Rear Entertainment System (ZX)"] },
      { category: "Comfort & Style", items: ["Panoramic Sunroof", "Ottoman 2nd Row Seats (ZX)", "Ventilated Front Seats", "Wireless Charging", "17-inch Alloy Wheels", "64-colour Ambient Lighting"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change. Additional premium for dual-tone colours."
  },

  "innova-crysta": {
    slug: "innova-crysta", name: "Innova Crysta", fullName: "Toyota Innova Crysta",
    tagline: "Proven. Dependable. Enduring.",
    image: "/crysta.png", category: ["mpv"], badge: null,
    basePrice: "19.99 Lakhs*",
    colors: [
      { id: "silver", name: "Silver Metallic", hex: "#C0C0C0" },
      { id: "white", name: "Platinum White Pearl", hex: "#F5F5F0" },
      { id: "brown", name: "Phantom Brown", hex: "#4A3520" },
      { id: "black", name: "Attitude Black", hex: "#1A1A1A" },
    ],
    variants: [
      { id: "gx-diesel-mt", name: "GX MT", fuel: "Diesel", transmission: "MT", price: "19.99 Lakhs*" },
      { id: "vx-diesel-mt", name: "VX MT", fuel: "Diesel", transmission: "MT", price: "22.61 Lakhs*" },
      { id: "vx-diesel-at", name: "VX AT", fuel: "Diesel", transmission: "AT", price: "24.40 Lakhs*" },
      { id: "zx-diesel-at", name: "ZX AT", fuel: "Diesel", transmission: "AT", price: "26.30 Lakhs*" },
    ],
    specs: [
      { label: "Engine", value: "2.4L 4-cyl Diesel" },
      { label: "Power", value: "148 bhp @ 3400 rpm" },
      { label: "Torque", value: "360 Nm (MT) / 343 Nm (AT)" },
      { label: "Transmission", value: "5-MT / 6-AT" },
      { label: "Seating", value: "7 / 8" },
      { label: "Boot Space", value: "300 L (8-seater)" },
      { label: "Wheelbase", value: "2750 mm" },
      { label: "Ground Clearance", value: "178 mm" },
    ],
    features: [
      { category: "Safety", items: ["7 Airbags (ZX)", "ABS + EBD + BA", "Vehicle Stability Control", "Hill Start Assist", "Rear Parking Camera", "ISOFIX Child Seat"] },
      { category: "Technology", items: ["9-inch Touchscreen", "Apple CarPlay & Android Auto", "Parking Sensors", "Auto AC with Rear Vents", "Connected Car Features"] },
      { category: "Comfort & Style", items: ["Captain Seats (2nd Row)", "Leather Upholstery (ZX)", "Power Sunroof (ZX)", "17-inch Alloy Wheels", "LED Headlamps", "Rear Reading Lamps"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change."
  },

  "rumion": {
    slug: "rumion", name: "Rumion", fullName: "Toyota Rumion",
    tagline: "Spacious. Efficient. Smart.",
    image: "/rumion.png", category: ["mpv"], badge: null,
    basePrice: "10.44 Lakhs*",
    colors: [
      { id: "white", name: "Pearl White", hex: "#F5F5F0" },
      { id: "silver", name: "Silver Metallic", hex: "#C0C0C0" },
      { id: "brown", name: "Dignity Brown", hex: "#5C4033" },
      { id: "blue", name: "Phoenix Blue", hex: "#1A4580" },
    ],
    variants: [
      { id: "e-mt", name: "E MT", fuel: "Petrol", transmission: "MT", price: "10.44 Lakhs*" },
      { id: "s-mt", name: "S MT", fuel: "Petrol", transmission: "MT", price: "11.30 Lakhs*" },
      { id: "s-cng", name: "S CNG", fuel: "CNG", transmission: "MT", price: "12.28 Lakhs*" },
      { id: "g-mt", name: "G MT", fuel: "Petrol", transmission: "MT", price: "12.21 Lakhs*" },
      { id: "g-cng", name: "G CNG", fuel: "CNG", transmission: "MT", price: "13.09 Lakhs*" },
      { id: "g-at", name: "G AT", fuel: "Petrol", transmission: "AT", price: "12.98 Lakhs*" },
      { id: "v-at", name: "V AT", fuel: "Petrol", transmission: "AT", price: "13.73 Lakhs*" },
    ],
    specs: [
      { label: "Engine", value: "1.5L K15C Petrol" },
      { label: "Power", value: "103 bhp @ 6000 rpm" },
      { label: "Torque", value: "137 Nm @ 4400 rpm" },
      { label: "Transmission", value: "5-MT / 4-AT" },
      { label: "CNG Range", value: "~400 km (CNG)" },
      { label: "Seating", value: "7" },
      { label: "Boot Space", value: "108 L (all rows)" },
      { label: "Ground Clearance", value: "180 mm" },
    ],
    features: [
      { category: "Safety", items: ["6 Airbags (G/V)", "ABS with EBD + BA", "ESC", "Hill Hold Control", "Rear Parking Camera", "ISOFIX"] },
      { category: "Technology", items: ["10-inch SmartPlay Pro Touchscreen", "Wireless Android Auto & CarPlay", "360-degree Camera (V)", "Auto AC", "Connected Features"] },
      { category: "Comfort & Style", items: ["Captain Seats (2nd Row V)", "Sliding 2nd Row Seats", "15-inch Alloy Wheels", "LED Headlamps", "Dual AC", "Keyless Entry & Push Start"] },
    ],
    disclaimer: "Ex-showroom price, Kochi. Prices subject to change. Additional premium for dual-tone colours."
  },

  "urban-cruiser-ebella": {
    slug: "urban-cruiser-ebella", name: "Urban Cruiser Ebella", fullName: "Toyota Urban Cruiser Ebella",
    tagline: "The Future. Pure Electric.",
    image: "/ebella.png", category: ["ev"], badge: "EV",
    basePrice: "Coming Soon",
    colors: [
      { id: "white", name: "Platinum White Pearl", hex: "#F5F5F0" },
      { id: "blue", name: "Celestial Blue", hex: "#1B3A8F" },
      { id: "black", name: "Midnight Black", hex: "#1A1A1A" },
      { id: "silver", name: "Metallic Silver", hex: "#C5C5C5" },
    ],
    variants: [
      { id: "mid", name: "Mid Range", fuel: "Electric", transmission: "Single Speed", price: "Coming Soon" },
      { id: "long", name: "Long Range", fuel: "Electric", transmission: "Single Speed", price: "Coming Soon" },
    ],
    specs: [
      { label: "Range", value: "Up to 543 km (in-house certified)" },
      { label: "Battery", value: "49 kWh / 61 kWh" },
      { label: "Drive", value: "FWD / AWD" },
      { label: "Fast Charging", value: "DC Fast (50 kW)" },
      { label: "0-100 km/h", value: "TBA" },
      { label: "Seating", value: "5" },
      { label: "Sunroof", value: "Panoramic Sunroof" },
      { label: "Charging", value: "AC (7.2 kW) + DC Fast" },
    ],
    features: [
      { category: "Safety", items: ["Toyota Safety Sense", "Multiple Airbags", "Autonomous Emergency Braking", "Lane Departure Alert", "360-degree Camera", "TPMS"] },
      { category: "Technology", items: ["10.1-inch Touchscreen", "Wireless CarPlay & Android Auto", "OTA Updates", "Connected Car Features", "Digital Instrument Cluster", "Vehicle-to-Load (V2L)"] },
      { category: "EV Features", items: ["DC Fast Charging Support", "AC Home Charging", "Regenerative Braking Modes", "e-AWD (Long Range)", "Pre-conditioning via App", "Eco/Normal/Power Drive Modes"] },
    ],
    disclaimer: "Specifications are indicative and subject to change at launch. Range as per AIS 040 (Rev.1)."
  },
};
