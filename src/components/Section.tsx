import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import Container from "./Container";
import FadeIn from "./FadeIn";
import Icon from "./icons";

type SectionProps = {
  children: ReactNode;
  /** Forwarded to `Container`: the measure the band's content is held to. */
  width?: ComponentProps<typeof Container>["width"];
  /** Anchor target for the in-page nav, and what the scroll-spy observes. */
  id?: string;
  className?: string;
  /** With a title the section lays out as a label column beside its content. */
  title?: string;
  /** Small number above the title. */
  index?: string;
  /** One-line description under the title. */
  intro?: string;
  link?: { href: string; text: string };
  /** Extra control rendered in the label column, under the intro. */
  aside?: ReactNode;
};

/**
 * One full-width band of page content that keeps `Container`'s measure, so
 * don't wrap this in a Container. Without `title` it is a plain padded wrapper.
 */
export default function Section({
  children,
  width,
  id,
  className = "",
  title,
  index,
  intro,
  link,
  aside,
}: SectionProps) {
  return (
    <section id={id} className={className}>
      <Container width={width}>
        {title ? (
          <div>
            <FadeIn className="grid gap-6 border-t border-fg/15 py-16 lg:grid-cols-[1fr_2fr]">
              <div>
                {index && (
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">{index}</p>
                )}
                {/* The rule above replaces the base h2's accent underline. */}
                <h2 className="mt-4 mb-0 pb-0 block text-4xl sm:text-5xl font-medium leading-none after:hidden">
                  {title}
                </h2>
                {intro && (
                  <p className="mt-6 max-w-[40ch] text-sm leading-relaxed text-fg-soft">{intro}</p>
                )}
                {link && (
                  <Link
                    href={link.href}
                    className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold underline decoration-transparent underline-offset-4 hover:decoration-current"
                  >
                    {link.text}
                    <Icon id="arrow-right" />
                  </Link>
                )}
                {aside}
              </div>
              {/* min-w-0 lets the marquee shrink inside the grid track instead of widening it. */}
              <div className="min-w-0">{children}</div>
            </FadeIn>
          </div>
        ) : (
          <div className="py-14">{children}</div>
        )}
      </Container>
    </section>
  );
}
