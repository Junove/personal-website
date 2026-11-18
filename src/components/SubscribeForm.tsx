"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

/** Email signup; posts to `/api/subscribe`, which sends the confirmation email. */
export default function SubscribeForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), website: form.get("website") }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className={`text-fg-soft ${className}`}>
        Check your inbox — click the link in the confirmation email to finish subscribing.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <label htmlFor="subscribe-email" className="label block mb-2 text-fg-soft">
        Get new posts by email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="subscribe-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-md border-2 border-neutral-300 bg-surface-50 px-3 py-2 font-sans text-fg"
        />
        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-md bg-accent px-4 py-2 font-sans font-semibold text-accent-contrast hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm text-fg-soft">
          {message}
        </p>
      )}
    </form>
  );
}
