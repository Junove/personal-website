import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";

const messages = {
  confirmed: {
    title: "You're subscribed",
    text: "Thanks for confirming. You'll get an email when a new post goes up.",
  },
  invalid: {
    title: "That link didn't work",
    text: "It may have expired or already been used. Try subscribing again from the blog page.",
  },
};

export function generateStaticParams() {
  return Object.keys(messages).map((status) => ({ status }));
}

export const metadata = { robots: { index: false } };

export default async function SubscribeStatus({ params }: { params: Promise<{ status: string }> }) {
  const { status } = await params;
  if (!(status in messages)) notFound();
  const { title, text } = messages[status as keyof typeof messages];

  return (
    <Section>
      <h1 className="mb-4">{title}</h1>
      <p className="text-base sm:text-lg leading-relaxed mb-6 text-fg-soft">{text}</p>
      <Link href="/blog" className="font-sans font-semibold text-accent hover-underline">
        Back to the blog
      </Link>
    </Section>
  );
}
