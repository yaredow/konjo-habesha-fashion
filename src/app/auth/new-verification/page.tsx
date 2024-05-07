"use client";

import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import Spinner from "@/components/Spinner";
import CardWrapper from "@/components/auth/CardWrapper";
import { tokenVerificationAction } from "@/server/actions/account/tokenVerificationAction";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Verification token not found");
      return;
    }

    await tokenVerificationAction(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong");
      });
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
      {!error && !success ? (
        <div className=" flex w-full items-center justify-center">
          <Spinner />
        </div>
      ) : null}

      <FormSuccess message={success} />
      <FormError message={error} />
    </CardWrapper>
  );
}
