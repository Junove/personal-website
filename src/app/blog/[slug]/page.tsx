import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/icons";
import { posts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold font-sans mb-8 text-accent hover-underline"
      >
        <Icon id="arrow-right" size={16} className="rotate-180" />
        Back to all posts
      </Link>
      <p className="caption mb-2 text-fg-muted">Published · {post.date}</p>
      <h1 className="heading-1 mb-6 text-fg">
        {post.title}
      </h1>
      <p className="text-lg leading-relaxed text-fg-soft">{post.body}</p>
    </div>
  );
}
