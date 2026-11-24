import FadeIn from "./FadeIn";
import Figure from "./Figure";
import Container from "./Container";
import SocialLinks from "./SocialLinks";
import SubscribeForm from "./SubscribeForm";
import { bio, site } from "@/lib/site";

export default function Hero() {
  return (
    <div id="about" className="relative overflow-hidden">
      <Container>
        <div className="py-10 sm:py-24 grid grid-cols-1 sm:grid-cols-[30%_1fr] gap-10 sm:gap-16 items-center">
          <FadeIn className="flex justify-center sm:justify-start">
            <Figure
              src="/headshot.jpg"
              alt={site.name}
              sizes="(max-width: 640px) 176px, 30vw"
              ratio="square"
              radius="lg"
              priority
              className="w-50 sm:w-full"
            />
          </FadeIn>

          <div className="text-center sm:text-left">
            <FadeIn delay={0.20}>
              <h1 className="text-2xl sm:text-3xl leading-tight mt-3 text-fg">{site.tagline}</h1>
              {bio.map((para) => (
                <p key={para} className="text-sm sm:text-base leading-relaxed mt-4 mx-auto sm:mx-0 text-fg-soft">
                  {para}
                </p>
              ))}
            </FadeIn>

            <FadeIn delay={0.3}>
              <SubscribeForm className="mt-6 mx-auto sm:mx-0 text-left" />
              <SocialLinks className="justify-center sm:justify-start mt-6" />
            </FadeIn>
          </div>
        </div>
      </Container>
    </div>
  );
}
