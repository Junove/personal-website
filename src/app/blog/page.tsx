import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/icons";
import BlogPostCard from "@/components/BlogPostCard";
import Section from "@/components/Section";
import SubscribeForm from "@/components/SubscribeForm";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Nathaniel Endick",
  description: "Writing on DevOps, security, infrastructure automation, and lessons learned.",
};

export default async function Blog() {
  const posts = await getPosts();
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
      <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-[62ch] text-fg-soft">
        Sharing what I learn about security, automation, and infrastructure — written for
        engineers who want practical takeaways, not theory.
      </p>

      <SubscribeForm className="mb-10" />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogPostCard post={post} />
          </li>
        ))}
      </ul>
      </Section>
  );
}
