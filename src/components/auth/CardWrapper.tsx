"use cclient";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BackButton from "@/components/auth/BackButton";
import Social from "@/components/auth/Social";

type CardWrapperProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  showSocial?: boolean;
  isLogin?: boolean;
};

export default function CardWrapper({
  children,
  title,
  description,
  showSocial,
  isLogin,
}: CardWrapperProps) {
  return (
    <Card className=" w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className=" items-center">
        {children}
        {isLogin && <BackButton />}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
    </Card>
  );
}
