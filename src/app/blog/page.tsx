import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/Card";
import Icon from "@/components/icons";
import Section from "@/components/Section";
import Tag from "@/components/Tag";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Nathaniel Endick",
  description: "Writing on DevOps, security, infrastructure automation, and lessons learned.",
};

export default function Blog() {
  return (
      <Section>
      {/* Plain <a>, not <Link>: a hash into the single page, same as the nav —
          a full load lets the browser do the fragment scroll inside
          `.scroll-area`. Navbar's href is a template literal, so the rule
          below only fires here. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/#blog"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold font-sans mb-6 text-accent hover-underline"
      >
        <Icon id="arrow-right" size={16} className="rotate-180" />
        Back to home
      </a>

      <h2 className="section-heading">Blog</h2>
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
                <h3 className="heading-3 mt-3 mb-2 text-fg">{post.title}</h3>
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
