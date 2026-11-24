import Icon from "./icons";

const feeds = [
  { label: "Projects", href: "/projects/rss.xml" },
  { label: "Blog", href: "/blog/rss.xml" },
];

/** Visible entry point to the RSS feeds; the same URLs are advertised in the layout metadata. */
export default function RssLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm text-fg-soft ${className}`}>
      {feeds.map(({ label, href }) => (
        <li key={href}>
          <a href={href} className="flex items-center gap-1.5 hover-underline">
            <Icon id="rss" size={14} />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
