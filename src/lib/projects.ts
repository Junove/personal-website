import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

/** Projects are MDX files in `content/projects/`; the filename (minus `.mdx`) is the slug. */
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type Project = {
  slug: string;
  title: string;
  desc: string;
  /** ISO date, `YYYY-MM-DD`. Orders the list and names the project email. */
  date: string;
  /** Drafts are hidden from the site and can't be emailed. */
  draft: boolean;
  /** `slug` is a simple-icons slug, same shape as `skillRows`. */
  tags: { name: string; slug?: string }[];
  /** Repo URL. Rendered as a separate button on the card, not the card itself. Omit when there is no public repo. */
  link?: string;
  image?: string;
  /** `contain` keeps a logo whole on the media panel; `cover` (default) suits photos and screenshots. */
  imageFit?: "cover" | "contain";
  /** Raw MDX source, without frontmatter. Shown on `/projects/[slug]`. */
  body: string;
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function parse(slug: string, source: string): Project {
  const fail = (msg: string): never => {
    throw new Error(`content/projects/${slug}.mdx: ${msg}`);
  };
  if (!SLUG_RE.test(slug)) fail("filename must be lowercase-kebab-case");

  const { data, content } = matter(source);
  const { title, desc, draft = false, tags = [], link, image, imageFit } = data;
  // gray-matter's YAML parser turns bare dates into Date objects.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;

  if (typeof title !== "string" || !title) fail("frontmatter `title` is required");
  if (typeof desc !== "string" || !desc) fail("frontmatter `desc` is required");
  if (typeof date !== "string" || !DATE_RE.test(date)) fail("frontmatter `date` must be YYYY-MM-DD");
  if (typeof draft !== "boolean") fail("frontmatter `draft` must be true or false");
  if (
    !Array.isArray(tags) ||
    !tags.every((t) => typeof t?.name === "string" && (t.slug === undefined || typeof t.slug === "string"))
  )
    fail("frontmatter `tags` must be a list of `{ name, slug? }`");
  if (link !== undefined && typeof link !== "string") fail("frontmatter `link` must be a string");
  if (image !== undefined && typeof image !== "string") fail("frontmatter `image` must be a string");
  if (imageFit !== undefined && imageFit !== "cover" && imageFit !== "contain")
    fail("frontmatter `imageFit` must be cover or contain");

  return { slug, title, desc, date, draft, tags, link, image, imageFit, body: content };
}

// `"use cache"` marks the file reads as prerenderable under Next's Cache
// Components; content only changes with a deploy.
async function readAll(): Promise<Project[]> {
  "use cache";
  const files = (await fs.readdir(PROJECTS_DIR)).filter((f) => f.endsWith(".mdx"));
  return Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      return parse(slug, await fs.readFile(path.join(PROJECTS_DIR, file), "utf8"));
    }),
  );
}

/** Published projects, newest first. */
export async function getProjects(): Promise<Project[]> {
  const all = await readAll();
  return all
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Returns undefined for unknown slugs and for drafts. */
export async function getProject(slug: string): Promise<Project | undefined> {
  "use cache";
  if (!SLUG_RE.test(slug)) return undefined;
  try {
    const project = parse(slug, await fs.readFile(path.join(PROJECTS_DIR, `${slug}.mdx`), "utf8"));
    return project.draft ? undefined : project;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw err;
  }
}
