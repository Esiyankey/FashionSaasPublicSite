'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import { useCart } from './CartProvider';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

const paymentMethods = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'cod', label: 'COD', icon: Wallet },
] as const;

export function CheckoutPageClient() {
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<(typeof paymentMethods)[number]['id']>('card');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const orderMessage = useMemo(
    () =>
      isOrderPlaced
        ? 'Order placed. This checkout is currently a UI flow, so no payment was processed.'
        : null,
    [isOrderPlaced],
  );

  if (isOrderPlaced) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-900">Order Confirmed</p>
        <h1 className="mt-4 text-4xl font-light">Your order is on its way.</h1>
        <p className="mt-4 max-w-2xl  -2xl bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-700">
          {orderMessage}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2  -full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Continue Shopping
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2  -full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
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
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-900">Checkout</p>
        <h1 className="mt-4 text-4xl font-light">Your cart is empty.</h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-foreground/65">
          Add at least one product before moving through checkout.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2  -full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          Back to Shop
        </Link>
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
          <div className=" -[28px] border border-border bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-light">Shipping Address</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input className=" -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="First & Last Name" />
              <input className=" -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="Email Address" />
              <input className="md:col-span-2  -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="Street Address" />
              <input className="md:col-span-2  -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="Apartment, suite, etc." />
              <input className=" -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="City" />
              <input className=" -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="State" />
              <input className=" -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="Zip Code" />
              <input className=" -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="Phone Number" />
            </div>
          </div>

          <div className=" -[28px] border border-border bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-light">Payment Method</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={` -[22px] border px-4 py-5 text-left transition-all ${
                      paymentMethod === method.id
                        ? 'border-sky-500 bg-sky-50 text-sky-700'
                        : 'border-border bg-white hover:border-slate-300'
                    }`}
                  >
                    <Icon className="size-5" />
                    <p className="mt-4 text-sm font-semibold">{method.label}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input className="md:col-span-2  -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="Name on Card" />
              <input className="md:col-span-2  -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="Card Number" />
              <input className=" -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="MM / YY" />
              <input className=" -2xl border border-border px-4 py-3 outline-none focus:border-amber-900" placeholder="CVV" />
            </div>
          </div>
        </div>

        <aside className="h-fit  -[28px] border border-border bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-light">Order Summary</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-4  -[22px] bg-secondary/65 p-3">
                <div className="relative size-16 overflow-hidden  -[18px] bg-white">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-foreground/60">
                    {item.quantity} x {formatCurrency(item.price)}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground/60">Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4 text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOrderPlaced(true);
              clearCart();
            }}
            className="mt-8 w-full  -full bg-[linear-gradient(135deg,#4f46e5,#2563eb)] px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Place Order
          </button>

        </aside>
      </div>
    </section>
  );
}
