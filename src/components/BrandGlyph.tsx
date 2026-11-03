/**
 * Brand mark from simple-icons, drawn as a mask over `currentColor` so the
 * glyph renders monochrome and picks up the theme's ink color instead of
 * fighting the olive palette with a dozen competing brand hues.
 */
export default function BrandGlyph({
  slug,
  className = "w-5 h-5",
}: {
  slug: string;
  /** Sizing utilities for the glyph box; defaults to the 20px marquee size. */
  className?: string;
}) {
  const url = `url(https://cdn.simpleicons.org/${slug})`;

  return (
    <span
      aria-hidden
      className={`flex-shrink-0 bg-current ${className}`}
      style={{
        maskImage: url,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: url,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
