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
  project: Pick<Project, "title" | "image" | "imageFit">;
  className?: string;
}) {
  const { title, image, imageFit = "cover" } = project;

  return (
    <div
      className={`relative -z-10 h-28 flex-shrink-0 overflow-hidden bg-surface-50 sm:h-auto sm:w-[30%] ${className}`}
    >
      {image ? (
        imageFit === "contain" ? (
          // `contain` images are marks, not photos: pair the mark with the
          // project name for the same lockup Navbar uses for Logo + site.name.
          <div className="absolute inset-0 flex items-center justify-center gap-3 p-6 sm:p-10">
            <Image src={image} alt="" width={64} height={64} className="h-10 w-10 flex-shrink-0 object-contain sm:h-14 sm:w-14" />
            <span className="font-serif text-xl font-semibold text-fg sm:text-2xl">{title}</span>
          </div>
        ) : (
          <>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 30vw"
              className="object-cover"
            />
            {/* Fades the photo's right edge into the text panel's own
                surface-50 background, so the cut reads as a blend, not a seam.
                Only the side-by-side (sm+) layout has a right edge to fade. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-r from-transparent to-surface-50 sm:block"
            />
          </>
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon id="code" size={44} className="text-fg-muted" />
        </div>
      )}
    </div>
  );
}
