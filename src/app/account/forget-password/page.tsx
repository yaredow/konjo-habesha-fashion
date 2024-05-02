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
      <Card className="mx-auto max-w-[36rem] flex-grow items-center p-6">
        <CardHeader>
          <CardTitle className=" pb-4">Reset Your Password</CardTitle>
          <CardDescription>
            We will send you an email to reset your password.
          </CardDescription>
        </CardHeader>
        <ForgetPasswordForm />
      </Card>
    </main>
  );
}
