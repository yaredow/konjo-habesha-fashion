import CardWrapper from "@/components/auth/CardWrapper";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import UpdateUserDataForm from "@/components/forms/UpdateUserDataForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function setting() {
  return (
    <div className="mx-8 items-center justify-center md:mx-20 md:my-12">
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
            backButtonHref="/profile"
            backButtonLabel="Back to profile"
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
            backButtonHref="/profile"
            backButtonLabel="Back to profile"
          >
            <UpdatePasswordForm />
          </CardWrapper>
        </TabsContent>
      </Tabs>
    </div>
  );
}
