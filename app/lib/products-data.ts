export type ProductCategory = "All" | "Women" | "Men" | "Accessories";
export type ProductType = "dress" | "shirt" | "accessory";
export type ProductSortOption = "featured" | "price-asc" | "price-desc" | "rating";

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: Exclude<ProductCategory, "All">;
  productType: ProductType;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  summary: string;
  description: string;
  features: string[];
  gallery: string[];
  availableSizes: string[];
  availableColors: string[];
  hasCountdown?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "floral-summer-dress",
    name: "Floral Summer Dress",
    category: "Women",
    productType: "dress",
    price: 75,
    originalPrice: 150,
    discount: 50,
    rating: 4.8,
    image: "/images/women/woman-dress-1.jpg",
    summary: "A light, flattering day dress with a breezy floral print.",
    description:
      "Designed for warm-weather dressing, this floral silhouette pairs an easy drape with polished finishing details for all-day wear.",
    features: [
      "Breathable cotton blend with a soft hand feel",
      "Relaxed silhouette with a defined waist",
      "Versatile enough for daytime events or vacation styling",
    ],
    gallery: [
      "/images/women/woman-dress-1.jpg",
      "/images/women/woman-dress-3.jpg",
      "/images/women/woman-dress-4.jpg",
    ],
    availableSizes: ["XS", "S", "M", "L"],
    availableColors: ["Rose", "Ivory", "Sand"],
    hasCountdown: true,
  },
  {
    id: 2,
    slug: "boho-chic-gown",
    name: "Boho Chic Gown",
    category: "Women",
    productType: "dress",
    price: 165,
    originalPrice: 220,
    discount: 25,
    rating: 4.9,
    image: "/images/women/woman-dress-3.jpg",
    summary: "A flowing statement gown with elevated evening character.",
    description:
      "This occasion-ready gown balances texture, movement, and structure for a sophisticated look that still feels effortless.",
    features: [
      "Fluid full-length skirt with soft volume",
      "Elegant neckline suited for formal styling",
      "Comfortable inner lining for extended wear",
    ],
    gallery: [
      "/images/women/woman-dress-3.jpg",
      "/images/women/woman-dress-1.jpg",
      "/images/women/woman-dress-4.jpg",
    ],
    availableSizes: ["S", "M", "L"],
    availableColors: ["Gold", "Cocoa", "Olive"],
  },
  {
    id: 3,
    slug: "evening-silk-dress",
    name: "Evening Silk Dress",
    category: "Women",
    productType: "dress",
    price: 90,
    originalPrice: 100,
    discount: 10,
    rating: 4.8,
    image: "/images/women/woman-dress-4.jpg",
    summary: "A refined silk-touch dress for elevated evening looks.",
    description:
      "A sleek evening dress finished with a subtle sheen and a graceful silhouette that works for celebrations and formal dinners alike.",
    features: [
      "Smooth silk-touch fabrication",
      "Structured shoulders with fluid drape",
      "Easy to layer with outerwear and accessories",
    ],
    gallery: [
      "/images/women/woman-dress-4.jpg",
      "/images/women/woman-dress2.jpg",
      "/images/women/woman-dress-3.jpg",
    ],
    availableSizes: ["XS", "S", "M", "L"],
    availableColors: ["Midnight", "Pearl"],
  },
  {
    id: 4,
    slug: "casual-day-dress",
    name: "Casual Day Dress",
    category: "Women",
    productType: "dress",
    price: 75,
    originalPrice: 150,
    discount: 25,
    rating: 4.7,
    image: "/images/women/woman-dress2.jpg",
    summary: "An easy wardrobe staple for daily wear and travel.",
    description:
      "Made for repeat styling, this everyday dress combines comfort, movement, and a clean silhouette that layers well through the seasons.",
    features: [
      "Soft stretch fabric for comfort",
      "Minimal silhouette for easy styling",
      "Machine washable for simple care",
    ],
    gallery: [
      "/images/women/woman-dress2.jpg",
      "/images/women/woman-dress-1.jpg",
      "/images/women/woman-dress-4.jpg",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: ["Stone", "Black"],
  },
  {
    id: 5,
    slug: "urban-streetwear-set",
    name: "Urban Streetwear Set",
    category: "Men",
    productType: "shirt",
    price: 120,
    originalPrice: 180,
    discount: 33,
    rating: 4.9,
    image: "/images/men/male-outfit-1.jpg",
    summary: "A layered streetwear edit with sharp casual structure.",
    description:
      "This coordinated outfit is built around premium basics, clean proportion, and comfortable fabrics for an elevated off-duty look.",
    features: [
      "Layer-friendly fit with contemporary proportions",
      "Durable fabric suited to everyday wear",
      "Easy to split into separate looks",
    ],
    gallery: [
      "/images/men/male-outfit-1.jpg",
      "/images/men/male-outfit-2.jpg",
      "/images/men/male-outfit-3.jpg",
    ],
    availableSizes: ["S", "M", "L", "XL"],
    availableColors: ["Graphite", "Khaki"],
  },
  {
    id: 6,
    slug: "classic-casual-look",
    name: "Classic Casual Look",
    category: "Men",
    productType: "shirt",
    price: 45,
    originalPrice: 75,
    discount: 40,
    rating: 4.6,
    image: "/images/men/male-outfit-2.jpg",
    summary: "A clean casual look designed for repeat weekly wear.",
    description:
      "A polished off-duty staple with easy layering potential, grounded in timeless tones and comfortable tailoring.",
    features: [
      "Soft-touch fabric blend",
      "Straightforward styling for work or weekends",
      "Lightweight enough for year-round layering",
    ],
    gallery: [
      "/images/men/male-outfit-2.jpg",
      "/images/men/male-outfit-1.jpg",
      "/images/men/male-outfit-3.jpg",
    ],
    availableSizes: ["M", "L", "XL"],
    availableColors: ["Sand", "Navy"],
  },
  {
    id: 7,
    slug: "premium-autumn-outfit",
    name: "Premium Autumn Outfit",
    category: "Men",
    productType: "shirt",
    price: 185,
    originalPrice: 280,
    discount: 34,
    rating: 4.8,
    image: "/images/men/male-outfit-3.jpg",
    summary: "A premium layered set tuned for cooler weather.",
    description:
      "This autumn-ready combination offers warmth, structure, and a refined neutral palette suited to seasonal city dressing.",
    features: [
      "Textured fabrics for seasonal depth",
      "Relaxed layering pieces with clean finish",
      "Premium construction for long-term use",
    ],
    gallery: [
      "/images/men/male-outfit-3.jpg",
      "/images/men/male-outfits-4.jpg",
      "/images/men/male-outfit-1.jpg",
    ],
    availableSizes: ["S", "M", "L", "XL"],
    availableColors: ["Olive", "Charcoal"],
  },
  {
    id: 8,
    slug: "modern-minimalist-style",
    name: "Modern Minimalist Style",
    category: "Men",
    productType: "shirt",
    price: 65,
    originalPrice: 95,
    discount: 32,
    rating: 4.7,
    image: "/images/men/male-outfits-4.jpg",
    summary: "A minimal wardrobe formula anchored by sharp essentials.",
    description:
      "Built for understated dressing, this outfit focuses on fit, texture, and a muted palette that works across occasions.",
    features: [
      "Modern silhouette with relaxed confidence",
      "Neutral palette for easy restyling",
      "Comfort-focused construction",
    ],
    gallery: [
      "/images/men/male-outfits-4.jpg",
      "/images/men/male-outfit-2.jpg",
      "/images/men/male-outfit-3.jpg",
    ],
    availableSizes: ["M", "L", "XL"],
    availableColors: ["Slate", "Cream"],
  },
  {
    id: 9,
    slug: "leather-designer-wallet",
    name: "Leather Designer Wallet",
    category: "Accessories",
    productType: "accessory",
    price: 35,
    originalPrice: 60,
    discount: 42,
    rating: 4.5,
    image: "/images/accessories/wallet-image-1.jpg",
    summary: "A compact leather wallet with polished finishing details.",
    description:
      "A functional daily essential with thoughtful compartments, durable construction, and a refined profile that slips easily into any bag.",
    features: [
      "Compact bi-fold construction",
      "Premium finish with durable stitching",
      "Fits daily essentials without added bulk",
    ],
    gallery: [
      "/images/accessories/wallet-image-1.jpg",
      "/images/accessories/jewelry-image-1.jpg",
      "/images/accessories/jewelry-image-2.jpg",
    ],
    availableSizes: ["One Size"],
    availableColors: ["Walnut", "Black"],
  },
  {
    id: 10,
    slug: "golden-pendant-necklace",
    name: "Golden Pendant Necklace",
    category: "Accessories",
    productType: "accessory",
    price: 35,
    originalPrice: 50,
    discount: 30,
    rating: 4.6,
    image: "/images/accessories/jewelry-image-1.jpg",
    summary: "A delicate pendant necklace for everyday layering.",
    description:
      "This lightweight necklace adds subtle polish to basics and occasion looks with a simple silhouette and warm metallic finish.",
    features: [
      "Lightweight chain for comfortable wear",
      "Minimal pendant suited to layering",
      "Classic finish with timeless appeal",
    ],
    gallery: [
      "/images/accessories/jewelry-image-1.jpg",
      "/images/accessories/jewelry-image-2.jpg",
      "/images/accessories/wallet-image-1.jpg",
    ],
    availableSizes: ["One Size"],
    availableColors: ["Gold"],
  },
  {
    id: 11,
    slug: "starlight-silver-ring",
    name: "Starlight Silver Ring",
    category: "Accessories",
    productType: "accessory",
    price: 85,
    originalPrice: 140,
    discount: 39,
    rating: 4.8,
    image: "/images/accessories/jewelry-image-2.jpg",
    summary: "A sculpted silver-tone ring with standout polish.",
    description:
      "Made to elevate minimal styling, this ring balances a clean silhouette with a luminous finish for daily wear or gifting.",
    features: [
      "Smooth polished finish",
      "Comfortable everyday profile",
      "Pairs well with mixed-metal styling",
    ],
    gallery: [
      "/images/accessories/jewelry-image-2.jpg",
      "/images/accessories/jewelry-image-1.jpg",
      "/images/accessories/heel-image-1.jpg",
    ],
    availableSizes: ["6", "7", "8"],
    availableColors: ["Silver"],
  },
  {
    id: 12,
    slug: "classic-high-heels",
    name: "Classic High Heels",
    category: "Accessories",
    productType: "accessory",
    price: 95,
    originalPrice: 150,
    discount: 37,
    rating: 4.9,
    image: "/images/accessories/heel-image-1.jpg",
    summary: "A clean, occasion-ready heel with timeless shape.",
    description:
      "Designed to pair with dresses, tailoring, and evening edits, these heels combine classic lines with dependable comfort.",
    features: [
      "Elegant heel height for versatile wear",
      "Streamlined shape for formal and smart-casual styling",
      "Cushioned footbed for added comfort",
    ],
    gallery: [
      "/images/accessories/heel-image-1.jpg",
      "/images/accessories/jewelry-image-1.jpg",
      "/images/accessories/wallet-image-1.jpg",
    ],
    availableSizes: ["36", "37", "38", "39", "40"],
    availableColors: ["Black", "Champagne"],
  },
];

export const categories: ProductCategory[] = ["All", "Women", "Men", "Accessories"];
export const featuredProducts = products.slice(0, 8);

export function findProductById(id: number) {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);
}

export function filterProducts(
  items: Product[],
  selectedCategories: ProductCategory[],
  priceRange: [number, number],
) {
  return items.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);

    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

    return categoryMatch && priceMatch;
  });
}

export function sortProducts(items: Product[], sortBy: ProductSortOption) {
  const sorted = [...items];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted.sort(
        (a, b) => Number(Boolean(b.hasCountdown)) - Number(Boolean(a.hasCountdown)),
      );
  }
}
