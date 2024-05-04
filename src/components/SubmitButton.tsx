"use client";

import { Button } from "./ui/button";
import SpinnerMini from "./ui/SpinnerMini";

type SubmitButtonProps = {
  isPending: boolean;
};

export default function SubmitButton({ isPending }: SubmitButtonProps) {
  return (
    <Button disabled={isPending} type="submit">
      {isPending ? <SpinnerMini /> : "Submit"}
    </Button>
  );
}
