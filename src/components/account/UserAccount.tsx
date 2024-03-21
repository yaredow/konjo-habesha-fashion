"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updatePasswordAction } from "@/server/actions/account/updatePassword";
import SpinnerMini from "../ui/SpinnerMini";
import {
  UpdateAccountFormSchema,
  UpdatePasswordFormSchema,
} from "@/lib/utils/Schemas";
import { FormState } from "../../../type";

export function SubmitPassword() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">
      {pending ? <SpinnerMini /> : "Submit Passowrd"}
    </Button>
  );
}

function UpdateAccount({ email }: { email: string }) {
  const updatePasswordActionWithEmail = updatePasswordAction.bind(null, email);
  const [state, formAction] = useFormState(updatePasswordActionWithEmail, {
    message: "",
    fieldValues: {
      email,
    },
  });

  const accountForm = useForm<z.infer<typeof UpdateAccountFormSchema>>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },
  });

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
                      onSubmit={accountForm.handleSubmit(onSubmitPasswordForm)}
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
                      action={formAction.bind(null, email)}
                    >
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Current Password"
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
                        name="newPassword"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="New Password"
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

                      <SubmitPassword />
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
