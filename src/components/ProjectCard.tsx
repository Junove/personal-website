import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import Card from "./Card";
import IconLink from "./IconButton";
import Icon from "./icons";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, title, desc, tags, link, image } = project;
  // Mobile shows 3 tags plus a "+N" badge instead of wrapping every tag.
  const visibleTags = tags.slice(0, 3);
  const overflowTags = tags.slice(3);

  return (
    /* Two destinations now (detail page + repo), so the card can't be one <a>:
       nested anchors are invalid HTML. Instead the title link is "stretched"
       with `after:inset-0` to cover the card, and the GitHub pill is lifted
       over that overlay with `relative z-10`. Both stay real, separately
       focusable, separately announced links.

       `isolate` makes the card a stacking context so the bleeding media panel's
       -z-10 keeps it under Card's accent bar. `rounded-md!` overrides the
       shared Card radius for this card only. */
    <Card accentBar interactive className="group isolate rounded-md!">
      <div className="flex flex-col sm:flex-row">
        <ViewTransition name={`project-${slug}`}>
          <div className="relative -z-10 h-28 w-full flex-shrink-0 overflow-hidden bg-surface-50 sm:h-auto sm:w-2/5">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon id="code" size={44} className="text-fg-muted" />
              </div>
            )}
          </div>
        </ViewTransition>

        <div className="flex-1 min-w-0 p-5">
          <h3 className="flex items-center gap-2">
            <Link href={`/projects/${slug}`} className="after:absolute after:inset-0">
              {title}
            </Link>
            <Icon
              id="arrow-right"
              size={16}
              className="opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 text-accent"
            />
          </h3>
          <p className="text-sm leading-relaxed mt-2 mb-4 text-fg-soft">{desc}</p>

          <p className="label text-fg-muted mb-2">Built with</p>
          {/* Full labels, always visible. The previous version showed a 2-letter
              abbreviation and revealed the name on :hover, which left the text
              unreachable on touch and keyboard. */}
          <ul className="flex flex-wrap items-center gap-2">
            {visibleTags.map((tag) => (
              <li key={tag.name}>
                <Tag label={tag.name} slug={tag.slug} />
              </li>
            ))}
            {overflowTags.map((tag) => (
              <li key={tag.name} className="hidden sm:list-item">
                <Tag label={tag.name} slug={tag.slug} />
              </li>
            ))}
            {overflowTags.length > 0 && (
              <li className="sm:hidden">
                <Tag label={`+${overflowTags.length}`} />
              </li>
            )}
          </ul>

          {/* `w-fit`: a full-width wrapper would raise a whole strip of the card
              above the stretched title link and swallow clicks there.
              shortcut: every card's pill is named just "GitHub", ambiguous if a
              second project lands; needs an optional aria-label on IconLink. */}
          <div className="relative z-10 mt-5 w-fit">
            <IconLink href={link} label="GitHub">
              <Icon id="github" size={16} />
            </IconLink>
          </div>
        </div>
      </div>
    </Card>
  );
}
