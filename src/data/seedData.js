// High quality initial seed data for Agro Kenya
export const INITIAL_USERS = [
  {
    id: "user-1",
    fullName: "John Mwangi",
    businessName: "Mwangi Fresh Farms Ltd",
    email: "johnmwangi@gmail.com",
    phone: "+254 712 345 678",
    whatsapp: "+254712345678",
    county: "Nakuru",
    town: "Naivasha",
    accountType: "Farmer",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    verified: true,
    status: "Active",
    rating: 4.8,
    reviewCount: 12,
    about: "Dedicated commercial farmer specializing in hybrid maize, vine-ripened tomatoes, and organic kale in Nakuru County with over 15 years of agricultural experience.",
    joinedDate: "2024-01-15"
  },
  {
    id: "user-2",
    fullName: "Mary Wanjiku",
    businessName: "Wanjiku Green Produce",
    email: "mary.wanjiku@yahoo.com",
    phone: "+254 721 234 567",
    whatsapp: "+254721234567",
    county: "Trans Nzoia",
    town: "Kitale",
    accountType: "Seller",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    verified: true,
    status: "Active",
    rating: 4.9,
    reviewCount: 28,
    about: "Kitale-based agricultural supplier of high-yield certified seeds, DAP/CAN fertilizers, and fresh farm produce.",
    joinedDate: "2023-11-20"
  },
  {
    id: "user-3",
    fullName: "Peter Kamau",
    businessName: "Rift Valley Grain Buyers",
    email: "pkamau@grainbuyers.co.ke",
    phone: "+254 722 111 222",
    whatsapp: "+254722111222",
    county: "Uasin Gishu",
    town: "Eldoret",
    accountType: "Buyer",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    verified: true,
    status: "Active",
    rating: 4.7,
    reviewCount: 9,
    about: "Bulk buyer of cereals, white maize, and red beans for processing and distribution across East Africa.",
    joinedDate: "2024-02-01"
  },
  {
    id: "user-4",
    fullName: "AgroTech Solutions",
    businessName: "AgroTech Machinery Kenya Ltd",
    email: "info@agrotech.co.ke",
    phone: "+254 733 888 999",
    whatsapp: "+254733888999",
    county: "Nairobi",
    town: "Westlands",
    accountType: "Machinery Owner",
    profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    verified: true,
    status: "Active",
    rating: 5.0,
    reviewCount: 34,
    about: "Authorized importer and lessor of modern agricultural tractors, disc ploughs, combined harvesters, and solar water pumps.",
    joinedDate: "2023-08-10"
  },
  {
    id: "user-5",
    fullName: "Grace Njeri",
    businessName: "Njeri Land Holdings",
    email: "grace.njeri@gmail.com",
    phone: "+254 728 765 432",
    whatsapp: "+254728765432",
    county: "Kiambu",
    town: "Limuru",
    accountType: "Land Owner",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    verified: true,
    status: "Active",
    rating: 4.6,
    reviewCount: 6,
    about: "Leasing fertile arable land with water access for drip irrigation in Kiambu and Nakuru counties.",
    joinedDate: "2024-03-12"
  },
  {
    id: "admin-1",
    fullName: "Manager Admin",
    businessName: "Agro Kenya Moderation Team",
    email: "onlyvee222@gmail.com",
    phone: "+254 700 123 456",
    whatsapp: "+254700123456",
    county: "Nairobi",
    town: "CBD",
    accountType: "Manager",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    verified: true,
    status: "Active",
    rating: 5.0,
    reviewCount: 50,
    about: "Official platform administrator overseeing marketplace integrity, verification, and member safety.",
    joinedDate: "2023-01-01"
  }
];

