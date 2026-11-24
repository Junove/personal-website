import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { postTags, type PostTag } from "./tags";

/** Posts are MDX files in `content/posts/`; the filename (minus `.mdx`) is the slug. */
const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  /** Drafts are hidden from the site and can't be emailed. */
  draft: boolean;
  /** Subset of `postTags`. */
  tags: PostTag[];
};

export type Post = PostMeta & {
  /** Raw MDX source, without frontmatter. */
  body: string;
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function parse(slug: string, source: string): Post {
  const fail = (msg: string): never => {
    throw new Error(`content/posts/${slug}.mdx: ${msg}`);
  };
  if (!SLUG_RE.test(slug)) fail("filename must be lowercase-kebab-case");

  const { data, content } = matter(source);
  const { title, excerpt, draft = false, tags = [] } = data;
  // gray-matter's YAML parser turns bare dates into Date objects.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;

  if (typeof title !== "string" || !title) fail("frontmatter `title` is required");
  if (typeof excerpt !== "string" || !excerpt) fail("frontmatter `excerpt` is required");
  if (typeof date !== "string" || !DATE_RE.test(date)) fail("frontmatter `date` must be YYYY-MM-DD");
  if (typeof draft !== "boolean") fail("frontmatter `draft` must be true or false");
  if (!Array.isArray(tags) || !tags.every((t) => postTags.includes(t)))
    fail(`frontmatter \`tags\` must only use: ${postTags.join(", ")}`);

  return { slug, title, excerpt, date, draft, tags, body: content };
}

// `"use cache"` marks the file reads as prerenderable under Next's Cache
// Components; content only changes with a deploy.
async function readAll(): Promise<Post[]> {
  "use cache";
  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".mdx"));
  return Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      return parse(slug, await fs.readFile(path.join(POSTS_DIR, file), "utf8"));
    }),
  );
}

/** Published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const all = await readAll();
  return all
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Returns undefined for unknown slugs and for drafts. */
export async function getPost(slug: string): Promise<Post | undefined> {
  "use cache";
  if (!SLUG_RE.test(slug)) return undefined;
  try {
    const post = parse(slug, await fs.readFile(path.join(POSTS_DIR, `${slug}.mdx`), "utf8"));
    return post.draft ? undefined : post;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw err;
  }
}

/** `2026-11-18` → `Nov 18, 2026`. Pinned to UTC so the day never shifts by timezone. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
