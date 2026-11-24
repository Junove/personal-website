import { getProjects } from "@/lib/projects";
import { rssResponse } from "@/lib/rss";
import { site } from "@/lib/site";

export async function GET() {
  const projects = await getProjects();
  return rssResponse(
    { title: `${site.name} — Projects`, path: "/#projects", description: "New projects from Nathaniel Endick." },
    projects.map((p) => ({ title: p.title, url: `${site.url}/projects/${p.slug}`, date: p.date, description: p.desc })),
  );
}
