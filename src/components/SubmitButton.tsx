"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import SpinnerMini from "./ui/SpinnerMini";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? <SpinnerMini /> : "Submit"}</Button>;
}
