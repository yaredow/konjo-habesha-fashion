import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GoogleButton from "@/components/GoogleSigninButton";
import FacebookSigninButton from "@/components/FacebookSigninButton";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <main className=" my-auto flex items-center justify-center">
      <Card className=" mx-auto max-w-[36rem] flex-grow items-center p-6">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className=" mx-4 my-4 flex flex-row justify-between text-sm ">
            <Button variant="link">
              <Link href="/account/signup">Register here</Link>
            </Button>
            <Button variant="link">
              <Link href="/account/forget-password">Forgot your password</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className=" grid grid-rows-1">
          <div className="mb-8 mt-2 flex flex-grow items-center">
            <hr className="border-1 w-full rounded-full" />
            <div className="mx-4 flex-none text-xs font-normal">
              OR LOGIN WITH
            </div>
            <hr className="border-1 w-full rounded-full" />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <GoogleButton />

            <FacebookSigninButton />
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default page;
