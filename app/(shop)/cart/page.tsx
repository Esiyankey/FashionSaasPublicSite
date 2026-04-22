import { CartPageClient } from '@/app/components/cart/CartPageClient';
import { createMetadata } from '@/app/lib/site';

export const metadata = createMetadata({
  title: 'Cart',
  description: 'Review your selected items, adjust quantities, and continue to checkout.',
  path: '/cart',
  keywords: ['fashion cart', 'shopping cart', 'checkout'],
});

export default function CartPage() {
  return <CartPageClient />;
}
