import Divider from "@/components/Divider";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import TechMarquee from "@/components/TechMarquee";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div>
      <Hero />
      <Section tone="recessed" id="skills">
        <FadeIn>
          <h2 className="section-heading">Skills</h2>
          <p className="text-sm leading-relaxed mb-8 text-fg-soft">
            These are the tools, frameworks, and languages I use to build software systems.
          </p>
        </FadeIn>
        <FadeIn>
          <TechMarquee />
        </FadeIn>
      </Section>
      <FadeIn>
        <Divider />
      </FadeIn>
      <Section id="projects">
        <FadeIn>
          <h2 className="section-heading">Projects</h2>
          <p className="text-sm leading-relaxed mb-8 text-fg-soft">
            Here's what I've released to the world! I'll be building frequently and publicly, so check the site or my socials for new projects!
          </p>
          <div className="flex flex-col gap-4">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}