export const INITIAL_LISTINGS = [
  {
    id: "list-1",
    userId: "user-1",
    sellerName: "John Mwangi",
    sellerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    sellerVerified: true,
    title: "Fresh Farm Tomatoes (Anna F1)",
    category: "Farm Produce",
    subcategory: "Tomatoes",
    listingType: "For Sale",
    description: "Grade-A firm red Anna F1 tomatoes harvested fresh daily from greenhouse drip irrigation. Long shelf life, excellent for markets & supermarket supply. Minimum order 5 crates.",
    price: 80,
    priceUnit: "kg",
    quantity: "2,500 kg available",
    location: "Nakuru, Kenya",
    county: "Nakuru",
    town: "Naivasha",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1546470427-227c7369a639?auto=format&fit=crop&q=80&w=800"
    ],
    status: "Active",
    featured: true,
    views: 412,
    createdAt: "2026-09-10",
    specs: {
      Variety: "Anna F1 Hybrid",
      Quality: "Grade A",
      Packaging: "Wooden Crates / Wooden Boxes",
      Delivery: "Pickup or Transport arranged to Nairobi & Nakuru"
    }
  },
  {
    id: "list-2",
    userId: "user-2",
    sellerName: "Mary Wanjiku",
    sellerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    sellerVerified: true,
    title: "Dry White Maize (Dry Harvest 2026)",
    category: "Farm Produce",
    subcategory: "Maize",
    listingType: "For Sale",
    description: "Clean, sun-dried white grain maize with moisture content below 13.5%. Free from aflatoxin, sorted and bagged in 90kg bags ready for millers and grain traders.",
    price: 2500,
    priceUnit: "90kg bag",
    quantity: "450 bags available",
    location: "Trans Nzoia, Kenya",
    county: "Trans Nzoia",
    town: "Kitale",
    images: [
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=800"
    ],
    status: "Active",
    featured: true,
    views: 620,
    createdAt: "2026-09-12",
    specs: {
      Moisture: "13.2%",
      Weight: "90 kg per bag",
      Grade: "Premium White Grain",
      MinimumOrder: "10 bags"
    }
  },
  {
    id: "list-3",
    userId: "user-4",
    sellerName: "AgroTech Solutions",
    sellerImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    sellerVerified: true,
    title: "John Deere 5075E Tractor (75 HP, 4WD)",
    category: "Machinery",
    subcategory: "Tractors",
    listingType: "For Sale",
    description: "Brand new 75HP John Deere 4WD Tractor. Ideal for heavy tillage, disc ploughing, planting, and trailer hauling in rough terrain. Includes 2 years manufacturer warranty & free initial service.",
    price: 2500000,
    priceUnit: "unit",
    quantity: "3 units available",
    location: "Nairobi, Kenya",
    county: "Nairobi",
    town: "Westlands",
    images: [
      "https://images.unsplash.com/photo-1530267981675-b058f8921c5b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800"
    ],
    status: "Active",
    featured: true,
    views: 1250,
    createdAt: "2026-09-08",
    specs: {
      Horsepower: "75 HP",
      Drive: "4WD",
      Condition: "Brand New (2026)",
      Warranty: "2 Years / 2000 Hours",
      Fuel: "Diesel"
    }
  },
  {
    id: "list-4",
    userId: "user-5",
    sellerName: "Grace Njeri",
    sellerImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    sellerVerified: true,
    title: "Fertile Farmland for Lease (5 Acres)",
    category: "Land Leasing",
    subcategory: "Farmland for Lease",
    listingType: "For Lease",
    description: "Prime 5-acre agricultural plot available for long-term lease in Naivasha. Features deep red volcanic soil, river water frontage with power line connected for pumping, and all-weather road access.",
    price: 350000,
    priceUnit: "year (all 5 acres)",
    quantity: "5 Acres parcel",
    location: "Nakuru, Kenya",
    county: "Nakuru",
    town: "Naivasha",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800"
    ],
    status: "Active",
    featured: true,
    views: 890,
    createdAt: "2026-09-05",
    specs: {
      Acreage: "5 Acres",
      SoilType: "Deep Red Volcanic",
      WaterSource: "Permanent River & Borehole",
      Electricity: "Three Phase Power Connected",
      RoadAccess: "Murram All-Weather Road"
    }
  },
  {
    id: "list-5",
    userId: "user-2",
    sellerName: "Mary Wanjiku",
    sellerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    sellerVerified: true,
    title: "Certified Hybrid Maize Seed (DK 777)",
    category: "Agricultural Inputs",
    subcategory: "Hybrid Seeds",
    listingType: "For Sale",
    description: "KEPHIS certified Dekalb 777 hybrid seed maize. Drought tolerant with high yield potential (35-40 bags per acre). Treated against cutworms and early pests.",
    price: 3800,
    priceUnit: "25kg bag",
    quantity: "120 bags",
    location: "Trans Nzoia, Kenya",
    county: "Trans Nzoia",
    town: "Kitale",
    images: [
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800"
    ],
    status: "Active",
    featured: false,
    views: 310,
    createdAt: "2026-09-11",
    specs: {
      Certification: "KEPHIS Sealed",
      Variety: "DK 777 Hybrid",
      MaturityPeriod: "4.5 Months",
      YieldPotential: "38 Bags / Acre"
    }
  },
  {
    id: "list-6",
    userId: "user-4",
    sellerName: "AgroTech Solutions",
    sellerImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    sellerVerified: true,
    title: "Solar Drip Irrigation Kit (1 Acre Complete)",
    category: "Agricultural Services",
    subcategory: "Irrigation Installation",
    listingType: "Service",
    description: "Complete 1-acre solar-powered drip irrigation package including 500W solar pump, 5000L tank stand, 16mm UV resistant drip lines with emitters, control valves & installation.",
    price: 150000,
    priceUnit: "package installed",
    quantity: "Service package",
    location: "Kiambu, Kenya",
    county: "Kiambu",
    town: "Thika",
    images: [
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800"
    ],
    status: "Active",
    featured: true,
    views: 540,
    createdAt: "2026-09-09",
    specs: {
      Capacity: "1 Acre Drip Grid",
      SolarPump: "500W Submersible Solar Pump",
      Warranty: "3 Years Package Warranty",
      InstallationTime: "2 Days Nationwide"
    }
  },
  {
    id: "list-7",
    userId: "user-1",
    sellerName: "John Mwangi",
    sellerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    sellerVerified: true,
    title: "Organic Fresh Sukuma Wiki (Kale)",
    category: "Farm Produce",
    subcategory: "Vegetables",
    listingType: "For Sale",
    description: "Freshly harvested chemical-free Sukuma Wiki leaves grown organically in Naivasha. Crisp, nutrient rich and packed in neat 10kg bundles.",
    price: 100,
    priceUnit: "bundle (10kg)",
    quantity: "300 bundles daily",
    location: "Nakuru, Kenya",
    county: "Nakuru",
    town: "Naivasha",
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800"
    ],
    status: "Active",
    featured: false,
    views: 180,
    createdAt: "2026-09-14",
    specs: {
      Type: "Thousand Head Sukuma",
      Farming: "Organic / Bio-fertilizer",
      MinimumOrder: "10 bundles"
    }
  },
  {
    id: "list-8",
    userId: "user-4",
    sellerName: "AgroTech Solutions",
    sellerImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    sellerVerified: true,
    title: "Tractor Hire & Land Ploughing Services",
    category: "Agricultural Services",
    subcategory: "Ploughing & Tilling",
    listingType: "Service",
    description: "Professional disc ploughing, harrowing, and ridging services with operator and diesel provided. Available across Nakuru, Uasin Gishu, Trans Nzoia and Narok.",
    price: 3500,
    priceUnit: "acre",
    quantity: "Daily booking",
    location: "Nakuru, Kenya",
    county: "Nakuru",
    town: "Nakuru Town",
    images: [
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800"
    ],
    status: "Active",
    featured: false,
    views: 430,
    createdAt: "2026-09-07",
    specs: {
      Equipment: "75HP 4WD Tractor + 3-Disc Plough",
      Includes: "Fuel & Skilled Operator",
      Efficiency: "up to 12 Acres / Day"
    }
  }
];

