# personal-website
![version](https://img.shields.io/github/package-json/v/Junove/personal-website)

My personal corner of the internet.

## Tech Stack

- ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
- ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

## Build Commands

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Blog

Posts are MDX files in `content/posts/`; the filename is the URL slug.

```bash
npm run new-post -- "My post title"   # scaffold a draft
npm run notify -- my-post-title       # email it to subscribers (once)
npm run notify -- my-post-title --dry-run
```

Frontmatter: `title`, `excerpt`, `date` (`YYYY-MM-DD`), optional `draft: true` (hidden from site and email).

**Publishing flow:** write the post, remove `draft: true`, merge to `main`, wait for the Vercel deploy, then run `npm run notify -- <slug>`. The script refuses to send the same post twice.

**Subscribers** use Resend with double opt-in: the site form emails a signed confirmation link (`/api/subscribe`), and clicking it adds the address to a Resend segment. Setup: verify a sending domain in Resend, create a segment, and set the variables in `.env.example` locally (`.env.local`) and in Vercel. RSS is at `/blog/rss.xml`.
