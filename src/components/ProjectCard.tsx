import { ViewTransition } from "react";
import Link from "next/link";
import TagList from "./TagList";
import Card from "./Card";
import IconLink from "./IconButton";
import Icon from "./icons";
import ProjectMedia from "./ProjectMedia";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, title, desc, tags, link } = project;

  return (
    /* Two destinations now (detail page + repo), so the card can't be one <a>:
       nested anchors are invalid HTML. Instead the title link is "stretched"
       with `after:inset-0` to cover the card, and the GitHub pill is lifted
       over that overlay with `relative z-10`. Both stay real, separately
       focusable, separately announced links.

       `isolate` makes the card a stacking context so the bleeding media panel's
       -z-10 keeps it under Card's accent bar. `rounded-md!` overrides the
       shared Card radius for this card only. */
    <ViewTransition name={`project-${slug}`}>
      <Card accentBar interactive className="group isolate rounded-md!">
        <div className="flex flex-col sm:flex-row">
          <ProjectMedia project={project} />

          <div className="flex-1 min-w-0 p-5">
            <h3 className="flex items-center gap-2">
              <Link
                href={`/projects/${slug}`}
                className="after:absolute after:inset-0"
              >
                {title}
              </Link>
              <Icon
                id="arrow-right"
                className="opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 text-accent"
              />
            </h3>
            <p className="text-sm leading-relaxed mt-2 mb-4 text-fg-soft">
              {desc}
            </p>

            <p className="label text-fg-muted mb-2">Built with</p>
            <TagList tags={tags} />

            {/* `w-fit`: a full-width wrapper would raise a whole strip of the card
                above the stretched title link and swallow clicks there.
                shortcut: every card's pill is named just "GitHub", ambiguous if a
                second project lands; needs an optional aria-label on IconLink. */}
            {link && (
              <div className="relative z-10 mt-5 w-fit">
                <IconLink href={link} label="GitHub">
                  <Icon id="github" />
                </IconLink>
              </div>
            )}
          </div>
        </div>
      </Card>
    </ViewTransition>
  );
}
