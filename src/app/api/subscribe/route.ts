import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { createToken, EMAIL_RE, env, resend } from "@/lib/subscribe";

/** Step 1 of double opt-in: email a confirmation link. Nothing is stored yet. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  // Hidden field real users never fill in. Pretend success so bots learn nothing.
  if (body?.website) return NextResponse.json({ ok: true });

  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const link = `${site.url}/api/subscribe/confirm?token=${encodeURIComponent(createToken(email))}`;
  const { error } = await resend().emails.send({
    from: env("RESEND_FROM"),
    to: email,
    subject: `Confirm your subscription to ${site.name}'s blog`,
    html: `<p>Confirm your subscription to new posts from ${site.name}:</p>
<p><a href="${link}">Confirm subscription</a></p>
<p>If you didn't request this, ignore this email and nothing will happen.</p>`,
    text: `Confirm your subscription to new posts from ${site.name}: ${link}\n\nIf you didn't request this, ignore this email.`,
  });

  if (error) {
    console.error("subscribe: confirmation email failed", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
