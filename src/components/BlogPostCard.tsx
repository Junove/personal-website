import Link from "next/link";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Icon from "@/components/icons";
import { formatDate, type PostMeta } from "@/lib/posts";

type Props = { post: PostMeta };

export default function BlogPostCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card interactive accentBar className="h-full p-5">
        <p className="font-mono text-xs mt-3 text-fg-muted">{formatDate(post.date)}</p>
        <h3 className="mt-2 mb-2">{post.title}</h3>
        <p className="text-sm leading-relaxed mb-3 text-fg-soft">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap items-center gap-2 mb-3">
            <Icon id="tag" size={14} className="text-fg-muted" />
            {post.tags.map((tag) => (
              <li key={tag}>
                <Tag label={tag} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </Link>
  );
}
