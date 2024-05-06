import CardWrapper from "@/components/auth/CardWrapper";
import SignupForm from "@/components/forms/SignupForm";

export default function page() {
  return (
    <main className="my-auto flex items-center justify-center">
      <CardWrapper
        title="Register"
        description="Fill the form below to create an account"
        showSocial
        isLogin={false}
        backButtonHref="/auth/signin"
        backButtonLabel="Go back to login"
      >
        <SignupForm />
      </CardWrapper>
    </main>
  );
}
