import CardWrapper from "@/components/auth/CardWrapper";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import UpdateUserDataForm from "@/components/forms/UpdateUserDataForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getSession from "@/utils/getSession";

export default async function setting() {
  const session = await getSession();
  const user = session?.user;
  console.log(user);

  return (
    <div>
      <h1 className=" mb-8 text-center text-3xl font-semibold">
        Update your account
      </h1>
      <Tabs defaultValue="account" className=" my-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <CardWrapper
            title="Update your account"
            description="Fill the data to update your account"
            isLogin={false}
            showSocial={false}
          >
            <UpdateUserDataForm />
          </CardWrapper>
        </TabsContent>

        <TabsContent value="password">
          <CardWrapper
            title="Update your Password"
            description="You will be logged out once your password has been updated"
            isLogin={false}
            showSocial={false}
          >
            <UpdatePasswordForm />
          </CardWrapper>
        </TabsContent>
      </Tabs>
    </div>
  );
}
