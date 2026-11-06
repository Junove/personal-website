import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/Card";
import Icon from "@/components/icons";
import Section from "@/components/Section";
import Tag from "@/components/Tag";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Nathaniel Endick",
  description: "Writing on DevOps, security, infrastructure automation, and lessons learned.",
};

export default function Blog() {
  return (
      <Section>
      <Link
        href="/#blog"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold font-sans mb-6 text-accent hover-underline"
      >
        <Icon id="arrow-right" className="rotate-180" />
        Back to home
      </Link>

      <h2>Blog</h2>
      <p className="text-lg leading-relaxed mb-10 max-w-[62ch] text-fg-soft">
        Sharing what I learn about security, automation, and infrastructure — written for
        engineers who want practical takeaways, not theory.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <Card interactive accentBar className="h-full p-5">
                <Tag label="Blog Post" variant="accent" />
                <h3 className="mt-3 mb-2">{post.title}</h3>
                <p className="text-sm leading-relaxed mb-3 text-fg-soft">{post.excerpt}</p>
                <p className="caption text-fg-muted">Published · {post.date}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
      </Section>
  );
}
