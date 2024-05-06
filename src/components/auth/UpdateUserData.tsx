import UpdateUserDataForm from "../forms/UpdateUserDataForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function UpdateUserData() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" tracking-normal">Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
        <CardContent>
          <div className="grid gap-4">
            <UpdateUserDataForm />
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
