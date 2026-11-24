import { createHmac, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";

/** Confirmation links stay valid for this long. */
const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;

export function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

export function resend() {
  return new Resend(env("RESEND_API_KEY"));
}

function sign(payload: string) {
  return createHmac("sha256", env("SUBSCRIBE_SECRET")).update(payload).digest("base64url");
}

/**
 * Stateless double opt-in: the token is `<base64url(email|expiry)>.<hmac>`, so
 * nothing has to be stored for unconfirmed signups.
 */
export function createToken(email: string): string {
  const payload = Buffer.from(`${email}|${Date.now() + TOKEN_TTL_MS}`).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Returns the email if the token is authentic and unexpired, else null. */
export function verifyToken(token: string): string | null {
  const [payload, sig, ...rest] = token.split(".");
  if (!payload || !sig || rest.length) return null;

  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(sig);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  const [email, expiry] = Buffer.from(payload, "base64url").toString().split("|");
  if (!email || Number(expiry) < Date.now()) return null;
  return email;
}

// Deliberately loose: the confirmation email is the real validation.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
