import BlogPostCard from "@/components/BlogPostCard";
import Hero from "@/components/Hero";
import Icon from "@/components/icons";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import TechMarquee, { SkillChip } from "@/components/TechMarquee";
import ToggleSection from "@/components/ToggleSection";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { skillGroups } from "@/lib/site";

export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);
  const projects = await getProjects();

  return (
    <>
      <Hero />

      <Section
        id="projects"
        index="01"
        title="Projects"
        intro="Real world impact, tinkering with toys, and everything inbetween!"
      >
        <div className="grid grid-cols-1 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section
        id="blog"
        index="02"
        title="Blog"
        intro="Notes on my learnings, life lessons, and teachings I want to share."
        link={{ href: "/blog", text: "View all posts" }}
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogPostCard post={post} />
            </li>
          ))}
        </ul>
      </Section>

      <ToggleSection
        id="skills"
        index="03"
        title="Skills"
        intro="These are the tools, frameworks, and languages I use to build software systems."
        views={[
          <TechMarquee key="marquee" />,
          <div key="grouped" className="space-y-6">
            {skillGroups.map((g) => (
              <section key={g.title}>
                <h3 className="mb-3 flex items-center gap-2">
                  {g.icon && <Icon id={g.icon} size={20} className="text-accent" />}
                  {g.title}
                </h3>
                <ul className="flex flex-wrap gap-y-2 -mx-1">
                  {g.skills.map((s) => (
                    <li key={s.name}>
                      <SkillChip {...s} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>,
        ]}
      />
    </>
  );
}
