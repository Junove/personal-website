import type { Metadata } from "next";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import IconLink from "@/components/IconButton";
import Icon from "@/components/icons";
import Section from "@/components/Section";
import Tag from "@/components/Tag";
import Figure, { FigureFallback } from "@/components/Figure";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Nathaniel Endick`,
    description: project.desc,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Section width="page">
      <Link
        href="/#projects"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold font-sans mb-6 text-accent hover-underline"
      >
        <Icon id="arrow-right" size={16} className="rotate-180" />
        Back to projects
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-[30%_1fr] gap-8 sm:gap-12 items-start">
        <ViewTransition name={`project-${slug}`}>
          {project.image ? (
            <Figure
              src={project.image}
              alt={project.title}
              sizes="(max-width: 640px) 100vw, 30vw"
              ratio="landscape"
              radius="lg"
              border="lg"
            />
          ) : (
            <FigureFallback icon="code" ratio="landscape" />
          )}
        </ViewTransition>

        <div>
          <h1 className="mb-4">{project.title}</h1>

          <p className="label text-fg-muted mb-2">Built with</p>
          <ul className="flex flex-wrap items-center gap-2 mb-6">
            {project.tags.map((tag) => (
              <li key={tag.name}>
                <Tag label={tag.name} slug={tag.slug} />
              </li>
            ))}
          </ul>

          <p className="text-lg leading-relaxed mb-6 text-fg-soft">{project.desc}</p>

          <IconLink href={project.link} label="View on GitHub">
            <Icon id="github" size={16} />
          </IconLink>
        </div>
      </div>

      <p className="text-base leading-relaxed mt-10 text-fg-soft">{project.body}</p>
    </Section>
  );
}
