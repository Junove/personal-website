import type { Metadata } from "next";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import IconLink from "@/components/IconButton";
import Icon from "@/components/icons";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import ProjectMedia from "@/components/ProjectMedia";
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
    title: `${project.title} | Nathaniel`,
    description: project.desc,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Section width="page">
      <Link
        href="/#projects"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold font-sans mb-6 text-accent hover-underline"
      >
        <Icon id="arrow-right" className="rotate-180" />
        Back to projects
      </Link>

      {/* Same card treatment as ProjectCard: shared media panel, accent bar, radius. */}
      <ViewTransition name={`project-${slug}`}>
        <Card accentBar className="isolate rounded-md!">
          <div className="flex flex-col sm:flex-row">
            <ProjectMedia project={project} />

            <div className="flex-1 min-w-0 p-5">
              <h1 className="mb-2">{project.title}</h1>
              <p className="text-sm leading-relaxed mb-4 text-fg-soft">
                {project.desc}
              </p>

              <p className="label text-fg-muted mb-2">Built with</p>
              <ul className="flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <li key={tag.name}>
                    <Tag label={tag.name} slug={tag.slug} />
                  </li>
                ))}
              </ul>

              <div className="mt-5 w-fit">
                <IconLink href={project.link} label="GitHub">
                  <Icon id="github" />
                </IconLink>
              </div>
            </div>
          </div>
        </Card>
      </ViewTransition>

      <p className="text-base leading-relaxed mt-10 text-fg-soft">
        {project.body}
      </p>
    </Section>
  );
}
