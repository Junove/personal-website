"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  /** Seconds to wait before starting. Use to stagger siblings. */
  delay?: number;
  /** Seconds the reveal takes. Reduced motion overrides this. */
  duration?: number;
  /** Distance in px the element travels up into place. */
  y?: number;
  className?: string;
};

/* One listener for every FadeIn, because the reveal is directional: it should
   play only while the reader is moving down the page. Scrolling back up brings
   elements in from the top edge, and animating those replays the whole page in
   reverse. */
let goingDown = true;
let lastTop = 0;
let listening = false;

function watchScrollDirection() {
  if (listening) return;
  listening = true;
  lastTop = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY !== lastTop) goingDown = window.scrollY > lastTop;
      lastTop = window.scrollY;
    },
    { passive: true },
  );
}

/**
 * One-way scroll-triggered entrance animation that can retrigger: an element
 * animates up into place as it scrolls into view ON THE WAY DOWN. Leaving view,
 * or entering it while scrolling up, snaps straight to the end state with
 * `duration: 0` — no animation plays on the way up — which re-arms it for the
 * next downward pass. `animate` is driven from `useInView` rather than
 * `whileInView` because `whileInView` reuses one transition in both directions.
 * `once: true` keeps elements revealed after first trigger — avoids flicker at the threshold boundary.
 *
 * Why this doesn't strand text at opacity 0 the way an earlier attempt did:
 * - `amount: 0.15` is a visible-ratio threshold, never a negative root margin.
 *   Anything that fits the viewport reaches ratio 1, so it always triggers,
 *   including above-the-fold content on first paint via the observer's initial
 *   callback. A negative bottom margin could leave a short section near the end
 *   of the scroller permanently below its trigger line; a ratio can't.
 *   shortcut: an element taller than ~6.7 viewports never reaches 0.15; switch
 *   to `amount: "some"` plus a small margin if a section ever gets that long.
 * - JS off: `data-fade` feeds the `<noscript>` rule in layout.tsx.
 * - SEO tradeoff, accepted: `/` is prerendered, so the shipped HTML carries
 *   inline `opacity: 0` here. The text is still in the DOM, the accessibility
 *   tree and the index — opacity hides from paint only — and JS-executing
 *   crawlers run the observer like any browser.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.85,
  y = 12,
  className,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  useEffect(watchScrollDirection, []);

  const hidden = { opacity: 0, y: reduceMotion ? 0 : y };
  // Read at render: `inView` flipping is what re-renders us, so the direction
  // recorded by the listener is current as of this crossing.
  const reveal = inView && goingDown;

  return (
    <motion.div
      ref={ref}
      data-fade
      className={className}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0 } : hidden}
      transition={
        reveal
          ? {
              duration: reduceMotion ? 0.15 : duration,
              delay: reduceMotion ? 0 : delay,
              ease: [0.2, 0, 0.2, 1],
            }
          : { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
}
