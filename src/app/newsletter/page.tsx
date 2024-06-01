"use client";

import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import Spinner from "@/components/Spinner";
import CardWrapper from "@/components/auth/CardWrapper";
import { newsLetterUnsubscriptionAction } from "@/server/actions/newsletter/newsLetterUnsubscriptionAction";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export default function Page() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("unsubscription token not found");
      return;
    }

    await newsLetterUnsubscriptionAction(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch((error) => {
        console.error(error);
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [token, onSubmit]);

  return (
    <main className=" flex min-h-screen items-center justify-center">
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
    </main>
  );
}