export const INITIAL_MESSAGES = [
  {
    id: "msg-1",
    senderId: "user-3",
    receiverId: "user-1",
    listingId: "list-1",
    listingTitle: "Fresh Farm Tomatoes (Anna F1)",
    message: "Habari John! Is the 2,500 kg tomato lot still available for delivery to Nairobi tomorrow?",
    timestamp: "2026-09-14T10:15:00Z",
    read: true
  },
  {
    id: "msg-2",
    senderId: "user-1",
    receiverId: "user-3",
    listingId: "list-1",
    listingTitle: "Fresh Farm Tomatoes (Anna F1)",
    message: "Ney Peter! Yes, we currently have 2,500 kg available. We can arrange transport via a 3-ton canter to Nairobi.",
    timestamp: "2026-09-14T10:18:00Z",
    read: true
  },
  {
    id: "msg-3",
    senderId: "user-3",
    receiverId: "user-1",
    listingId: "list-1",
    listingTitle: "Fresh Farm Tomatoes (Anna F1)",
    message: "Great! What is your best price per kg if I take all 2,500 kg?",
    timestamp: "2026-09-14T10:25:00Z",
    read: false
  }
];

export const INITIAL_REPORTS = [
  {
    id: "rep-1",
    reporterId: "user-3",
    reporterName: "Peter Kamau",
    reportedUserId: "user-99",
    reportedUserName: "Suspicious Seller",
    listingId: "list-99",
    listingTitle: "Fake Cheap Fertilisers",
    reason: "Scam/fraud",
    description: "Seller demanding upfront M-Pesa deposit before showing physical shop location in Eldoret.",
    status: "Pending",
    createdAt: "2026-09-13"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    reviewerId: "user-3",
    reviewerName: "Peter Kamau",
    reviewedUserId: "user-1",
    rating: 5,
    comment: "Excellent quality tomatoes delivered on time to Nairobi market. Very honest farmer!",
    createdAt: "2026-08-28"
  },
  {
    id: "rev-2",
    reviewerId: "user-2",
    reviewerName: "Mary Wanjiku",
    reviewedUserId: "user-1",
    rating: 4.5,
    comment: "Great produce and clear communication regarding transport arrangements.",
    createdAt: "2026-09-01"
  }
];

export const INITIAL_ADMIN_LOGS = [
  {
    id: "log-1",
    adminId: "admin-1",
    action: "VERIFY_MEMBER",
    targetType: "User",
    targetId: "user-1",
    details: "Verified John Mwangi after reviewing national ID and farm registration document.",
    createdAt: "2026-09-01T14:20:00Z"
  },
  {
    id: "log-2",
    adminId: "admin-1",
    action: "APPROVE_LISTING",
    targetType: "Listing",
    targetId: "list-3",
    details: "Approved John Deere tractor listing from AgroTech Solutions.",
    createdAt: "2026-09-08T09:10:00Z"
  }
];
