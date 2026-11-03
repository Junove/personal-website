import Image from "next/image";
import Icon, { type IconId } from "./icons";

const ratios = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
};

const radii = {
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
};

const borders = {
  md: "border-2",
  lg: "border-4",
};

type FigureProps = {
  src: string;
  alt: string;
  /** Matches next/image `sizes`; required so the browser picks a sane source. */
  sizes: string;
  ratio?: keyof typeof ratios;
  radius?: keyof typeof radii;
  border?: keyof typeof borders;
  priority?: boolean;
  caption?: string;
  className?: string;
};

/**
 * Framed image display. Wraps next/image so every picture on the site gets the
 * same border, radius and shadow treatment instead of repeating inline styles.
 */
export default function Figure({
  src,
  alt,
  sizes,
  ratio = "square",
  radius = "lg",
  border = "md",
  priority = false,
  caption,
  className = "",
}: FigureProps) {
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden bg-surface-200 ${borders[border]} border-neutral-300 shadow-lg ${ratios[ratio]} ${radii[radius]}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="caption mt-2 text-fg-muted text-center">{caption}</figcaption>
      )}
    </figure>
  );
}

/** Placeholder for records that have no image yet: a letter, or an icon for records with no single title glyph to show. */
export function FigureFallback({
  label,
  icon,
  ratio = "square",
  border = "md",
}: {
  label?: string;
  icon?: IconId;
  ratio?: keyof typeof ratios;
  border?: keyof typeof borders;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-surface-200 ${borders[border]} border-neutral-300 flex items-center justify-center ${ratios[ratio]}`}
    >
      {icon ? (
        <Icon id={icon} size={40} className="text-fg-muted" />
      ) : (
        <span aria-hidden className="text-3xl font-semibold font-serif text-fg-muted">
          {label?.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
