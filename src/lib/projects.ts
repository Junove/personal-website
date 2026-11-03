export type Project = {
  slug: string;
  title: string;
  desc: string;
  /** `slug` is a simple-icons slug, same shape as `skillRows`. */
  tags: { name: string; slug?: string }[];
  /** Repo URL. Rendered as a separate button on the card, not the card itself. */
  link: string;
  image?: string;
  /** Long-form write-up shown on `/projects/[slug]`. */
  body: string;
};

/**
 * Single source for the home page's project list and the `/projects/[slug]`
 * detail route, same arrangement as `posts.ts`.
 *
 * `body` is a placeholder on purpose. Nothing here may be invented — see
 * the rule against fabricating credentials. The two resume projects (Esports
 * Staff Script Suite, CS 431 Capstone) are real and belong here, but their
 * write-ups do not exist yet, so they are not listed.
 */
export const projects: Project[] = [
  {
    slug: "personal-website",
    title: "Personal Website",
    desc: "The website you're currently browsing! Built to learn about managed CI/CD solutions, experiment with Claude Code subagent workflows, and create my personal corner on the Internet.",
    tags: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Vercel", slug: "vercel" },
      { name: "Claude Code", slug: "claudecode" }
    ],
    link: "https://github.com/Junove/personal-website",
    body: "Write-up coming soon.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
