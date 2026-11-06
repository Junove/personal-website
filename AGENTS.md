## General conventions

- **Layout of `src/`:** routes in `src/app/` (`blog/[slug]`, `projects/[slug]`), reusable UI in `src/components/` (one default-exported component per file, PascalCase filename), content and site data in `src/lib/`.
- **Content is data:** identity, nav sections and social links live in `src/lib/site.ts`; posts and projects in `src/lib/posts.ts` / `src/lib/projects.ts`. Edit those rather than hard-coding copy in components.
- **Reuse before adding:** page structure is built from `Container`, `Section`, `Card`/`CardLink`, `Tag`, `Divider`, `FadeIn`, etc. Check `src/components/` for an existing piece before writing a new one, and match its prop style (typed `Props`, optional booleans with defaults, `className` passthrough).
- **Styling:** use Tailwind utilities with the existing token-backed classes (`bg-surface-50`, `border-neutral-300`, `bg-accent`, …), not raw hex/rgb values or inline styles.
- **Comments:** short, and only for the *why* (e.g. the `copyrightYear` literal in `site.ts`). Doc comments (`/** */`) on props and exported helpers where intent isn't obvious.
- **Commits:** Conventional Commits, enforced by commitlint (`feat:`, `fix:`, …). Work on a feature branch and open a PR against `main`.

## Color usage

**Avoid touching the theming in `src/app/globals.css` (the palette tokens, `:root`, and `:root[data-theme="dark"]` blocks) as much as possible.** It is carefully tuned for contrast in both themes. Prefer using existing tokens in components; only change the theme when it's genuinely required, keep the edit minimal, and follow the checks below.

- When adopting colors from an external design system/brand, don't copy token values verbatim if the token's *semantic role* there doesn't match how this codebase actually uses the equally-named variable here. Re-derive the value to satisfy this codebase's real usage instead.
- Check text/background pairs reach roughly 4.5:1 contrast (3:1 for large text/borders). A quick manual sRGB relative-luminance check is fine if no tool is available.
