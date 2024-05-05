"use cclient";

import { Card } from "./ui/card";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
};

export default function CardWrapper({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) {
  return <Card className=" w-[400px] shadow-md"></Card>;
}
