"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { skillGroups } from "@/lib/site";
import { iconButtonClass } from "./IconButton";
import BrandGlyph from "./BrandGlyph";
import Icon, { type IconId } from "./icons";

type Skill = { name: string; slug?: string; icon?: IconId };

function SkillChip({ name, slug, icon }: Skill) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-2 mx-1 rounded-lg bg-surface-50 border border-neutral-300 shadow-sm whitespace-nowrap text-fg-soft hover-accent sm:gap-2 sm:px-4 sm:py-2.5 sm:mx-1.5">
      {icon ? (
        <Icon id={icon} size={20} className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
      ) : (
        slug && <BrandGlyph slug={slug} className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
      <span className="font-sans text-xs font-medium sm:text-sm">{name}</span>
    </span>
  );
}

// shortcut: 6 copies of a ~12-chip row cover ~8400px per half (about 25% zoom on 1920px); raise for wider.
const COPIES = 6;

function Row({ skills, reverse }: { skills: Skill[]; reverse?: boolean }) {
  return (
    <div className="marquee py-1.5">
      <ul
        // Longer track, so scale the duration (42s per copy) to keep the original speed.
        style={{ animationDuration: `${42 * COPIES}s` }}
        className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}
      >
        {/* The track is two identical halves so the -50% loop is seamless, and each
            half repeats the list so it stays wider than a zoomed-out viewport.
            Every copy after the first is hidden from assistive tech. */}
        {Array.from({ length: COPIES * 2 }, (_, i) =>
          skills.map((s) => (
            <li key={`${s.name}-${i}`} aria-hidden={i > 0 || undefined}>
              <SkillChip {...s} />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

const skillRows = [
  skillGroups[0].skills,
  [...skillGroups[1].skills, ...skillGroups[2].skills],
];

export default function TechMarquee() {
  const [grouped, setGrouped] = useState(false);
  const reduceMotion = useReducedMotion();
  const collapsed = { height: 0, opacity: 0, overflow: "hidden" };
  const open = { height: "auto", opacity: 1 };
  return (
    <div>
      <button
        type="button"
        onClick={() => setGrouped((g) => !g)}
        aria-pressed={grouped}
        className={`${iconButtonClass} mb-6`}
      >
        Change View
      </button>
      <AnimatePresence mode="wait" initial={false}>
        {grouped ? (
          <motion.div
            key="grouped"
            initial={collapsed}
            animate={open}
            exit={collapsed}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: [0.2, 0, 0.2, 1],
            }}
          >
            <div className="space-y-6">
              {skillGroups.map((g) => (
                <section key={g.title}>
                  <h3 className="mb-3">{g.title}</h3>
                  <ul className="flex flex-wrap gap-y-2 -mx-1">
                    {g.skills.map((s) => (
                      <li key={s.name}>
                        <SkillChip {...s} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="marquee"
            initial={collapsed}
            animate={open}
            exit={collapsed}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: [0.2, 0, 0.2, 1],
            }}
          >
            <div className="space-y-2">
              <Row skills={skillRows[0]} reverse />
              <Row skills={skillRows[1]} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
