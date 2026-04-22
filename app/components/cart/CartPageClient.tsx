'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from './CartProvider';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function CartPageClient() {
  const { items, subtotal, shipping, tax, total, updateItemQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 flex size-20 items-center justify-center  bg-secondary">
          <ShoppingBag className="size-9 text-amber-900" />
        </div>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-amber-900">
          Your bag is empty
        </p>
        <h1 className="mb-4 text-4xl font-light">Build your next look.</h1>
        <p className="max-w-xl text-sm leading-7 text-foreground/65">
          Add products from the shop and they&apos;ll appear here with a live order summary and a
          fast path to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2  bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="mb-10 flex flex-col gap-4 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-900">Cart</p>
          <h1 className="mt-3 text-4xl font-light">Shopping Cart.</h1>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/65 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.cartItemId}
              className="grid gap-4  border border-border bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:grid-cols-[120px_minmax(0,1fr)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden  bg-secondary">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="120px" />
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-900">
                      {item.category}
                    </p>
                    <h2 className="mt-2 text-2xl font-light">{item.name}</h2>
                    <p className="mt-2 text-sm text-foreground/65">
                      Size {item.size} • Color {item.color}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.cartItemId)}
                    className="inline-flex items-center gap-2 self-start  border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/65 transition-colors hover:border-red-200 hover:text-red-600"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="size-3.5" />
                    Remove
                  </button>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="inline-flex w-fit items-center  border border-border bg-secondary/60 p-1">
                    <button
                      type="button"
                      onClick={() => updateItemQuantity(item.cartItemId, item.quantity - 1)}
                      className=" p-3 transition-colors hover:bg-white"
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-12 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateItemQuantity(item.cartItemId, item.quantity + 1)}
                      className=" p-3 transition-colors hover:bg-white"
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-foreground/60">Item total</p>
                    <p className="mt-1 text-2xl font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    {item.originalPrice > item.price && (
                      <p className="mt-1 text-sm text-foreground/45 line-through">
                        {formatCurrency(item.originalPrice * item.quantity)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit  bg-slate-900 p-8 text-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-300">Payment Info</p>
          <h2 className="mt-3 text-4xl font-light">Ready to check out?</h2>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Estimated tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-8 inline-flex w-full items-center justify-center  bg-sky-500 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-sky-400"
          >
            Check Out
          </Link>
        </aside>
      </div>
    </section>
  );
}
