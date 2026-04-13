export interface Product {
  id: number;
  name: string;
  category: string;
  productType: 'dress' | 'shirt' |'skirt'| 'accessory';
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  hasCountdown?: boolean;
}

export const products: Product[] = [

  {
    id: 1,
    name: 'Floral Summer Dress',
    category: 'Women',
    productType: 'dress',
    price: 75,
    originalPrice: 150,
    discount: 50,
    rating: 4.8,
    image: '/images/women/woman-dress-1.jpg',
    hasCountdown: true,
  },
  {
    id: 2,
    name: 'Boho Chic Gown',
    category: 'Women',
    productType: 'dress',
    price: 165,
    originalPrice: 220,
    discount: 25,
    rating: 4.9,
    image: '/images/women/woman-dress-3.jpg',
  },
  {
    id: 3,
    name: 'Evening Silk Dress',
    category: 'Women',
    productType: 'dress',
    price: 90,
    originalPrice: 100,
    discount: 10,
    rating: 4.8,
    image: '/images/women/woman-dress-4.jpg',
  },
  {
    id: 4,
    name: 'Casual Day Dress',
    category: 'Women',
    productType: 'dress',
    price: 75,
    originalPrice: 150,
    discount: 25,
    rating: 4.7,
    image: '/images/women/woman-dress2.jpg',
  },

  // --- Men's Products (4 Items) ---
  {
    id: 5,
    name: 'Urban Streetwear Set',
    category: 'Men',
    productType: 'shirt',
    price: 120,
    originalPrice: 180,
    discount: 33,
    rating: 4.9,
    image: '/images/men/male-outfit-1.jpg',
  },
  {
    id: 6,
    name: 'Classic Casual Look',
    category: 'Men',
    productType: 'shirt',
    price: 45,
    originalPrice: 75,
    discount: 40,
    rating: 4.6,
    image: '/images/men/male-outfit-2.jpg',
  },
  {
    id: 7,
    name: 'Premium Autumn Outfit',
    category: 'Men',
    productType: 'shirt',
    price: 185,
    originalPrice: 280,
    discount: 34,
    rating: 4.8,
    image: '/images/men/male-outfit-3.jpg',
  },
  {
    id: 8,
    name: 'Modern Minimalist Style',
    category: 'Men',
    productType: 'shirt',
    price: 65,
    originalPrice: 95,
    discount: 32,
    rating: 4.7,
    image: '/images/men/male-outfits-4.jpg',
  },

  // --- Accessories Products (4 Items) ---
  {
    id: 9,
    name: 'Leather Designer Wallet',
    category: 'Accessories',
    productType: 'accessory',
    price: 35,
    originalPrice: 60,
    discount: 42,
    rating: 4.5,
    image: '/images/accessories/wallet-image-1.jpg',
  },
  {
    id: 10,
    name: 'Golden Pendant Necklace',
    category: 'Accessories',
    productType: 'accessory',
    price: 35,
    originalPrice: 50,
    discount: 30,
    rating: 4.6,
    image: '/images/accessories/jewelry-image-1.jpg',
  },
  {
    id: 11,
    name: 'Starlight Silver Ring',
    category: 'Accessories',
    productType: 'accessory',
    price: 85,
    originalPrice: 140,
    discount: 39,
    rating: 4.8,
    image: '/images/accessories/jewelry-image-2.jpg',
  },
  {
    id: 12,
    name: 'Classic High Heels',
    category: 'Accessories',
    productType: 'accessory',
    price: 95,
    originalPrice: 150,
    discount: 37,
    rating: 4.9,
    image: '/images/accessories/heel-image-1.jpg',
  },
];

export const categories = ['All', 'Women', 'Men', 'Accessories'];