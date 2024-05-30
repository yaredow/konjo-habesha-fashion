import Spinner from "@/components/Spinner";
import CardWrapper from "@/components/auth/CardWrapper";
import LoginForm from "@/components/forms/LoginForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className=" my-auto flex items-center justify-center">
      <CardWrapper
        title="Sign In"
        description="Provide your credentials to log in"
        isLogin={true}
        showSocial={true}
        backButtonHref="/"
        backButtonLabel="Go back to home"
      >
        <Suspense fallback={<Spinner />}>
          <LoginForm />
        </Suspense>
      </CardWrapper>
    </main>
  );
}
