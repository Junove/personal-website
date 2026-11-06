"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { navSections, site } from "@/lib/site";

const sectionIds = navSections.map((s) => s.id);

/**
 * Tracks which section is on screen. The site is one page, so pathname can no
 * longer say where the visitor is, and NN/G is blunt that a missing
 * you-are-here cue is the most common navigation mistake there is.
 */
function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const seen = new Map<string, boolean>();

    // Subscribing to an external system, so setState in the callback is the
    // intended pattern here rather than a cascading render.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) seen.set(entry.target.id, entry.isIntersecting);
        const first = sectionIds.find((id) => seen.get(id));
        if (first) setActive(first);
      },
      // Band across the upper-middle of the viewport: the section crossing it
      // is the one the visitor is actually reading.
      { rootMargin: "-20% 0px -60% 0px" },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const active = useActiveSection();

  return (
    /* Chrome sits on the raised surface, a plane above the page content, so the
       header reads as a separate bar and not as the top of the page. */
    <header>
      <nav
        aria-label="Main"
        className="bg-surface-100 flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-2 min-h-16"
      >
        {/* Left-aligned and linking home: NN/G found users are far likelier to
            reach the homepage in one click than with a centered logo. */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 hover-accent rounded-md"
          aria-label={`${site.name} — home`}
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent text-accent-contrast font-sans font-bold text-sm">
            {site.monogram}
          </span>
          <span className="hidden md:inline font-serif font-semibold text-base text-fg">
            {site.name}
          </span>
        </Link>

        {/* Wraps rather than scrolls: a hidden link in a scroller has no
            affordance, so every section stays visible, on a second row when
            the viewport is too narrow for one. */}
        <div className="flex flex-wrap items-center gap-1 min-w-0 ml-auto">
          {navSections.map(({ id, label }) => {
            const isActive = id === active;

            return (
              <Link
                key={id}
                href={`/#${id}`}
                aria-current={isActive ? "true" : undefined}
                /* Active state carries weight + background + an underline rule,
                   not just hue, so it survives color-blindness and greyscale. */
                className={`relative px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 font-sans text-xs sm:text-sm hover-accent ${
                  isActive
                    ? "font-semibold text-accent bg-accent-light"
                    : "font-medium text-fg-soft"
                }`}
              >
                {label}
                {isActive && (
                  <span aria-hidden className="absolute inset-x-2.5 -bottom-px h-0.5 bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex-shrink-0 self-start sm:self-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
