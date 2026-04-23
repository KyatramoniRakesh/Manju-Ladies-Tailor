export const WHATSAPP_NUMBER = "917893767001";
export const SHOP_NAME = "Manju Ladies Tailors";
export const SHOP_ADDRESS = "Manju ladies tailor KP street, Jadcherla, Mahabubnagar, Telangana 509406";

const fabricA = "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200";
const fabricB = "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1200";
const fabricC = "https://images.unsplash.com/photo-1593032465171-8f8aa0eac5c8?q=80&w=1200";
const fabricD = "https://images.unsplash.com/photo-1618244972963-dbadf7420f0d?q=80&w=1200";
const fabricE = "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200";
const fabricF = "https://images.unsplash.com/photo-1589363460779-cd717d2ed8fa?q=80&w=1200";
const fabricG = "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200";
const fabricH = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200";
const fabricI = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200";

export const embroideryService = {
  id: "embroidery",
  name: "Embroidery Designs",
  shortName: "Embroidery",
  category: "Design Selection",
  description: "Choose neck, sleeve, back, border, butta, bridal maggam, stone, thread, or zari designs before stitching.",
  image: fabricA,
  highlights: ["Design catalog", "Easy categories", "WhatsApp enquiry"],
};

export const serviceList = [
  {
    id: "blouse",
    name: "Blouses",
    shortName: "Blouse",
    category: "Stitching",
    description: "Finished blouse examples after customers choose an embroidery design.",
    image: fabricB,
    highlights: ["Designer necks", "Embroidery fitting", "Lining and padding"],
  },
  {
    id: "dress",
    name: "Dresses",
    shortName: "Dress",
    category: "Stitching",
    description: "Kurtis, salwar suits, party dresses, and everyday outfits stitched to fit.",
    image: fabricC,
    highlights: ["Kurtis", "Salwar suits", "Party wear"],
  },
  {
    id: "lehenga",
    name: "Lehengas",
    shortName: "Lehenga",
    category: "Occasion Wear",
    description: "Lehenga blouse fitting, skirt finishing, dupatta work, and occasion wear support.",
    image: fabricD,
    highlights: ["Blouse fitting", "Skirt finish", "Dupatta work"],
  },
  {
    id: "alterations",
    name: "Alterations",
    shortName: "Alterations",
    category: "Fitting",
    description: "Fit corrections, resizing, sleeve changes, hooks, lining, and finishing updates.",
    image: fabricI,
    highlights: ["Resize", "Sleeve changes", "Fit correction"],
  },
];

export const uploadServiceList = [
  embroideryService,
  ...serviceList.map(service => ({
    id: service.id,
    name: service.name,
  })),
];

export const embroideryCategories = [
  {
    id: "neck",
    name: "Neck Designs",
    description: "Front neck patterns for blouses and kurtis.",
    image: fabricF,
    keywords: ["neck", "front neck", "zardosi"],
  },
  {
    id: "sleeves",
    name: "Sleeve Designs",
    description: "Sleeve borders and heavy arm work.",
    image: fabricD,
    keywords: ["sleeve", "sleeves", "arm"],
  },
  {
    id: "back",
    name: "Back Designs",
    description: "Stylish blouse back embroidery patterns.",
    image: fabricC,
    keywords: ["back", "back design", "tie"],
  },
  {
    id: "border",
    name: "Border Designs",
    description: "Borders for neck, sleeves, saree edges, and panels.",
    image: fabricE,
    keywords: ["border", "edge", "saree"],
  },
  {
    id: "butta",
    name: "Butta Designs",
    description: "Small repeated motifs for fabric and blouses.",
    image: fabricH,
    keywords: ["butta", "motif", "small"],
  },
  {
    id: "bridal-maggam",
    name: "Bridal Maggam",
    description: "Heavy bridal maggam work for weddings.",
    image: fabricA,
    keywords: ["bridal", "maggam", "heavy"],
  },
  {
    id: "stone",
    name: "Stone Work",
    description: "Stone and bead highlights for festive outfits.",
    image: fabricG,
    keywords: ["stone", "bead", "party"],
  },
  {
    id: "thread",
    name: "Thread Work",
    description: "Simple thread embroidery for light designs.",
    image: fabricI,
    keywords: ["thread", "simple", "light"],
  },
  {
    id: "zardosi",
    name: "Zardosi & Zari",
    description: "Rich zari and zardosi detailing.",
    image: fabricF,
    keywords: ["zardosi", "zari", "premium"],
  },
];

