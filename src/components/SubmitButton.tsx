"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? <Spinner /> : "Submit"}</Button>;
}
