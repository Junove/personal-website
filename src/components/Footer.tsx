import Logo from "./Logo";
import Container from "./Container";
import { site } from "@/lib/site";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="py-6 flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Logo size={48} />
            <div>
              <p className="font-serif font-semibold text-base text-fg">{site.name}</p>
              <p className="font-mono text-xs text-fg-muted">© {site.copyrightYear}</p>
            </div>
          </div>
          <SocialLinks className="sm:ml-auto" />
        </div>
      </Container>
    </footer>
  );
}
