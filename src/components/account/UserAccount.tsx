import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const updatePasswordFormSchema = z
  .object({
    password: z.string().min(8),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return (data.password = data.passwordConfirm);
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    },
  );

const updateAccountFormSchema = z.object({
  fullName: z.string().refine(
    (value) => {
      if (value !== "") {
        const names = value.trim().split(" ");
        return names.length === 2 && names.every((name) => name.length > 0);
      }
    },
    {
      message: "Please enter your full name with both first and last names.",
    },
  ),
  email: z.string().email(),
});

function UpdateAccount() {
  const accountForm = useForm<z.infer<typeof updateAccountFormSchema>>({
    resolver: zodResolver(updateAccountFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof updatePasswordFormSchema>>({
    resolver: zodResolver(updatePasswordFormSchema),
  });

  const onSubmitAccountForm = () => {};

  const onSubmitPasswordForm = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Update</Button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center sm:max-w-[425px] md:max-w-[540px]">
        <Tabs defaultValue="account" className=" my-4 w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          {/* Name and email updating form */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className=" tracking-normal">Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid gap-4">
                  <Form {...accountForm}>
                    <form
                      className=" grid gap-4 py-4"
                      onSubmit={accountForm.handleSubmit(onSubmitAccountForm)}
                    >
                      <FormField
                        control={accountForm.control}
                        name="fullName"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Name"
                                  type="text"
                                />
                              </FormControl>
                              <FormMessage className=" mx-2" />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={accountForm.control}
                        name="email"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Email"
                                  type="email"
                                />
                              </FormControl>
                              <FormMessage className=" mx-2" />
                            </FormItem>
                          );
                        }}
                      />

                      <Button className=" mt-4" type="submit">
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Password updating form */}
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle className=" tracking-normal">Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid gap-4">
                  <Form {...passwordForm}>
                    <form
                      className=" grid gap-4 py-4"
                      onSubmit={passwordForm.handleSubmit(onSubmitPasswordForm)}
                    >
                      <FormField
                        control={passwordForm.control}
                        name="password"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Password"
                                  type="password"
                                />
                              </FormControl>
                              <FormMessage className=" mx-2" />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="passwordConfirm"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Confirm Password"
                                  type="password"
                                />
                              </FormControl>
                              <FormMessage className=" mx-2" />
                            </FormItem>
                          );
                        }}
                      />

                      <Button className=" mt-4" type="submit">
                        Save Passowrd
                      </Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateAccount;
