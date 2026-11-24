import { Button, Heading, Text } from "@react-email/components";
import { site } from "@/lib/site";
import { color, font, Layout } from "./Layout";

export function Confirm({ link }: { link: string }) {
  return (
    <Layout preview="Subscription Confirmation" footer="If you didn't request this, ignore this email and nothing will happen.">
      {/* <Heading as="h1" style={{ margin: "0 0 12px", fontFamily: font.serif, fontSize: 24, color: color.text }}>
        Subscription Confirmation
      </Heading> */}
      <Text style={{ margin: "0 0 24px", fontSize: 15, lineHeight: "24px", color: color.text }}>
        Click the link below to confirm your subscription!
      </Text>
      <Button
        href={link}
        style={{ backgroundColor: color.accent, color: "#ffffff", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600 }}
      >
        Confirm subscription
      </Button>
    </Layout>
  );
}

Confirm.PreviewProps = { link: "https://example.com/confirm" };

export default Confirm;
