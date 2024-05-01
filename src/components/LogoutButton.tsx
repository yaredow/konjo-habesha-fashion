import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "server side";

        await signOut({ callbackUrl: "http://localhost:3000/account" });
      }}
    >
      <Button variant="link" type="submit">
        log out
      </Button>
    </form>
  );
}
