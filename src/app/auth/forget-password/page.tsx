import CardWrapper from "@/components/CardWrapper";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function page() {
  return (
    <main className="my-auto flex items-center justify-center">
      <CardWrapper
        title="Reset your password"
        description="We will send you an email to reset your password."
        isLogin={false}
        showSocial={false}
      >
        <ForgetPasswordForm />
      </CardWrapper>
    </main>
  );
}
