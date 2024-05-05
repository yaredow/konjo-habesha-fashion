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
import CardWrapper from "@/components/CardWrapper";

export default function page() {
  return (
    <main className=" my-auto flex items-center justify-center">
      <CardWrapper headerLabel="Login" isLogin="true" showSocial={true}>
        <LoginForm />
      </CardWrapper>
    </main>
  );
}
