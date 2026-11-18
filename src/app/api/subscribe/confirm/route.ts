import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { env, resend, verifyToken } from "@/lib/subscribe";

/** Step 2 of double opt-in: add the verified address to the Resend segment. */
export async function GET(request: Request) {
  const done = (status: "confirmed" | "invalid") =>
    NextResponse.redirect(`${site.url}/subscribe/${status}`);

  const email = verifyToken(new URL(request.url).searchParams.get("token") ?? "");
  if (!email) return done("invalid");

  const { error } = await resend().contacts.create({
    email,
    segments: [{ id: env("RESEND_SEGMENT_ID") }],
  });
  // Clicking the link twice (or re-subscribing) makes Resend report a duplicate
  // contact; the person is subscribed either way, so only real failures bail.
  if (error && !/already exists/i.test(error.message)) {
    console.error("subscribe: contact create failed", error);
    return done("invalid");
  }
  return done("confirmed");
}
