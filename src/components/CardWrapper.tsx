"use cclient";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Social from "./account/Social";
import BackButton from "./account/BackButton";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  showSocial?: boolean;
  isLogin?: boolean;
};

export default function CardWrapper({
  children,
  headerLabel,
  showSocial,
  isLogin,
}: CardWrapperProps) {
  return (
    <Card className=" w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>{headerLabel}</CardTitle>
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
