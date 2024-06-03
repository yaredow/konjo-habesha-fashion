import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "server side";

        await signOut({
          callbackUrl: "https://konjo-habesha-fashion.vercel.app/auth",
        });
      }}
    >
      <Button variant="link" type="submit">
        log out
      </Button>
    </form>
  );
}
