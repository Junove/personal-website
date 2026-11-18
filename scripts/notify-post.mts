// Usage: npm run notify -- <slug> [--dry-run]
// Emails a published post to every contact in the Resend segment, once.
import { getPost } from "../src/lib/posts";
import { site } from "../src/lib/site";
import { env, resend } from "../src/lib/subscribe";

const [slug, ...flags] = process.argv.slice(2);
const dryRun = flags.includes("--dry-run");
if (!slug) {
  console.error("Usage: npm run notify -- <slug> [--dry-run]");
  process.exit(1);
}

const post = await getPost(slug);
if (!post) {
  console.error(`No published post "${slug}" (missing, or still draft: true).`);
  process.exit(1);
}

const url = `${site.url}/blog/${post.slug}`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// {{{RESEND_UNSUBSCRIBE_URL}}} is filled in per recipient by Resend.
const html = `<h1>${esc(post.title)}</h1>
<p>${esc(post.excerpt)}</p>
<p><a href="${url}">Read the post</a></p>
<hr>
<p style="font-size:12px;color:#666"><a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</a></p>`;

const name = `post:${post.slug}`;
const client = resend();

// The broadcast name doubles as the "already sent" marker so a re-run can't double-send.
let after: string | undefined;
for (;;) {
  const { data, error } = await client.broadcasts.list(after ? { after } : {});
  if (error || !data) throw new Error(`Could not list broadcasts: ${error?.message}`);
  if (data.data.some((b) => b.name === name)) {
    console.error(`Already emailed "${post.slug}" — refusing to send again.`);
    process.exit(1);
  }
  if (!data.has_more) break;
  after = data.data.at(-1)?.id;
}

if (dryRun) {
  console.log(`[dry run] would email "${post.title}" → ${url}`);
  process.exit(0);
}

const { data, error } = await client.broadcasts.create({
  name,
  segmentId: env("RESEND_SEGMENT_ID"),
  from: env("RESEND_FROM"),
  subject: post.title,
  previewText: post.excerpt,
  html,
  send: true,
});
if (error) throw new Error(`Broadcast failed: ${error.message}`);
console.log(`Sent broadcast ${data.id} for "${post.title}"`);
