import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      return `<item><title>${escape(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate><description>${escape(p.excerpt)}</description></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(site.name)}</title><link>${site.url}/blog</link><description>Writing on DevOps, security, and infrastructure automation.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
