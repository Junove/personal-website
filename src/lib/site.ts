import type { IconId } from "@/components/icons";

/** Single source of truth for identity, links, and skills. */
export const site = {
  name: "Nathaniel Endick",
  monogram: "NE",
  role: "DevOps Engineer",
  location: "NYC Metropolitan Area",
  email: "nathaniel.endick@gmail.com",
  linkedin: "https://linkedin.com/in/nathanielendick",
  github: "https://github.com/Junove",
  // A literal, not new Date(): Next 16 rejects unstable values during
  // prerender, so the year has to be bumped here by hand.
  copyrightYear: 2026,
};

/**
 * Single-page sections, in page order. `id` is the anchor target and what the
 * scroll-spy observes; hrefs are built as `/#id` so the nav also works from the
 * standalone blog routes, where a bare `#id` would point at nothing.
 */
export const navSections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  // Blog section is hidden on the home page for now; nav entry removed so it
  // doesn't link to a missing anchor. Re-add alongside the Section below.
];

/** Icon-button links, used in both the hero and the footer. */
export const socialLinks: { label: string; href: string; icon: IconId }[] = [
  { label: "GitHub", href: site.github, icon: "github" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${site.email}`, icon: "email" },
];

/**
 * Marquee rows. `slug` is a simple-icons slug, rendered as a monochrome mask so
 * the glyph takes the current text color and works in both themes. Entries with
 * no slug render as a text chip. Amazon pulled its marks from simple-icons, so
 * AWS uses `icon`, a locally drawn glyph from the icon registry, instead.
 *
 * Every slug here was verified to resolve against cdn.simpleicons.org.
 */
export const skillRows: { name: string; slug?: string; icon?: IconId }[][] = [
  [
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
  ],
  [
    { name: "Python", slug: "python" },
    { name: "Java", slug: "openjdk" },
    { name: "Groovy", slug: "apachegroovy" },
    { name: "Shell", slug: "gnubash" },
    { name: "MySQL", slug: "mysql" },
    { name: "Spring Boot", slug: "springboot" },
    { name: "React", slug: "react" },
    { name: "Angular", slug: "angular" },
    { name: "Flutter", slug: "flutter" },
    { name: "JUnit", slug: "junit5" },
    { name: "Hugging Face", slug: "huggingface" },
    { name: "Apps Script", slug: "googleappsscript" },
  ],
];
