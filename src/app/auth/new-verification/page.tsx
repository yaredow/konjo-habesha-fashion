"use client";

import Spinner from "@/components/Spinner";
import CardWrapper from "@/components/auth/CardWrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    console.log(token);
  }, []);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      title="Confirming your verification"
      description="Please wait while we confirm your verification"
      showSocial={false}
      isLogin={false}
      backButtonHref="/auth/signin"
      backButtonLabel="Go back to sign in"
    >
      <div className=" flex w-full items-center justify-center">
        <Spinner />
      </div>
    </CardWrapper>
  );
}
