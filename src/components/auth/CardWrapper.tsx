"use cclient";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Social from "@/components/auth/Social";
import RegisterAndForgetPasswordLinks from "@/components/auth/RegisterAndForgetPasswordLinks";
import BackButton from "@/components/auth/BackButton";

type CardWrapperProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocial?: boolean;
  isLogin?: boolean;
};

export default function CardWrapper({
  children,
  title,
  description,
  showSocial,
  isLogin,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) {
  return (
    <Card className=" w-[500px] shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className=" items-center">
        {children}
        {isLogin && <RegisterAndForgetPasswordLinks />}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          backButtonHref={backButtonHref}
          backButtonLabel={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
}
