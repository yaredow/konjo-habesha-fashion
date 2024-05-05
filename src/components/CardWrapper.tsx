"use cclient";

import Link from "next/link";
import FacebookSigninButton from "./FacebookSigninButton";
import GoogleButton from "./GoogleSigninButton";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  isLogin?: string;
};

export default function CardWrapper({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  isLogin,
}: CardWrapperProps) {
  return (
    <Card className=" w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{children}</div>
        {isLogin && (
          <div className=" mx-4 my-4 flex flex-row justify-between text-sm ">
            <Button variant="link">
              <Link href="/auth/signup">Register here</Link>
            </Button>
            <Button variant="link">
              <Link href="/auth/forget-password">Forgot your password</Link>
            </Button>
          </div>
        )}
      </CardContent>
      {showSocial && (
        <CardFooter>
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
      )}
    </Card>
  );
}
