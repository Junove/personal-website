import { getPosts } from "@/lib/posts";
import { rssResponse } from "@/lib/rss";
import { site } from "@/lib/site";

export async function GET() {
  const posts = await getPosts();
  return rssResponse(
    {
      title: `${site.name} — Blog`,
      path: "/blog",
      description: "Writing on DevOps, security, and infrastructure automation.",
    },
    posts.map((p) => ({ title: p.title, url: `${site.url}/blog/${p.slug}`, date: p.date, description: p.excerpt })),
  );
}
