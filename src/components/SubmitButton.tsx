"use client";

import PulsatingDots from "./PulsatingDots";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isPending: boolean;
  isLoggedIn?: boolean;
  showTwoFactor?: boolean;
};

function getButtonText(
  isPending: boolean,
  showTwoFactor?: boolean,
  isLoggedIn?: boolean,
): string | JSX.Element {
  if (isPending) {
    return <PulsatingDots />;
  }
  if (showTwoFactor) {
    return "confirm";
  }
  if (!isLoggedIn) {
    return "log in to review";
  }
  return "Submit";
}

export default function SubmitButton({
  isPending,
  showTwoFactor,
  isLoggedIn,
}: SubmitButtonProps) {
  const buttonText = getButtonText(isPending, showTwoFactor, isLoggedIn);
  return (
    <Button disabled={isPending || !isLoggedIn} type="submit">
      {buttonText}
    </Button>
  );
}
