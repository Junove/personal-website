// Usage: npm run notify -- <post|project> <slug> [--dry-run] [--ci]
// Emails a published post or project to its Resend segment, once.
// --ci: unknown/draft/already-sent exit 0 instead of 1, so an automated deploy hook can re-run safely.
import { getPost } from "../src/lib/posts";
import { getProject } from "../src/lib/projects";
import { site } from "../src/lib/site";
import { env, resend } from "../src/lib/subscribe";

const [kind, slug, ...flags] = process.argv.slice(2);
const dryRun = flags.includes("--dry-run");
const ci = flags.includes("--ci");
if ((kind !== "post" && kind !== "project") || !slug) {
  console.error("Usage: npm run notify -- <post|project> <slug> [--dry-run] [--ci]");
  process.exit(1);
}
const skip = (msg: string): never => {
  console.error(msg);
  process.exit(ci ? 0 : 1);
};

const item = kind === "post" ? await getPost(slug) : await getProject(slug);
if (!item) skip(`No published ${kind} "${slug}" (missing, or still draft: true).`);

const { title, slug: itemSlug } = item!;
const summary = "excerpt" in item! ? item.excerpt : item!.desc;
const url = `${site.url}/${kind === "post" ? "blog" : "projects"}/${itemSlug}`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// {{{RESEND_UNSUBSCRIBE_URL}}} is filled in per recipient by Resend.
const html = `<h1>${esc(title)}</h1>
<p>${esc(summary)}</p>
<p><a href="${url}">${kind === "post" ? "Read the post" : "See the project"}</a></p>
<hr>
<p style="font-size:12px;color:#666"><a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</a></p>`;

const name = `${kind}:${itemSlug}`;
const client = resend();

// The broadcast name doubles as the "already sent" marker so a re-run can't double-send.
let after: string | undefined;
for (;;) {
  const { data, error } = await client.broadcasts.list(after ? { after } : {});
  if (error || !data) throw new Error(`Could not list broadcasts: ${error?.message}`);
  if (data.data.some((b) => b.name === name)) skip(`Already emailed "${itemSlug}" — refusing to send again.`);
  if (!data.has_more) break;
  after = data.data.at(-1)?.id;
}

if (dryRun) {
  console.log(`[dry run] would email "${title}" → ${url}`);
  process.exit(0);
}

const { data, error } = await client.broadcasts.create({
  name,
  segmentId: env(kind === "post" ? "RESEND_SEGMENT_ID" : "RESEND_PROJECTS_SEGMENT_ID"),
  from: env("RESEND_FROM"),
  subject: kind === "post" ? title : `New project: ${title}`,
  previewText: summary,
  html,
  send: true,
});
if (error) throw new Error(`Broadcast failed: ${error.message}`);
console.log(`Sent broadcast ${data.id} for "${title}"`);
