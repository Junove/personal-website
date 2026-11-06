import Image from "next/image";
import Icon from "./icons";
import type { Project } from "@/lib/projects";

/* Shared by ProjectCard and the project detail header so both show the same
   media panel. `-z-10` needs an `isolate` ancestor (Card + isolate), or the
   panel slides under the card's own background. */
export default function ProjectMedia({
  project,
  className = "",
}: {
  project: Pick<Project, "title" | "image">;
  className?: string;
}) {
  const { title, image } = project;

  return (
    <div
      className={`relative -z-10 h-28 w-full flex-shrink-0 overflow-hidden bg-surface-50 sm:h-auto sm:w-2/5 ${className}`}
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 40vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon id="code" size={44} className="text-fg-muted" />
        </div>
      )}
    </div>
  );
}
