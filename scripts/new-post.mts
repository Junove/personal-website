// Usage: npm run new-post -- "My post title"
import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new-post -- "My post title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
const file = path.join("content", "posts", `${slug}.mdx`);
if (fs.existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  file,
  `---\ntitle: ${JSON.stringify(title)}\nexcerpt: ""\ndate: "${date}"\ndraft: true\n---\n\nWrite here.\n`,
);
console.log(`Created ${file} (draft: true — remove that line to publish)`);
