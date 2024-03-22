"use client";

import { useForm } from "react-hook-form";
import { UpdatePasswordFormSchema } from "@/lib/utils/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SpinnerMini from "../ui/SpinnerMini";
import { useFormState, useFormStatus } from "react-dom";
import { updatePasswordAction } from "@/server/actions/account/updatePassword";
import { useEffect, useRef } from "react";
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
};

function UpdateUserPassword({ email }: { email: string }) {
  const formRef = useRef<HTMLFormElement>(null);

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

  useEffect(() => {
    if (state?.message === "success") {
      formRef.current?.reset();
    }
  }, []);

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
            {state?.message !== "" && (
              <div className=" text-red-500">{state.message}</div>
            )}
            <form
              ref={formRef}
              className=" grid gap-4 py-4"
              action={formAction}
              onSubmit={(evt) => {
                evt.preventDefault();
                form.handleSubmit(() => {
                  formAction(new FormData(formRef.current!));
                })(evt);
              }}
            >
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
