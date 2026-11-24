import Icon from "./icons";
import { socialLinks } from "@/lib/site";

/* Segments are slanted "/" parallelograms (14px lean), overlapped by lean minus
   the 2px seam, which shows the border-coloured pill behind as a diagonal rule. */
const slant = "[clip-path:polygon(14px_0,100%_0,calc(100%_-_14px)_100%,0_100%)]";
const slantFirst = "first:[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)]";
const slantLast = "last:[clip-path:polygon(14px_0,100%_0,100%_100%,0_100%)]";

/**
 * Icon-only pill split by diagonal seams. The hovered or focused segment grows
 * to 50% of the pill (6 / (6 + 3 + 3)) and reveals the site's name; the flex-grow
 * change is animated, so the segment eases open on hover and closed on leave.
 * shortcut: the 50% assumes exactly three links; recompute the grow values if one is added.
 */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`inline-flex h-9 w-60 overflow-hidden rounded-full border-2 border-neutral-400 bg-neutral-400 sm:h-11 sm:w-72 ${className}`}
    >
      {socialLinks.map(({ label, href, icon }) => {
        const external = href.startsWith("http");

        return (
          <li
            key={label}
            className={`expand-seg group min-w-0 flex-[3_1_0%] bg-surface-50 text-fg not-first:-ml-3 hover:flex-[6_1_0%] hover:bg-accent hover:text-accent-contrast focus-within:flex-[6_1_0%] focus-within:bg-accent focus-within:text-accent-contrast ${slant} ${slantFirst} ${slantLast}`}
          >
            <a
              href={href}
              aria-label={label}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="flex h-full w-full items-center justify-center gap-2 px-3 font-sans text-xs font-semibold sm:text-sm"
            >
              <Icon id={icon} className="shrink-0" />
              <span className="expand-label max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[8rem] group-hover:opacity-100 group-focus-within:max-w-[8rem] group-focus-within:opacity-100">
                {label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
