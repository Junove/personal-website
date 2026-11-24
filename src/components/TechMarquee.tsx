"use client";

import { skillGroups } from "@/lib/site";
import BrandGlyph from "./BrandGlyph";
import Icon, { type IconId } from "./icons";

export type Skill = { name: string; slug?: string; icon?: IconId };

export function SkillChip({ name, slug, icon }: Skill) {
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

// shortcut: 2 copies of a ~12-chip row cover ~2800px per half, enough for the 100rem cap in .marquee at any zoom; raise if the cap grows.
const COPIES = 2;

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
  return (
    <div className="space-y-2">
      <Row skills={skillRows[0]} reverse />
      <Row skills={skillRows[1]} />
    </div>
  );
}
