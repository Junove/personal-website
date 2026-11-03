import type { ComponentProps, ReactNode } from "react";
import Container from "./Container";

/* Bands alternate down the page so each section reads as its own horizontal
   block instead of another paragraph on one flat sheet. `surface-50` is
   deliberately absent: the navbar and footer own that plane. */
const tones = {
  page: "bg-surface-100",
  recessed: "bg-surface-200",
};

type SectionProps = {
  children: ReactNode;
  /** Which plane this band sits on. Alternate it with the band above. */
  tone?: keyof typeof tones;
  /** Forwarded to `Container`: the measure the band's content is held to. */
  width?: ComponentProps<typeof Container>["width"];
  /** Anchor target for the in-page nav, and what the scroll-spy observes. */
  id?: string;
  className?: string;
};

/**
 * One full-bleed band of page content: the background runs edge to edge while
 * the content keeps `Container`'s measure, so don't wrap this in a Container.
 */
export default function Section({
  children,
  tone = "page",
  width,
  id,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`${tones[tone]} ${className} `}>
      <Container width={width}>
        <div className="py-14">{children}</div>
      </Container>
    </section>
  );
}
