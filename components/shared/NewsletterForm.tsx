"use client";

import { useState, type FormEvent } from "react";
import { subscribeNewsletter } from "@/services/storefront.service";
import { ApiError } from "@/services/http-client";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setMessage("");
    try {
      const result = await subscribeNewsletter(email, "blog");
      setMessage(result.message);
      setEmail("");
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not subscribe right now. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return <div className="text-center">
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md">
      <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your Email Address" aria-label="Email address" className="min-w-0 flex-1 border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900" />
      <button disabled={pending} className="bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-slate-800 disabled:opacity-60">{pending ? "Subscribing…" : "Subscribe"}</button>
    </form>
    {message && <p role="status" className="mt-3 text-sm text-emerald-700">{message}</p>}
    {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
  </div>;
}