export const serviceCategoryOptions = {
  embroidery: embroideryCategories.map(category => category.name),
  blouse: ["Bridal Blouse", "Daily Wear", "Designer Blouse", "Sleeve Work Blouse"],
  dress: ["Kurti", "Salwar", "Party Wear", "Frock", "Gown"],
  lehenga: ["Lehenga Blouse", "Dupatta Work", "Skirt Finish", "Full Lehenga Set"],
  alterations: ["Fitting", "Sleeves", "Length Alteration", "Hooks & Zip", "Lining Work"],
};

export const servicesData = {
  embroidery: [
    {
      id: "emb-neck-1",
      name: "Zardosi Leaf Neck Design",
      service: "embroidery",
      category: "Neck Designs",
      embroideryCategory: "neck",
      tags: ["neck", "zardosi", "premium"],
      images: [fabricF],
    },
    {
      id: "emb-neck-2",
      name: "Simple Thread Neck Design",
      service: "embroidery",
      category: "Neck Designs",
      embroideryCategory: "neck",
      tags: ["neck", "thread", "simple"],
      images: [fabricC],
    },
    {
      id: "emb-sleeves-1",
      name: "Heavy Maggam Sleeve Work",
      service: "embroidery",
      category: "Sleeve Designs",
      embroideryCategory: "sleeves",
      tags: ["sleeve", "maggam", "heavy"],
      images: [fabricD],
    },
    {
      id: "emb-sleeves-2",
      name: "Stone Sleeve Border",
      service: "embroidery",
      category: "Sleeve Designs",
      embroideryCategory: "sleeves",
      tags: ["sleeve", "stone", "border"],
      images: [fabricE],
    },
    {
      id: "emb-back-1",
      name: "Floral Back Design",
      service: "embroidery",
      category: "Back Designs",
      embroideryCategory: "back",
      tags: ["back", "floral", "party"],
      images: [fabricC],
    },
    {
      id: "emb-back-2",
      name: "Tie Back Embroidery Pattern",
      service: "embroidery",
      category: "Back Designs",
      embroideryCategory: "back",
      tags: ["back", "tie", "designer"],
      images: [fabricB],
    },
    {
      id: "emb-border-1",
      name: "Stone Work Border",
      service: "embroidery",
      category: "Border Designs",
      embroideryCategory: "border",
      tags: ["border", "stone", "festive"],
      images: [fabricE],
    },
    {
      id: "emb-border-2",
      name: "Zari Border Pattern",
      service: "embroidery",
      category: "Border Designs",
      embroideryCategory: "border",
      tags: ["border", "zari", "premium"],
      images: [fabricF],
    },
    {
      id: "emb-butta-1",
      name: "Small Floral Butta",
      service: "embroidery",
      category: "Butta Designs",
      embroideryCategory: "butta",
      tags: ["butta", "floral", "simple"],
      images: [fabricH],
    },
    {
      id: "emb-butta-2",
      name: "Round Motif Butta",
      service: "embroidery",
      category: "Butta Designs",
      embroideryCategory: "butta",
      tags: ["butta", "motif", "kurti"],
      images: [fabricI],
    },
    {
      id: "emb-bridal-1",
      name: "Bridal Maggam Blouse Work",
      service: "embroidery",
      category: "Bridal Maggam",
      embroideryCategory: "bridal-maggam",
      tags: ["bridal", "maggam", "heavy"],
      images: [fabricA, fabricD],
    },
    {
      id: "emb-bridal-2",
      name: "Wedding Zari Maggam Design",
      service: "embroidery",
      category: "Bridal Maggam",
      embroideryCategory: "bridal-maggam",
      tags: ["bridal", "zari", "wedding"],
      images: [fabricD],
    },
    {
      id: "emb-stone-1",
      name: "Stone Highlight Design",
      service: "embroidery",
      category: "Stone Work",
      embroideryCategory: "stone",
      tags: ["stone", "party", "highlight"],
      images: [fabricG],
    },
    {
      id: "emb-stone-2",
      name: "Bead Stone Neckline",
      service: "embroidery",
      category: "Stone Work",
      embroideryCategory: "stone",
      tags: ["stone", "bead", "neck"],
      images: [fabricE],
    },
    {
      id: "emb-thread-1",
      name: "Light Thread Work",
      service: "embroidery",
      category: "Thread Work",
      embroideryCategory: "thread",
      tags: ["thread", "light", "daily"],
      images: [fabricI],
    },
    {
      id: "emb-thread-2",
      name: "Simple Floral Thread Work",
      service: "embroidery",
      category: "Thread Work",
      embroideryCategory: "thread",
      tags: ["thread", "floral", "simple"],
      images: [fabricC],
    },
    {
      id: "emb-zardosi-1",
      name: "Premium Zardosi Neckline",
      service: "embroidery",
      category: "Zardosi & Zari",
      embroideryCategory: "zardosi",
      tags: ["zardosi", "neck", "premium"],
      images: [fabricF],
    },
    {
      id: "emb-zardosi-2",
      name: "Zari Leaf Border",
      service: "embroidery",
      category: "Zardosi & Zari",
      embroideryCategory: "zardosi",
      tags: ["zari", "leaf", "border"],
      images: [fabricA],
    },
  ],
  blouse: [
    {
      id: "blouse-1",
      name: "Bridal Embroidery Blouse",
      service: "blouse",
      category: "Bridal Blouse",
      tags: ["stitched", "bridal", "maggam"],
      images: [fabricB, fabricA],
    },
    {
      id: "blouse-2",
      name: "Simple Daily Wear Blouse",
      service: "blouse",
      category: "Daily Wear",
      tags: ["stitched", "simple", "cotton"],
      images: [fabricI],
    },
    {
      id: "blouse-3",
      name: "Designer Back Blouse",
      service: "blouse",
      category: "Designer Blouse",
      tags: ["stitched", "back design", "party"],
      images: [fabricC],
    },
    {
      id: "blouse-4",
      name: "Sleeve Work Blouse",
      service: "blouse",
      category: "Designer Blouse",
      tags: ["stitched", "sleeve", "embroidery"],
      images: [fabricD],
    },
  ],
  dress: [
    {
      id: "dress-1",
      name: "Straight Cut Kurti",
      service: "dress",
      category: "Kurti",
      tags: ["daily wear", "simple", "cotton"],
      images: [fabricH],
    },
    {
      id: "dress-2",
      name: "Party Wear Dress",
      service: "dress",
      category: "Party Wear",
      tags: ["party", "designer", "fancy"],
      images: [fabricG],
    },
    {
      id: "dress-3",
      name: "Salwar Suit Stitching",
      service: "dress",
      category: "Salwar",
      tags: ["salwar", "comfortable", "classic"],
      images: [fabricE],
    },
  ],
  lehenga: [
    {
      id: "lehenga-1",
      name: "Lehenga Blouse Fitting",
      service: "lehenga",
      category: "Lehenga Blouse",
      tags: ["lehenga", "blouse", "fitting"],
      images: [fabricD],
    },
    {
      id: "lehenga-2",
      name: "Dupatta Border Work",
      service: "lehenga",
      category: "Dupatta Work",
      tags: ["dupatta", "border", "occasion"],
      images: [fabricE],
    },
    {
      id: "lehenga-3",
      name: "Lehenga Skirt Finishing",
      service: "lehenga",
      category: "Skirt Finish",
      tags: ["lehenga", "skirt", "finish"],
      images: [fabricG],
    },
  ],
  alterations: [
    {
      id: "alterations-1",
      name: "Blouse Fit Correction",
      service: "alterations",
      category: "Fitting",
      tags: ["resize", "fitting", "quick"],
      images: [fabricI],
    },
    {
      id: "alterations-2",
      name: "Sleeve Length Alteration",
      service: "alterations",
      category: "Sleeves",
      tags: ["sleeves", "alteration", "finish"],
      images: [fabricC],
    },
  ],
};

export const allDummyDesigns = Object.values(servicesData).flat();

export const featuredDesignIds = [
  "emb-neck-1",
  "emb-sleeves-1",
  "emb-back-1",
  "emb-border-1",
  "emb-bridal-1",
  "emb-stone-1",
];

export const featuredDesigns = featuredDesignIds
  .map(id => allDummyDesigns.find(design => design.id === id))
  .filter(Boolean);

export const getServiceById = (id) =>
  id === "embroidery" ? embroideryService : serviceList.find(service => service.id === id);

export const getEmbroideryCategoryById = (id) =>
  embroideryCategories.find(category => category.id === id);
