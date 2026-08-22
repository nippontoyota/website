export type ServiceInfo = {
  title: string;
  paragraphs: string[];
  videos?: string[];
  gallery?: string[];
};

export const qServiceInfo: Record<string, ServiceInfo> = {
  "toyota-express-maintenance": {
    title: "Toyota Express Maintenance",
    paragraphs: [
      "EM60 is Comprehensive Service in Just 60 minutes with the core principle of Toyota Production System (TPS). With 3 Man (Technician) Operation in a sequential & defined process using sophisticated Tools, we complete the Periodic Maintenance (PM) Services in 60 mins. For vehicles with additional pre-defined General repair, we provide the option of choosing from EM90 or EM120.",
      "Key features: EM60 — PM Service in 60 Mins. EM90 & EM120 — PM Service + Additional pre-defined General Repair.",
    ],
    videos: ["2PRw1ebq5_0", "Zuoc8g4ADzc", "50gLw7yvKs4", "JLP1VFeezmQ"],
    gallery: [
      "/q-service/gallery/toyota-express-maintenance/picture1.webp",
      "/q-service/gallery/toyota-express-maintenance/picture2.webp",
      "/q-service/gallery/toyota-express-maintenance/picture3.webp",
    ],
  },
  "t-club": {
    title: "T Club",
    paragraphs: [
      "Specialized Car Service Subscription for Aged Vehicles. As cars age, they need extra attention to stay safe and reliable. The Service Subscription (T CLUB) offers customers a convenient way to maintain their vehicles.",
      "By purchasing the subscription, customers can enjoy a range of service benefits in terms of exclusive discounts on Periodic Maintenance, General repair, Parts, accessories and Value chain products.",
    ],
    gallery: [
      "/q-service/gallery/t-club/t-club-picture-1.webp",
      "/q-service/gallery/t-club/t-club-picture-2.webp",
    ],
  },
  "toyota-cost-of-maintenance": {
    title: "Toyota Cost Of Maintenance",
    paragraphs: [
      "Toyota Cost of Maintenance lets you get a quote upfront for your service maintenance. With the cost calculator, you will get a complete description of the services that will be done on your vehicle.",
      "To get a quote on the Toyota service calculator, enter vehicle details along with the kilometers you have on your odometer, and the cost will appear within a couple of seconds.",
    ],
    gallery: ["/q-service/gallery/toyota-cost-of-maintainance/picture1.webp"],
  },
  "toyota-body-paint": {
    title: "Toyota Body & Paint",
    paragraphs: [
      "To make sure that your vehicle receives high-quality service, Toyota advises having repairs by a Toyota approved Body & Paint facility. We restore your Toyota with our body & paint repair services to the original manufacturer specifications.",
      "Our Body & Paint team will help you in any situation like completing the claim form, arranging a replacement, or scheduling the collection of your vehicle.",
    ],
    gallery: [
      "/q-service/gallery/toyota-body-paint/picture1.webp",
      "/q-service/gallery/toyota-body-paint/picture2.webp",
    ],
  },
  "t-secure": {
    title: "T Secure",
    paragraphs: [
      "EW Product: In addition to Toyota's Unmatched Standard Manufacturer Vehicle Warranty, Toyota has a retail Extended Warranty product through which guests can extend peace of mind up to 5 Years / 2,20,000 Km from sale of vehicle.",
      "Product USPs: True Warranty secures the complete vehicle with coverage like the Manufacturer warranty. Driveline Warranty covers specific aggregates only (Engine, Gearbox / Transmission & Differential).",
    ],
    gallery: ["/q-service/gallery/toyota-extended-warranty/picture2-new.webp"],
  },
  "t-assist": {
    title: "T Assist",
    paragraphs: [
      "The 24x7 Roadside Assistance Program of TKM is a Complimentary program for customer convenience. The customer can avail this service within 3 years / 5 years* from the vehicle purchase by contacting the 24x7 Roadside Assistance number (1800 102 5001 / 0124 235 5001).",
      "After the expiry of Inbuilt RSA, customers can purchase the program till 8 years of ownership under the Retail Program. Key features include Free Taxi Arrangement (50 Kms) and more.",
    ],
    gallery: [
      "/q-service/gallery/toyota-road-side-assistance/picture1.webp",
      "/q-service/gallery/toyota-road-side-assistance/picture2.webp",
      "/q-service/gallery/toyota-road-side-assistance/picture3.webp",
    ],
  },
  "t-smiles": {
    title: "T Smiles",
    paragraphs: [
      "Smiles Plus Product: Smiles Plus is a Pre-Paid Periodic Maintenance Service Package, designed for future mobility requirements to offer a hassle-free service experience to customers.",
      "Product USPs: Customers can avail Services Pan India (Toyota Dealerships). Customizable Service package offerings. Regular Periodic Servicing increases Resale Value. Peace of Mind — guests can avail the Smiles Plus package for a period of 1 or 2 years.",
    ],
    gallery: ["/q-service/gallery/toyota-smiles/picture3-new.webp"],
  },
  "toyota-bactaklenz": {
    title: "Toyota BactaKlenz",
    paragraphs: [
      "Toyota BactaKlenz is an anti-bacterial treatment that uses non-toxic vapour to deep clean and eliminate 99.99% of bacteria, molds, and fungi inside the vehicle. It is a Toyota Genuine Product approved by Toyota Motor Corporation.",
      "The treatment leaves a lingering herbal scent, which enhances its anti-viral properties.",
    ],
    gallery: [
      "/q-service/gallery/toyota-bactaKlenz/picture1.webp",
      "/q-service/gallery/toyota-bactaKlenz/picture2.webp",
    ],
  },
  "toyota-caf-pm25": {
    title: "Toyota CAF PM2.5",
    paragraphs: [
      "Toyota genuine cabin air filter is engineered for precision fit and performance in Toyota ventilation systems and restores ventilation effectiveness to original, factory specifications.",
    ],
    gallery: ["/q-service/gallery/toyota-caf-pm2.5/picture1.webp"],
  },
  "toyota-car-sanitization": {
    title: "Toyota Car Sanitization",
    paragraphs: [
      "We take every precaution to keep our team safe and your vehicle sanitized for the road. Our services include wiping interior surfaces, vacuuming, complete ozone treatment, cleaning out the cabin filter (filter replacement not included), and vehicle fog treatment.",
    ],
  },
  "toyota-motor-oil": {
    title: "Toyota Motor Oil",
    paragraphs: [
      "From hybrid to petrol to diesel, Toyota Motor Oil (TMO) is designed with keeping your car in mind. TMO lubricants are tested and developed to fit your engine's needs.",
      "With regular use of Toyota Motor Oil lubricants, you can enjoy outstanding vehicle performance, fuel economy, and emissions for several years.",
    ],
    gallery: [
      "/q-service/gallery/toyota-motor-oil/picture1.webp",
      "/q-service/gallery/toyota-motor-oil/picture2.webp",
    ],
  },
  "toyota-engine-flush": {
    title: "Toyota Engine Flush",
    paragraphs: [
      "Toyota Engine Flush restores vehicle performance that is lost due to deposits and sludge in the engine that cause loss of power and performance. It is mixed with the oil so it can circulate throughout all engine parts, dissolving any dirt deposits.",
      "Engine Flush keeps new oil cleaner, reduces fuel consumption, long-term breakdowns, and maintenance cost.",
    ],
    gallery: ["/q-service/gallery/toyota-engine-flush/picture1.webp"],
  },
  "toyota-injector-cleaner": {
    title: "Toyota Injector Cleaner",
    paragraphs: [
      "Toyota Genuine Diesel Injector Cleaner eliminates carbon deposits from fuel injector nozzles. It maintains and restores an engine's optimal performance.",
      "The Injector Cleaner is used once every two years or 40,000 kms and is available for both petrol and diesel engines. You can find the details in the Service & Warranty logbook.",
    ],
    gallery: ["/q-service/gallery/toyota-injector-cleaner/picture1.webp"],
  },
  "battery-program": {
    title: "Battery Program",
    paragraphs: [
      "If your vehicle is having trouble starting or has dim headlights when the engine is turned off, your battery may be getting weak. You should test it for a potential replacement with a new Toyota TrueStart™ battery.",
      "These batteries have an accurate mix of cold cranking amps (CCA) and reserve capacity (RC) for reliable performance despite the climate. Schedule your appointment to have your battery serviced or replaced.",
    ],
    gallery: ["/q-service/gallery/toyota-battery-program/picture1.webp"],
  },
  "t-gloss": {
    title: "T Gloss",
    paragraphs: [
      "Like most things, your Toyota needs care to keep it looking its best. Our genuine T Gloss Products include the Cockpit spray and Upholstery cleaner for cleaning, polishing, and protecting your vehicle's interiors.",
      "The Car polish consists of top-quality wax for a high gloss shine. Toyota's Wheel cleaner removes dirt from your wheels, the Glass cleaner cleans up your windows, the touch-up aerosol is used for any damaged paintwork, and pencil patch up is used for small scratches.",
    ],
    gallery: [
      "/q-service/gallery/toyota-car-beautification/picture1.webp",
      "/q-service/gallery/toyota-car-beautification/picture2.webp",
    ],
  },
  "tyre-program": {
    title: "Tyre Program",
    paragraphs: [
      "If you are looking for tyres, Tyre Care provides you with a vast inventory of tyres. Our well-maintained tyres help your Toyota's performance, fuel efficiency, and road safety requirements.",
      "We have tyres from the most well-known brands and always offer high-end services to our customers. Our skilled technicians know what tyres fit best on your Toyota and will help you make the right choice according to your budget.",
    ],
    gallery: ["/q-service/gallery/toyota-tyre-program/picture1.webp"],
  },
  "car-essential-store": {
    title: "Car Essential Store",
    paragraphs: [
      "Toyota Car Essential Store is a one-stop-shop concept, aiming to provide a convenient shopping experience to customers for the needs of the vehicle under one roof of the Dealership — like Tyre, Battery, Car Beautification, and Do It Yourself Store (Car Shampoo, Micro Fibre Cloth, Vacuum Cleaner etc.).",
    ],
    gallery: ["/q-service/gallery/toyota-diy-store/picture1.webp"],
  },
  "toyota-car-decals": {
    title: "Toyota Car Decals",
    paragraphs: [
      "Toyota's Car Decals service brings a new car gloss to your exteriors. Our car decals are available for the Toyota Yaris. Some of these include sport side stripes, mud splash decal, mountain stripes, rear hockey stripes, lower sports stripes, and much more.",
      "To avail of the decals, use the Toyota WhatsApp service or download the T-Connect app available on the Play Store and Apple Store.",
    ],
    gallery: ["/q-service/gallery/toyota-car-decals/picture1.webp"],
  },
  "toyota-parts-connect": {
    title: "Toyota Parts Connect",
    paragraphs: [
      "To make sure that your Toyota is protected and performs efficiently, you can search, find and order Genuine Toyota Parts & Accessories at any Toyota Dealer. You can avail of Genuine parts directly online from Toyota Dealers at toyotapartsconnect.in.",
      "All Toyota Genuine Parts carry a 6 month / 10,000 Km (whichever is earlier) Toyota Warranty.",
    ],
    videos: ["5jAMh0Ov1_w", "OjFCmtm8_7s", "wxhHMwpxzoQ", "3NlcUR8otJA", "oW8vQGwu2E4", "dt3_mPwLwVY"],
    gallery: ["/q-service/gallery/toyota-parts-connect/picture1.webp"],
  },
  "toyota-genuine-accessories": {
    title: "Toyota Genuine Accessories",
    paragraphs: [
      "Toyota Genuine Accessories are perfectly designed for an exact fit for styling and performance. With Toyota Genuine Accessories, we take care of the interior and exterior of your vehicle.",
      "From Bull Bars to Tray Bodies to Carpet Floor Mats, every Accessory is manufactured to adhere to Toyota's strict engineering and testing standards for maximum quality assurance.",
    ],
    gallery: ["/q-service/gallery/toyota-genuine-accessories/picture1.webp"],
  },
  "pickup-and-drop": {
    title: "Pick-up and Drop",
    paragraphs: [
      "We value your time. Get your vehicle picked up and dropped to your convenient location.",
      "Pickup & Drop Services include: Vehicle Pickup (vehicle is picked up for service from the customer's place), Vehicle Drop (vehicle is dropped to the customer's place after service), and Vehicle Pickup and Drop (vehicle is picked up from the customer's location and dropped back).",
    ],
    gallery: ["/q-service/gallery/pick-drop/picture1.webp"],
  },
  "toyota-service-express-lite": {
    title: "Toyota Service Express Lite",
    paragraphs: [
      "TSE-Lite has been introduced on the existing MSV (Mobile Service Van) platform to perform Periodic Maintenance & light General Repair Services at far off locations as well as Doorstep services (Metro Cities).",
      "TSE Lite is considered as 1 Bay while evaluating individual workshop capacity.",
    ],
    gallery: [
      "/q-service/gallery/toyota-service-express-lite/picture1.webp",
      "/q-service/gallery/toyota-service-express-lite/picture3.jpeg",
    ],
  },
  "talk-to-toyota": {
    title: "Talk to Toyota",
    paragraphs: [
      "Your complete satisfaction is of primary importance to us. Should you ever have questions or comments about your Toyota vehicle, we suggest you speak to us, so your concerns can be addressed as quickly and efficiently as possible.",
      "Reach us: Talk to Toyota 24x7 — call us for enquiry/feedback at 1800 309 0001 (Toll Free Number) or 080 4505 9000, or email voc@toyota-kirloskar.co.in.",
    ],
    gallery: ["/q-service/gallery/toyota-talk-to-toyota/picture1.webp"],
  },
  "iconnect": {
    title: "i-Connect",
    paragraphs: [
      "The awesome one-stop solution for all Toyota owners. An intelligent and seamless experience that keeps you connected to your car, family & Toyota.",
      "Toyota India offers exclusively for its customers the all-new revamped Toyota i-Connect — a one-stop solution for Toyota owners with a host of services designed to deliver unmatched convenience, a delightful ownership experience & complete peace of mind. Built on a 360-degree connected & secure platform backed by Toyota's expertise.",
    ],
    gallery: [
      "/q-service/gallery/toyota-connect/picture-2.webp",
      "/q-service/gallery/toyota-connect/picture-3.webp",
    ],
  },
  "toyota-quick-repair": {
    title: "Toyota Quick Repair",
    paragraphs: [
      "Do you want a fast, quality repair at your convenience? Toyota's Quick Repair service restores your vehicle without the hassle of a long wait time.",
      "Our experts work in a precise manner to fix any problems with your Toyota like fluid replacements, brake jobs and much more. Visit any of our quick service facilities for more details.",
    ],
    gallery: [
      "/q-service/gallery/toyota-quick-repair/picture1.webp",
      "/q-service/gallery/toyota-quick-repair/picture2.webp",
    ],
  },
  "no-to-counterfeit": {
    title: "No To Counterfeit",
    paragraphs: [
      "Counterfeit parts may look identical, but they fail to meet the quality performance promise due to the use of substandard materials. As Toyota is committed to your safety, you must stay clear of fake parts.",
      "You can avail genuine parts from Toyota dealerships across India — visit toyotapartsconnect.in. Our Toyota dealerships provide high-quality approved vehicle parts that ensure the safety and long life of your car.",
    ],
    gallery: [
      "/q-service/gallery/no-to-counterfeit/picture1.webp",
      "/q-service/gallery/no-to-counterfeit/picture2.webp",
      "/q-service/gallery/no-to-counterfeit/picture3.webp",
    ],
  },
  "t-shield": {
    title: "T Shield",
    paragraphs: [
      "T SHIELD is a proactive initiative from Toyota to improve knowledge about vehicle usage and reduce unwanted expense, so that you can have the best efficiency from your vehicle.",
    ],
    gallery: ["/q-service/gallery/t-shield/picture1.webp"],
  },
  "toyota-qualified-manpower": {
    title: "Toyota Qualified Manpower",
    paragraphs: [
      "At Toyota, we invest in people and training to ensure every vehicle we produce is of premium quality and meets the high standards that we set.",
      "The Toyota Technical Education Program (T-TEP) trains students in the latest automotive technology and service techniques, such as repairs and diagnostics of the new vehicle models available in the market. We make sure to recruit highly qualified students to join the Toyota Dealers, where they can consistently deliver excellence.",
    ],
    gallery: ["/q-service/gallery/toyota-qualified-manpower/picture1.webp"],
  },
  "toyota-ttep": {
    title: "Toyota TTEP",
    paragraphs: [
      "T-TEP is a development training module for the Industrial Training Institute (ITI) students, aligned with the Government of India's Skill India Mission. Toyota's TTEP aims to generate technically skilled professionals for the automobile industry.",
      "T-TEP is known across the world for its effectiveness — this distinctive initiative bridges the experience gap by training staff to meet the growing demand of the emerging industry for skilled resources.",
    ],
    gallery: ["/q-service/gallery/toyota-ttep/picture1.webp"],
  },
};
