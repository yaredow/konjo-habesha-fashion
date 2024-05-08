"use client";

import { Button } from "./ui/button";
import SpinnerMini from "./ui/SpinnerMini";

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
      {isPending ? <SpinnerMini /> : showTwoFactor ? "confirm" : "Submit"}
    </Button>
  );
}
