import { signOut } from "next-auth/react";

export function handleLogout() {
  signOut({ callbackUrl: "https://konjo-habesha-fashion.vercel.app" });
}
