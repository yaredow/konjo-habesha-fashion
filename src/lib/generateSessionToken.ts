import crypto from "crypto";

export default function generateSessionToken() {
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString("hex");
  return token;
}
