import { signIn } from "@/auth";

export async function nextLog() {
  await signIn();
}
