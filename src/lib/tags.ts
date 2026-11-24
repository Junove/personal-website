/** Fixed set of blog topics, matching the specialties in `site.ts`'s description. */
export const postTags = ["Testing"] as const;

export type PostTag = (typeof postTags)[number];
