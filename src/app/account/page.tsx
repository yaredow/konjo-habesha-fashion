import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RegistrationDialog } from "@/components/account/RegistrationDialog";
import { ForgotPasswordDialog } from "@/components/forgot-password/ForgotPasswordDialog";
import GoogleButton from "@/components/GoogleSigninButton";
import FacebookSigninButton from "@/components/FacebookSigninButton";
import LoginForm from "@/components/forms/LoginForm";

function page() {
  //
  return (
    <main className=" my-auto flex items-center justify-center">
      <Card className=" mx-auto max-w-[36rem] flex-grow items-center p-6">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" mx-4 my-4 flex flex-row justify-between text-sm ">
            <LoginForm />
            <RegistrationDialog />
            <ForgotPasswordDialog />
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
