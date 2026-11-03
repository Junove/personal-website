export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "coming-soon",
    title: "First post coming soon",
    excerpt:
      "I'm working on my first write-up. Check back soon for thoughts on security, automation, and infrastructure.",
    date: "2026",
    body: "I'm working on my first write-up. Check back soon for thoughts on security, automation, and infrastructure.",
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
