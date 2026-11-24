"use client";

import { useState } from "react";
import Card from "./Card";
import { iconButtonClass } from "./IconButton";
import Icon from "./icons";
import RssLinks from "./RssLinks";

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
      <Card accentBar className={`max-w-xl p-5 ${className}`}>
        <p role="status" className="text-fg-soft">
          Check your inbox — click the link in the confirmation email to finish subscribing.
        </p>
      </Card>
    );
  }

  return (
    <Card accentBar className={`max-w-xl p-4 ${className}`}>
      <form onSubmit={onSubmit}>
        <div className="mt-1 mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <label htmlFor="subscribe-email" className="label text-accent">
            Receive updates
          </label>
          <RssLinks />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="subscribe-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-9 min-w-0 flex-1 rounded-full border-2 border-neutral-400 bg-surface-50 px-4 font-sans text-sm text-fg sm:h-11 sm:text-base"
          />
          {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          <button
            type="submit"
            disabled={status === "sending"}
            className={`${iconButtonClass} disabled:opacity-60`}
          >
            {status === "sending" ? "Sending…" : "Subscribe"}
            <Icon id="arrow-right" size={16} />
          </button>
        </div>
        {status === "error" && (
          <p role="alert" className="mt-2 text-sm text-fg-soft">
            {message}
          </p>
        )}
      </form>
    </Card>
  );
}
