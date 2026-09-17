import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'lavender-french-elixir',
    name: 'French Lavender Botanical Elixir',
    latinName: 'Lavandula Angustifolia',
    category: 'essential',
    tagline: 'Deep tranquility & serene night recovery',
    description: 'Harvested at peak bloom in high-altitude Provence fields. Our 100% pure steam-distilled lavender oil releases rich floral honey notes that calm the central nervous system, promote restful REM sleep, and soothe stressed skin.',
    benefits: ['Deep Sleep Support', 'Stress Relief', 'Skin Soothing', 'Aromatherapy'],
    extractionMethod: 'Steam Distilled from Organic Blossoms',
    origin: 'Provence, France',
    volumes: [
      { size: '15ml', price: 34 },
      { size: '30ml', price: 58 },
      { size: '100ml', price: 140 }
    ],
    rating: 4.9,
    reviewCount: 128,
    image: '/assets/lavender.png',
    isOrganic: true,
    isBestSeller: true,
    scentNotes: {
      top: 'Wild French Lavender & Sweet Violet',
      heart: 'Honeyed Herbal Blossom',
      base: 'Warm Cedarwood Amber'
    },
    pairings: ['Eucalyptus Radiance Oil', 'Golden Olive Nectar'],
    reviews: [
      {
        id: 'r1',
        author: 'Elena R.',
        rating: 5,
        date: '2026-06-14',
        comment: 'The scent purity is unmatched! Just 3 drops in my diffuser transforms my entire bedroom into a serene French spa.',
        verified: true
      },
      {
        id: 'r2',
        author: 'Marcus Vance',
        rating: 5,
        date: '2026-05-28',
        comment: 'Absorbs so gently when blended with carrier oil for nighttime facial massage. Absolute staple.',
        verified: true
      }
    ]
  },
  {
    id: 'golden-estate-olive-nectar',
    name: 'Reserve Extra Virgin Olive Nectar',
    latinName: 'Olea Europaea Harvest 2026',
    category: 'culinary',
    tagline: 'Single-estate early harvest with intense polyphenols',
    description: 'First cold-press extraction of single-origin Koroneiki olives within 4 hours of twilight harvest in Crete. Boasts a peppery, fresh-cut grass aroma with rich antioxidant polyphenols (over 650 mg/kg) that elevate fine dining and body nourishment.',
    benefits: ['High Antioxidant Polyphenols', 'Cardiovascular Vitality', 'Artisanal Flavor Profile', 'Unfiltered Cold Press'],
    extractionMethod: 'First Cold Mechanical Press (< 21°C)',
    origin: 'Crete, Greece',
    volumes: [
      { size: '250ml', price: 42 },
      { size: '500ml', price: 74 },
      { size: '1000ml', price: 135 }
    ],
    rating: 5.0,
    reviewCount: 94,
    image: '/assets/olive.png',
    isOrganic: true,
    isBestSeller: true,
    scentNotes: {
      top: 'Fresh Cut Wheatgrass & Green Apple',
      heart: 'Artichoke & Wild Herb',
      base: 'Peppery Gold Finish'
    },
    pairings: ['French Lavender Botanical Elixir'],
    reviews: [
      {
        id: 'r3',
        author: 'Chef Antoine D.',
        rating: 5,
        date: '2026-07-02',
        comment: 'Sensational finish for fresh burrata, carpaccio, and grilled stone fruit. The peppery throat kick confirms its high polyphenol density.',
        verified: true
      }
    ]
  },
  {
    id: 'radiance-rosehip-facial-serum',
    name: 'Radiance Golden Rosehip Serum',
    latinName: 'Rosa Canina Seed Elixir',
    category: 'skincare',
    tagline: 'Pure liquid gold for cell renewal & youthful glow',
    description: 'Unrefined, cold-pressed rosehip seed oil infused with active Vitamin A (Retinol precursors) and Essential Fatty Acids 3, 6 & 9. Restores skin elasticity, reduces hyperpigmentation, and yields a velvet glass-skin luminescence.',
    benefits: ['Glass Skin Luminescence', 'Cellular Regeneration', 'Hyperpigmentation Eraser', 'Non-Comedogenic Hydration'],
    extractionMethod: 'Supercritical CO2 Cold Extraction',
    origin: 'Patagonia, Chile',
    volumes: [
      { size: '30ml', price: 68 },
      { size: '50ml', price: 98 }
    ],
    rating: 4.8,
    reviewCount: 210,
    image: '/assets/rosehip.png',
    isOrganic: true,
    isBestSeller: true,
    scentNotes: {
      top: 'Crushed Wild Rose Petals',
      heart: 'Earthy Nut Kernel',
      base: 'Warm Botanical Dew'
    },
    pairings: ['French Lavender Botanical Elixir'],
    reviews: [
      {
        id: 'r4',
        author: 'Sophia Chen',
        rating: 5,
        date: '2026-07-19',
        comment: 'Faded my acne scarring in just 3 weeks! Non-greasy and leaves an unbelievable golden radiance.',
        verified: true
      }
    ]
  },
  {
    id: 'eucalyptus-clarity-oil',
    name: 'Eucalyptus Clarity & Air Concentrate',
    latinName: 'Eucalyptus Globulus Leaf',
    category: 'aromatherapy',
    tagline: 'Invigorating respiratory revival & crisp focus',
    description: 'Cold-steam distilled from Tasmanian blue gum leaves. Rich in cineole, this potent botanical clearing elixir purifies ambient indoor air, unlocks deep respiratory vitality, and instantly clears mental brain fog.',
    benefits: ['Respiratory Clarity', 'Air Purification', 'Mental Alertness', 'Muscle Relief Blend'],
    extractionMethod: 'Artisanal Steam Distillation',
    origin: 'Tasmania, Australia',
    volumes: [
      { size: '15ml', price: 28 },
      { size: '30ml', price: 48 },
      { size: '100ml', price: 110 }
    ],
    rating: 4.9,
    reviewCount: 86,
    image: '/assets/eucalyptus.png',
    isOrganic: true,
    isNew: true,
    scentNotes: {
      top: 'Crisp Mint & Camphor',
      heart: 'Crushed Pine Needle',
      base: 'Cool Birch Bark'
    },
    pairings: ['French Lavender Botanical Elixir'],
    reviews: [
      {
        id: 'r5',
        author: 'David K.',
        rating: 5,
        date: '2026-06-29',
        comment: 'Incredible morning focus ritual in my home office diffuser!',
        verified: true
      }
    ]
  },
  {
    id: 'argan-moroccan-gold-oil',
    name: 'Moroccan Royal Argan Nectar',
    latinName: 'Argania Spinosa Kernel',
    category: 'skincare',
    tagline: 'Nourishing silk oil for hair, face & cuticle renewal',
    description: 'Hand-harvested by Berber women’s cooperatives in the UNESCO biosphere of Southwest Morocco. Rich in Tocopherols (Vitamin E) and Squalane, this golden elixir repairs damaged hair strands and silken skin moisture barriers.',
    benefits: ['Silken Hair Tresses', 'Deep Moisture Lock', 'Anti-Frizz Shine', 'Lip & Cuticle Care'],
    extractionMethod: 'Hand-Pressed Cold Extraction',
    origin: 'Essaouira, Morocco',
    volumes: [
      { size: '50ml', price: 62 },
      { size: '100ml', price: 105 }
    ],
    rating: 4.9,
    reviewCount: 154,
    image: '/assets/rosehip.png', // Reusing rosehip aesthetic amber bottle
    isOrganic: true,
    scentNotes: {
      top: 'Toasted Argan Nut',
      heart: 'Subtle Honey Gold',
      base: 'Earthy Warmth'
    },
    reviews: []
  },
  {
    id: 'rosemary-hair-growth-essence',
    name: 'Rosemary Scalp & Follicle Tonic',
    latinName: 'Rosmarinus Officinalis',
    category: 'essential',
    tagline: 'Stimulates scalp micro-circulation & thick hair density',
    description: 'Potent steam-extracted Mediterranean rosemary combined with biotin-infused botanical carriers. Proven to energize hair roots, promote scalp circulation, and reverse hair thinning naturally.',
    benefits: ['Scalp Circulation', 'Hair Thickness Support', 'Follicle Energizer', 'Dandruff Prevention'],
    extractionMethod: 'Steam Distillation',
    origin: 'Tuscany, Italy',
    volumes: [
      { size: '30ml', price: 38 },
      { size: '60ml', price: 65 }
    ],
    rating: 4.7,
    reviewCount: 312,
    image: '/assets/lavender.png', // Dark amber dropper style
    isOrganic: true,
    isBestSeller: true,
    scentNotes: {
      top: 'Herbal Rosemary Leaf',
      heart: 'Fresh Sage',
      base: 'Pine Resins'
    },
    reviews: []
  }
];
