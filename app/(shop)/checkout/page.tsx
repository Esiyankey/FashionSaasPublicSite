import { CheckoutPageClient } from '@/app/components/cart/CheckoutPageClient';
import { createMetadata } from '@/app/lib/site';

export const metadata = createMetadata({
  title: 'Checkout',
  description: 'Complete shipping and payment details to place your order.',
  path: '/checkout',
  keywords: ['fashion checkout', 'shipping address', 'payment'],
});

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
