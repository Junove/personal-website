type DividerProps = {
  className?: string;
};

/** Decorative horizontal rule marking a boundary between sections; not a landmark. */
export default function Divider({ className = "" }: DividerProps) {
  return <hr aria-hidden className={`w-[090%] mx-auto border-t-3 border-accent ${className}`} />;
}
