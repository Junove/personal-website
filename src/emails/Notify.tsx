import { Button, Heading, Link, Text } from "@react-email/components";
import { color, font, Layout } from "./Layout";

export function Notify({ kind, title, summary, url }: { kind: "post" | "project"; title: string; summary: string; url: string }) {
  return (
    <Layout
      preview={summary}
      // Resend swaps this placeholder for a per-recipient unsubscribe link when the broadcast is sent.
      footer={<Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={{ color: color.muted }}>Unsubscribe</Link>}
    >
      <Text style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: color.muted }}>
        {kind === "post" ? "New post" : "New project"}
      </Text>
      <Heading as="h1" style={{ margin: "0 0 12px", fontFamily: font.serif, fontSize: 26, color: color.text }}>
        {title}
      </Heading>
      <Text style={{ margin: "0 0 24px", fontSize: 15, lineHeight: "24px", color: color.text }}>{summary}</Text>
      <Button
        href={url}
        style={{ backgroundColor: color.accent, color: "#ffffff", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600 }}
      >
        {kind === "post" ? "Read the post" : "See the project"}
      </Button>
    </Layout>
  );
}

Notify.PreviewProps = {
  kind: "post",
  title: "An example post title",
  summary: "A one-or-two sentence summary of the post.",
  url: "https://example.com/blog/example",
} satisfies React.ComponentProps<typeof Notify>;

export default Notify;
