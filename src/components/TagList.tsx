"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Tag from "./Tag";

type TagItem = { name: string; slug?: string };

/** Matches the `gap-2` between chips. */
const GAP = 8;

/**
 * One line of tags. Whatever doesn't fit collapses into a "+N" chip, at any
 * width. Widths come from an invisible copy of every chip, so the fit is
 * recomputed whenever the container resizes.
 */
export default function TagList({ tags }: { tags: TagItem[] }) {
  const box = useRef<HTMLDivElement>(null);
  const measure = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(tags.length);

  useLayoutEffect(() => {
    const boxEl = box.current;
    const measureEl = measure.current;
    if (!boxEl || !measureEl) return;

    const fit = () => {
      const widths = [...measureEl.children].map((c) => (c as HTMLElement).offsetWidth);
      const badge = widths.pop() ?? 0;
      const available = boxEl.clientWidth;
      const total = widths.reduce((a, b) => a + b, 0) + GAP * (widths.length - 1);
      if (total <= available) return setVisible(widths.length);

      // Everything doesn't fit, so keep as many chips as leave room for "+N".
      let used = badge;
      let count = 0;
      while (count < widths.length && used + GAP + widths[count] <= available) {
        used += GAP + widths[count];
        count++;
      }
      setVisible(count);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(boxEl);
    return () => observer.disconnect();
  }, [tags]);

  const hidden = tags.length - visible;

  return (
    <div ref={box} className="relative">
      <ul className="flex h-6 items-center gap-2 overflow-hidden">
        {tags.slice(0, visible).map((tag) => (
          <li key={tag.name} className="shrink-0">
            <Tag label={tag.name} slug={tag.slug} />
          </li>
        ))}
        {hidden > 0 && (
          <li className="shrink-0">
            <Tag label={`+${hidden}`} />
          </li>
        )}
      </ul>
      <ul
        ref={measure}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex w-max gap-2"
      >
        {tags.map((tag) => (
          <li key={tag.name} className="shrink-0">
            <Tag label={tag.name} slug={tag.slug} />
          </li>
        ))}
        <li className="shrink-0">
          <Tag label={`+${tags.length}`} />
        </li>
      </ul>
    </div>
  );
}
