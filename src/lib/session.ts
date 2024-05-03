import prisma from "./prisma";
import { User } from "@prisma/client";
import { encrypt } from "./encrypt";
import generateSessionToken from "./generateSessionToken";
import { cookies } from "next/headers";

export async function createSession(user: User) {
  const sessionId = generateSessionToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Create a session in the database
  const data = await prisma.session.create({
    data: {
      sessionToken: sessionId,
      userId: user.id,
      expires: expiresAt,
    },
  });

  const sessionToken = data.sessionToken;

  // Encrypt the session ID
  const session = await encrypt({ sessionToken, expiresAt });

  // Store the session in cookies
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
