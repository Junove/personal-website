import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Icon from "@/components/icons";
import mdxComponents from "@/components/MdxComponents";
import SubscribeForm from "@/components/SubscribeForm";
import { formatDate, getPost, getPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: `${post.title} | Nathaniel Endick`, description: post.excerpt } : {};
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold font-sans mb-8 text-accent hover-underline"
      >
        <Icon id="arrow-right" className="rotate-180" />
        Back to all posts
      </Link>
      <p className="caption mb-2 text-fg-muted">Published · {formatDate(post.date)}</p>
      <h1 className="mb-6">{post.title}</h1>
      <MDXRemote source={post.body} components={mdxComponents} />
      <SubscribeForm className="mt-12 border-t-2 border-neutral-300 pt-8" />
    </div>
  );
}
