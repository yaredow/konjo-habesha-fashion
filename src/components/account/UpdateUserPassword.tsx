import { auth } from "@/auth";
import UpdatePasswordForm from "../forms/UpdatePasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { redirect } from "next/navigation";

export default async function UpdateUserPassword() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/account");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" tracking-normal">Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid gap-4">
          <UpdatePasswordForm />
        </div>
      </CardContent>
    </Card>
  );
}
