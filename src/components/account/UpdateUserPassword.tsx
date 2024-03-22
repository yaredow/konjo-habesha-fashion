"use client";

import { useForm } from "react-hook-form";
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
import { UpdatePasswordFormSchema } from "@/lib/utils/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SpinnerMini from "../ui/SpinnerMini";
import { useFormState, useFormStatus } from "react-dom";
import { updatePasswordAction } from "@/server/actions/account/updatePassword";

function SubmitPassword() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">
      {pending ? <SpinnerMini /> : "Submit Passowrd"}
    </Button>
  );
}

const initialState = {
  message: "",
  errors: {},
};

function UpdateUserPassword({ email }: { email: string }) {
  const updatePasswordActionWithEmail = updatePasswordAction.bind(null, email);
  const [state, formAction] = useFormState(
    updatePasswordActionWithEmail,
    initialState,
  );

  const form = useForm<z.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },
  });

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
          <Form {...form}>
            <form className=" grid gap-4 py-4" action={formAction}>
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Current Password"
                          type="password"
                          name="currentPassword"
                        />
                      </FormControl>
                      <FormMessage className=" mx-2" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="New Password"
                          type="password"
                          name="newPassword"
                        />
                      </FormControl>
                      <FormMessage className=" mx-2" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Confirm Password"
                          type="password"
                          name="passwordConfirm"
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
  );
}

export default UpdateUserPassword;
