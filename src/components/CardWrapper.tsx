"use cclient";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Social from "./account/Social";
import BackButton from "./account/BackButton";

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
