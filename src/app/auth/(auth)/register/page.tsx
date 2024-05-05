import CardWrapper from "@/components/CardWrapper";
import SignupForm from "@/components/forms/SignupForm";

export default function page() {
  return (
    <main className="my-auto flex items-center justify-center">
      <CardWrapper
        title="Register"
        description="Fill the form below to create an account"
        showSocial
        isLogin={false}
      >
        <SignupForm />
      </CardWrapper>
    </main>
  );
}
