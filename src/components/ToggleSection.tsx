"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ComponentProps, type ReactNode } from "react";
import { iconButtonClass } from "./IconButton";
import Section from "./Section";

type ToggleSectionProps = Omit<ComponentProps<typeof Section>, "aside" | "children"> & {
  /** Label for the view-toggle button. */
  toggleLabel?: string;
  /** [primary view, alternate view] — primary shows first. */
  views: [ReactNode, ReactNode];
};

const collapsed = { height: 0, opacity: 0, overflow: "hidden" };
const open = { height: "auto", opacity: 1 };

/** A `Section` with a "Change View" button that swaps between two content views. */
export default function ToggleSection({
  toggleLabel = "Change View",
  views,
  ...sectionProps
}: ToggleSectionProps) {
  const [alt, setAlt] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <Section
      {...sectionProps}
      aside={
        <button
          type="button"
          onClick={() => setAlt((a) => !a)}
          aria-pressed={alt}
          className={`${iconButtonClass} mt-8`}
        >
          {toggleLabel}
        </button>
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={alt ? "alt" : "primary"}
          initial={collapsed}
          animate={open}
          exit={collapsed}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.2, 0, 0.2, 1] }}
        >
          {alt ? views[1] : views[0]}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
