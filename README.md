# personal-website

Personal site of Nathaniel Endick (DevOps engineer): a landing page, blog, and projects section.

**Stack:** Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, Motion, Vercel Analytics, TypeScript.

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

Commits are checked by [pre-commit](https://pre-commit.com) (ESLint and commitlint with conventional commits); run `pre-commit install --hook-type pre-commit --hook-type commit-msg` once after cloning.

## Deploy

Deployed on Vercel. Pushes to `main` deploy to production and pull requests get preview deployments.

## Environment variables

None required.

## Design notes

Color palette rules are in [AGENTS.md](AGENTS.md).
