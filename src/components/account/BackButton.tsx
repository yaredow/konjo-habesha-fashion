"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function BackButton() {
  return (
    <div className=" mx-4 my-4 flex flex-row justify-between text-sm ">
      <Button variant="link" asChild>
        <Link href="/auth/signup">Register</Link>
      </Button>

      <Button variant="link" asChild>
        <Link href="/auth/signup">Forgot your password</Link>
      </Button>
    </div>
  );
}
