import type { ReactNode } from "react";

const widths = {
  page: "max-w-[95%]",
  prose: "max-w-[65ch]",
};

type ContainerProps = {
  children: ReactNode;
  width?: keyof typeof widths;
  className?: string;
};

export default function Container({
  children,
  width = "page",
  className = "",
}: ContainerProps) {
  return (
    <div className={`${widths[width]} mx-auto px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
