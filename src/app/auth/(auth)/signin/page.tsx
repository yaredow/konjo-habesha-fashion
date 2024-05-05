import LoginForm from "@/components/forms/LoginForm";
import CardWrapper from "@/components/CardWrapper";

export default function page() {
  return (
    <main className=" my-auto flex items-center justify-center">
      <CardWrapper
        title="Login"
        description="Provide your credentials to log in"
        isLogin={true}
        showSocial={true}
      >
        <LoginForm />
      </CardWrapper>
    </main>
  );
}
