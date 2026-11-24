"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { navSections, site } from "@/lib/site";

const sectionIds = navSections.map((s) => s.id);

/**
 * Tracks which section is on screen. The site is one page, so pathname can no
 * longer say where the visitor is, and NN/G is blunt that a missing
 * you-are-here cue is the most common navigation mistake there is.
 *
 * Recomputed from each section's live bounding rect on scroll/resize, rather
 * than from IntersectionObserver entries: IO only reports elements whose
 * state changed since its last (batched, sometimes delayed) callback, which
 * let the highlight go stale or skip a short section during a fast scroll.
 *
 * Navbar lives in the root layout, so it stays mounted across client-side
 * navigation; re-running this on `pathname` change re-queries the ids (the
 * homepage's section elements are fresh DOM nodes after a round trip through
 * another route) instead of leaving the highlight stuck on wherever it was
 * when the visitor navigated away.
 */
function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0]);
  const pathname = usePathname();

  useEffect(() => {
    let last = sectionIds[0];

    // Band across the upper-middle of the viewport: the section crossing it
    // is the one the visitor is actually reading.
    const compute = () => {
      const top = window.innerHeight * 0.2;
      const bottom = window.innerHeight * 0.4;
      const first = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < bottom && r.bottom > top;
      });
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
    };

    compute();
    // rAF-throttled: scroll/resize can fire far faster than layout needs recomputing.
    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        compute();
      });
    };
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [pathname]);

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
  const onHome = usePathname() === "/";

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
    <header ref={headerRef} className="sticky top-0 z-50 shadow-md">
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
          <Logo />
          <span className="hidden md:inline font-serif font-semibold text-base text-fg">
            {site.name}
          </span>
        </Link>

        {/* Section anchors only make sense on the homepage, where those ids exist. */}
        {onHome && (
          /* Wraps rather than scrolls: a hidden link in a scroller has no
              affordance, so every section stays visible, on a second row when
              the viewport is too narrow for one. */
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
        )}

        <div className={`flex-shrink-0 self-start sm:self-auto ${onHome ? "" : "ml-auto"}`}>
          <ThemeToggle />
        </div>
      </nav>

      {/* Softens the hard edge where the sticky bar's solid surface meets
          scrolled-under content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-4 bg-gradient-to-b from-surface-100 to-transparent"
      />
    </header>
  );
}
