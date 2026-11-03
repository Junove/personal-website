import BrandGlyph from "./BrandGlyph";

type TagProps = {
  label: string;
  /** simple-icons slug; when set, the chip leads with the monochrome mark. */
  slug?: string;
  variant?: "neutral" | "accent";
  size?: "sm" | "md";
};

const variants = {
  neutral: "bg-surface-200 text-fg-soft",
  accent: "bg-accent-light text-accent",
};

const sizes = {
  // min-h keeps the pill a 24px pointer target per WCAG 2.2 SC 2.5.8.
  sm: "text-xs px-2 py-0.5 min-h-6",
  md: "text-sm px-2.5 py-1 min-h-7",
};

/**
 * Always renders the full label. An abbreviation would be unreadable, and
 * revealing the text only on :hover hides it from touch and keyboard entirely.
 */
export default function Tag({ label, slug, variant = "neutral", size = "sm" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-sans font-medium whitespace-nowrap ${variants[variant]} ${sizes[size]}`}
    >
      {/* 14px keeps the glyph under the chip's 12px text cap height plus
          padding, so the pill stays at its 24px minimum rather than growing. */}
      {slug && <BrandGlyph slug={slug} className="w-3.5 h-3.5" />}
      {label}
    </span>
  );
}
