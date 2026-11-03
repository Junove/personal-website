import type { ReactNode } from "react";

/**
 * Shared chrome for the pill controls (social links, theme toggle).
 * 44px tall: comfortably past the 24px WCAG 2.2 pointer-target minimum and
 * matching the platform touch-target conventions on phones. Icon-only users
 * pair this with a matching width to stay square.
 */
export const iconButtonBase =
  "inline-flex items-center justify-center rounded-full bg-surface-50 border-2 border-neutral-400 text-fg hover-fill";

/** Labelled variant: text, then the glyph. Smaller on mobile viewports. */
export const iconButtonClass = `${iconButtonBase} gap-1.5 h-9 px-3 font-sans text-xs font-semibold sm:gap-2 sm:h-11 sm:px-4 sm:text-sm`;

type IconLinkProps = {
  href: string;
  /** Rendered as visible text, which is also the accessible name. */
  label: string;
  children: ReactNode;
};

export default function IconLink({ href, label, children }: IconLinkProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={iconButtonClass}
    >
      {label}
      {children}
    </a>
  );
}
