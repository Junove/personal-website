import { site } from "./site";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type FeedItem = { title: string; url: string; date: string; description: string };

/** RSS 2.0 response; `date` is `YYYY-MM-DD`. */
export function rssResponse(feed: { title: string; path: string; description: string }, items: FeedItem[]) {
  const body = items
    .map(
      (i) =>
        `<item><title>${escape(i.title)}</title><link>${i.url}</link><guid>${i.url}</guid><pubDate>${new Date(`${i.date}T00:00:00Z`).toUTCString()}</pubDate><description>${escape(i.description)}</description></item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(feed.title)}</title><link>${site.url}${feed.path}</link><description>${escape(feed.description)}</description>${body}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
