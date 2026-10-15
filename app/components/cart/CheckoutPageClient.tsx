'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import { useCart } from './CartProvider';
import { useCreateOrder } from '@/hooks/mutations/useCreateOrder';
import { StatusBadge } from '@/components/shared/StatusBadge';
import type { ShippingAddress } from '@/types/order';
import { ApiError } from '@/services/http-client';
import { formatCurrency } from '@/lib/currency';

const emptyAddress: ShippingAddress = {
  fullName: '', email: '', street: '', apartment: '', city: '', state: '', zipCode: '', phone: '', country: '',
};

const paymentMethods = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'cod', label: 'COD', icon: Wallet },
] as const;

export function CheckoutPageClient() {
  const { items, subtotal, shipping, tax, total, currency, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(emptyAddress);
  const createOrderMutation = useCreateOrder();

  const handlePlaceOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrderMutation.mutate(
      { items, shippingAddress, paymentMethod: 'cod' },
      { onSuccess: () => clearCart() },
    );
  };

  if (createOrderMutation.isSuccess) {
    const order = createOrderMutation.data;

    return (
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Order Confirmed</p>
        <h1 className="mt-4 text-4xl font-light">Your order is on its way.</h1>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-foreground/50">Order {order.id}</span>
          <StatusBadge status={order.status} />
        </div>
        <p className="mt-4 text-lg font-semibold">{formatCurrency(order.total, order.currency)}</p>
        <p className="mt-4 max-w-2xl bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-700">
          Order placed. Payment is set to cash on delivery; no online payment was collected.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Continue Shopping
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Back to Cart
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Checkout</p>
        <h1 className="mt-4 text-4xl font-light">Your cart is empty.</h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-foreground/65">Add at least one product before moving through checkout.</p>
        <Link href="/shop" className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"><ArrowLeft className="size-4" />Back to Shop</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="mb-10 flex flex-col gap-4 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-900">Checkout</p>
          <h1 className="mt-3 text-4xl font-light">Shipping & payment.</h1>
        </div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/65 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Cart
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <div className="border border-border bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-light">Shipping Address</h2>
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="mt-6 grid gap-4 md:grid-cols-2">
              {([['fullName', 'Full Name'], ['email', 'Email Address'], ['street', 'Street Address'], ['apartment', 'Apartment, suite, etc.'], ['city', 'City'], ['state', 'State'], ['zipCode', 'Zip Code'], ['phone', 'Phone Number'], ['country', 'Country']] as const).map(([key, label]) => (
                <input key={key} name={key} type={key === 'email' ? 'email' : 'text'} required={key !== 'apartment'} value={shippingAddress[key] ?? ''} onChange={(event) => setShippingAddress((current) => ({ ...current, [key]: event.target.value }))} className="border border-border px-4 py-3 outline-none focus:border-primary" placeholder={label} />
              ))}
            </form>
          </div>

          <div className="border border-border bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-light">Payment Method</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const selected = method.id === 'cod';
                return <button key={method.id} type="button" disabled={!selected} aria-pressed={selected}
                  className={`border px-4 py-5 text-left transition-all ${selected ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-border bg-white text-slate-400'}`}>
                  <Icon className="size-5" />
                  <p className="mt-4 text-sm font-semibold">{method.label}</p>
                </button>;
              })}
            </div>
            <p className="mt-4 text-sm text-foreground/70">Cash on delivery. Online payment is not configured for this store.</p>
          </div>
        </div>

        <aside className="h-fit border border-border bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-light">Order Summary</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-4 bg-secondary/65 p-3">
                <div className="relative size-16 overflow-hidden bg-white">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-foreground/60">
                    {item.quantity} x {formatCurrency(item.price, currency)}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity, currency)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Subtotal</span>
              <span>{formatCurrency(subtotal, currency)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping, currency)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Tax</span>
              <span>{formatCurrency(tax, currency)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4 text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total, currency)}</span>
            </div>
            <p className="text-xs text-foreground/60">Final shipping, tax, and total are calculated by the store when you place the order.</p>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={createOrderMutation.isPending}
            className="mt-8 w-full bg-[linear-gradient(135deg,#4f46e5,#2563eb)] px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createOrderMutation.isPending ? 'Placing Order...' : 'Place Order'}
          </button>
          {createOrderMutation.error && <p role="alert" className="mt-3 text-sm text-red-700">{createOrderMutation.error instanceof ApiError ? createOrderMutation.error.message : 'Could not place the order. Please try again.'}</p>}

        </aside>
      </div>
    </section>
  );
}
