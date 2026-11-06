"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
    let last = sectionIds[0];

    // Subscribing to an external system, so setState in the callback is the
    // intended pattern here rather than a cascading render.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) seen.set(entry.target.id, entry.isIntersecting);
        const first = sectionIds.find((id) => seen.get(id));
        if (!first) return;
        setActive(first);
        // One history entry per section change, so Back returns to the section
        // you left. The hash check stops a Back/Forward traversal (already on
        // that hash) from pushing a duplicate entry; the top of the page stays
        // hash-less so returning to it doesn't truncate forward history.
        const atTop = first === sectionIds[0] && !location.hash;
        if (first !== last && !atTop && location.hash !== `#${first}`) {
          window.history.pushState(null, "", `#${first}`);
        }
        last = first;
      },
      // Band across the upper-middle of the viewport: the section crossing it
      // is the one the visitor is actually reading.
      { rootMargin: "-20% 0px -60% 0px" },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Keep the URL hash on the visible section so Back and reloads return to it.
  // Gated on a real scroll: the observer's first callback reports the top
  // section and would otherwise clobber an incoming #hash before it is scrolled to.
  const scrolled = useRef(false);
  useEffect(() => {
    const onScroll = () => (scrolled.current = true);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (scrolled.current && window.location.pathname === "/") {
      window.history.replaceState(null, "", `#${active}`);
    }
  }, [active]);

  return active;
}

export default function Navbar() {
  const active = useActiveSection();
  const headerRef = useRef<HTMLElement>(null);

  // The nav wraps to a second row on narrow screens, so the sticky header's
  // height varies; anchors need to clear it (see scroll-padding-top).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const sync = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    /* Chrome sits on the raised surface, a plane above the page content, so the
       header reads as a separate bar and not as the top of the page. */
    <header ref={headerRef} className="sticky top-0 z-50">
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
