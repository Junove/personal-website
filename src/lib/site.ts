import type { IconId } from "@/components/icons";

/** Single source of truth for identity, links, and skills. */
export const site = {
  name: "Nathaniel Endick",
  role: "DevOps Engineer",
  location: "NYC Metropolitan Area",
  email: "nathaniel.endick@gmail.com",
  linkedin: "https://linkedin.com/in/nathanielendick",
  github: "https://github.com/Junove",
  // A literal, not new Date(): Next 16 rejects unstable values during
  // prerender, so the year has to be bumped here by hand.
  copyrightYear: 2026,
  tagline: "I'm building human-focused tooling for the post-AI era.",
  /** Canonical origin, no trailing slash. Used for RSS and email links. */
  url: (process.env.SITE_URL ?? "https://nathanielendick.dev").replace(/\/$/, ""),
};

export const bio = [
  'In the post-AI era, builders will define, design, and create the tools that govern the next few decade. As the pace of technology and agentic workloads continues to ramp up, the need to provide human touch, direction, and morality to the new systems we use daily will only increase in importance.',
  'My recent projects explore how humans interact with technology and AI. By day, I am a DevOps Engineer at ADP. By night, I discuss the latest tech, existing tools, and what comes next with other engineers.',
];

/**
 * Single-page sections, in page order. `id` is the anchor target and what the
 * scroll-spy observes; hrefs are built as `/#id` so the nav also works from the
 * standalone blog routes, where a bare `#id` would point at nothing.
 */
export const navSections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "skills", label: "Skills" },
];

export const socialLinks: { label: string; href: string; icon: IconId }[] = [
  { label: "GitHub", href: site.github, icon: "github" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${site.email}`, icon: "email" },
];

export const skillGroups: { title: string; icon?: IconId; skills: { name: string; slug?: string; icon?: IconId }[] }[] = [
  { title: "Cloud Tooling", icon: "aws", skills: [
    { name: "Kubernetes", slug: "kubernetes" },
    { name: "Docker", slug: "docker" },
    { name: "AWS", icon: "aws" },
    { name: "Terraform", slug: "terraform" },
    { name: "Ansible", slug: "ansible" },
    { name: "Helm", slug: "helm" },
    { name: "Jenkins", slug: "jenkins" },
    { name: "NGINX", slug: "nginx" },
    { name: "Dynatrace", slug: "dynatrace" },
    { name: "Splunk", slug: "splunk" },
    { name: "Opsgenie", slug: "opsgenie" },
    { name: "Vercel", slug: "vercel" }
  ] },
  { title: "Programming Languages", icon: "code", skills: [
    { name: "Shell", slug: "gnubash" },
    { name: "Python", slug: "python" },
    { name: "Java", slug: "openjdk" },
    { name: "Groovy", slug: "apachegroovy" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Dart", slug: "dart"},
    { name: "MySQL", slug: "mysql" },
    { name: "Apps Script", slug: "googleappsscript" },
  ] },
  { title: "AI Tooling", icon: "spark", skills: [
    { name: "Claude Code", slug: "claudecode" },
    { name: "OpenCode", slug: "opencode" },
    { name: "Hugging Face", slug: "huggingface" }
  ] },
  { title: "Frameworks", icon: "layers", skills: [
    { name: "Spring Boot", slug: "springboot" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "React", slug: "react" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "Angular", slug: "angular" },
    { name: "Flutter", slug: "flutter" },
    { name: "JUnit", slug: "junit5" },
  ] },
];
