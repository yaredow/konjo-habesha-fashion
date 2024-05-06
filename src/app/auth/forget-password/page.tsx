import CardWrapper from "@/components/auth/CardWrapper";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";

export default function page() {
  return (
    <main className="my-auto flex items-center justify-center">
      <CardWrapper
        title="Reset your password"
        description="We will send you an email to reset your password."
        isLogin={false}
        showSocial={false}
        backButtonHref="/auth/signin"
        backButtonLabel="Go back to login"
      >
        <ForgetPasswordForm />
      </CardWrapper>
    </main>
  );
}
