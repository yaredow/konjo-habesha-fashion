import { auth } from "@/auth";
import UpdateUserDataForm from "../forms/UpdateUserDataForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { redirect } from "next/navigation";
import { User } from "next-auth";

type UserType = {
  user: User | undefined;
};

export default async function UpdateUserData({ user }: UserType) {
  if (!user) {
    redirect("/account");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" tracking-normal">Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
        <CardContent>
          <div className="grid gap-4">
            <UpdateUserDataForm user={user} />
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
