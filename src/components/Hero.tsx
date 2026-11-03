import FadeIn from "./FadeIn";
import Figure from "./Figure";
import Container from "./Container";
import SocialLinks from "./SocialLinks";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <div id="about" className="hero-wash border-b-[3px] border-accent">
      <Container>
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-[30%_1fr] gap-8 sm:gap-12 items-center">
          <FadeIn className="flex justify-center sm:justify-start">
            <Figure
              src="/headshot.jpg"
              alt={site.name}
              sizes="(max-width: 640px) 240px, 30vw"
              ratio="square"
              radius="lg"
              priority
              className="w-60 sm:w-full"
            />
          </FadeIn>

          <div className="text-center sm:text-left">
            <FadeIn delay={0.20}>
              <h1 className="heading-1 text-fg">{site.name}</h1>
              <p className="text-lg sm:text-xl font-semibold font-sans mt-1 text-accent">
                {site.role}
              </p>
              <p className="text-base sm:text-lg italic mt-3 text-fg-soft">I build software that "just works"</p>
              <p className="text-sm sm:text-base leading-relaxed mt-4 max-w-[62ch] mx-auto sm:mx-0 text-fg-soft">
                Hi! I'm a DevOps Engineer in the {site.location} with a passion for security and infrastructure! It's my goal to bring secure and reliable software to as many people as possible to let builders keep doing what they do best.
              </p>
              <p className="text-sm sm:text-base leading-relaxed mt-3 max-w-[62ch] mx-auto sm:mx-0 text-fg-soft">
                My skillset spans software engineering development, cloud infrastructure, AI technologies, and speaking publicly on technical work.
              </p>

            </FadeIn>

            <FadeIn delay={0.3}>
              <SocialLinks className="justify-center sm:justify-start mt-6" />
            </FadeIn>
          </div>
        </div>
      </Container>
    </div>
  );
}
