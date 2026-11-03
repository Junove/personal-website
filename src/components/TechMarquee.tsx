import { skillRows } from "@/lib/site";
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

function Row({ skills, reverse }: { skills: Skill[]; reverse?: boolean }) {
  return (
    <div className="marquee py-1.5">
      <ul className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}>
        {skills.map((s) => (
          <li key={s.name}>
            <SkillChip {...s} />
          </li>
        ))}
        {/* Second copy makes the -50% loop seamless. It is a visual duplicate,
            so it is hidden from assistive tech. */}
        {skills.map((s) => (
          <li key={`${s.name}-dup`} aria-hidden>
            <SkillChip {...s} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TechMarquee() {
  return (
    /* Negative gutters let the rows bleed to the container's edges; must track
       Container's padding scale. */
    <div className="space-y-2 -mx-4 sm:-mx-6 lg:-mx-10">
      {/* Row one travels right, row two travels left. */}
      <Row skills={skillRows[0]} reverse />
      <Row skills={skillRows[1]} />
    </div>
  );
}
