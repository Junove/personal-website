import Container from "./Container";

type DividerProps = {
  className?: string;
};

/** Decorative horizontal rule marking a boundary between sections; not a landmark. */
export default function Divider({ className = "" }: DividerProps) {
  return (
    /* Own band background, same as Section's: otherwise the strip beside the
       line is bare `html` canvas, which fades out of step with the bands. */
    <div className="bg-surface-100">
      <Container>
        <hr aria-hidden className={`mx-auto border-t-3 border-accent ${className}`} />
      </Container>
    </div>
  );
}
