import IconLink from "./IconButton";
import Icon from "./icons";
import { socialLinks } from "@/lib/site";

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socialLinks.map(({ label, href, icon }) => (
        <li key={label}>
          <IconLink href={href} label={label}>
            <Icon id={icon} />
          </IconLink>
        </li>
      ))}
    </ul>
  );
}
