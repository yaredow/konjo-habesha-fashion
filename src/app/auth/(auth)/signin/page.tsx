import LoginForm from "@/components/forms/LoginForm";
import CardWrapper from "@/components/CardWrapper";

export default function page() {
  return (
    <main className=" my-auto flex items-center justify-center">
      <CardWrapper headerLabel="Login" isLogin={true} showSocial={true}>
        <LoginForm />
      </CardWrapper>
    </main>
  );
}
