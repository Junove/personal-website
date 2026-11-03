import Container from "./Container";
import { site } from "@/lib/site";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t-2 border-chrome-edge bg-chrome">
      <Container>
        <div className="py-10 flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12">
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent text-accent-contrast font-sans font-bold text-lg">
              {site.monogram}
            </span>
            <div>
              <p className="font-serif font-semibold text-base text-fg">{site.name}</p>
              <p className="caption text-fg-muted">© {site.copyrightYear}</p>
            </div>
          </div>
          <SocialLinks className="sm:ml-auto" />
        </div>
      </Container>
    </footer>
  );
}
