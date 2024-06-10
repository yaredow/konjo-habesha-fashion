"use client";

import PulsatingDots from "./PulsatingDots";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isPending: boolean;
  showTwoFactor?: boolean;
};

export default function SubmitButton({
  isPending,
  showTwoFactor,
}: SubmitButtonProps) {
  return (
    <Button disabled={isPending} type="submit">
      {isPending ? <PulsatingDots /> : showTwoFactor ? "confirm" : "Submit"}
    </Button>
  );
}
