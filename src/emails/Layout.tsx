import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

// Mirrors the site's light theme (globals.css). Email clients ignore CSS variables, so values are literal.
export const color = { page: "#e2d7b8", card: "#fbf7ee", accent: "#4a5c26", text: "#262312", muted: "#635d44" };
export const font = { serif: "'Source Serif 4', Georgia, serif", sans: "Poppins, 'Segoe UI', Arial, sans-serif" };

export function Layout({ preview, children, footer }: { preview: string; children: ReactNode; footer: ReactNode }) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: color.page, margin: 0, padding: "16px 16px", fontFamily: font.sans }}>
        <Container style={{ backgroundColor: color.card, borderTop: `4px solid ${color.accent}`, padding: "32px" }}>
          <Text style={{ margin: "0 0 24px", fontSize: 14, fontWeight: 600, color: color.accent }}>{site.name}</Text>
          {children}
          <Section style={{ borderTop: `1px solid ${color.page}`, marginTop: 32, paddingTop: 16 }}>
            <Text style={{ margin: 0, fontSize: 12, lineHeight: "18px", color: color.muted }}>{footer}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
