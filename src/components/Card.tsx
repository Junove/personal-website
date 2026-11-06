import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  /** Thin accent rule across the top edge. */
  accentBar?: boolean;
  /** Adds the lift-on-hover affordance. Only use when the whole card is clickable. */
  interactive?: boolean;
  className?: string;
};

const base =
  "relative overflow-hidden rounded-lg bg-surface-50 border-2 border-neutral-300 shadow-sm";

export default function Card({
  children,
  accentBar = false,
  interactive = false,
  className = "",
}: CardProps) {
  return (
    <div className={`${base} ${interactive ? "hover-lift" : ""} ${className}`}>
      {accentBar && <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent" />}
      {children}
    </div>
  );
}

/** Same surface as Card, but renders an <a> so the entire card is one target. */
export function CardLink({
  children,
  href,
  accentBar = false,
  className = "",
}: Omit<CardProps, "interactive"> & { href: string }) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} hover-lift block ${className}`}
    >
      {accentBar && <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent" />}
      {children}
    </a>
  );
}
