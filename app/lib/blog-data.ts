export type BlogPost = {
  id: number;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "perfect-duffle-guide-2024",
    date: "October 24, 2023",
    category: "Fashion & Lifestyle",
    title: "The Perfect Guide To Pick Your Perfect Duffle In 2024",
    excerpt:
      "A practical packing and styling guide for choosing a travel bag that fits weekend trips, daily carry, and a polished wardrobe.",
    image: "/images/blog/blog-image1.jpg",
  },
  {
    id: 2,
    slug: "products-with-purpose-clean-denim",
    date: "October 24, 2023",
    category: "Denim Industry",
    title: "Products With Purpose: What Clean Denim Really Means",
    excerpt:
      "A closer look at how denim care, sourcing, and finishing influence the lifespan and footprint of everyday essentials.",
    image: "/images/blog/blog-image-2.jpg",
  },
  {
    id: 3,
    slug: "gots-sustainability-explained",
    date: "October 24, 2023",
    category: "Gold Style",
    title: "Gold Seal of Sustainability: GOTS, Finally Explained",
    excerpt:
      "The certification terms behind modern sustainable fashion, and what they signal about sourcing, labor, and material quality.",
    image: "/images/blog/blog-image-3.jpg",
  },
  {
    id: 4,
    slug: "made-to-order-collection-launch",
    date: "October 24, 2023",
    category: "Clothes Handmade",
    title: "First Made-To-Order Collection: Why It Matters",
    excerpt:
      "How smaller production runs reduce waste, improve fit, and create a more intentional shopping experience for premium basics.",
    image: "/images/blog/blog-image-4.jpg",
  },
  {
    id: 5,
    slug: "embracing-change-one-piece-at-a-time",
    date: "October 24, 2023",
    category: "Change Style",
    title: "What If: Embracing Change, One Piece At A Time",
    excerpt:
      "A reflection on evolving personal style through versatile garments, fewer impulse purchases, and stronger wardrobe foundations.",
    image: "/images/blog/blog-image5.jpg",
  },
  {
    id: 6,
    slug: "journey-towards-conscious-fashion",
    date: "October 24, 2023",
    category: "Design Fashion",
    title: "Our Journey Towards A More Conscious Fashion Industry",
    excerpt:
      "Why durable fabrics, timeless silhouettes, and transparent design decisions remain central to the next era of fashion retail.",
    image: "/images/blog/blog-image-6.jpg",
  },
];
