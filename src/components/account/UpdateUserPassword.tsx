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
import { useEffect, useRef, useState } from "react";
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
import { toast } from "../ui/use-toast";

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
  const [toastKey, setToastKey] = useState("");

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

  const handlePasswordSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    formAction(new FormData(formRef.current!));
    form.reset();
  };

  useEffect(() => {
    if (state?.message !== "") {
      console.log(state.message);
      if (state.message === "success") {
        toast({
          description: "Password has been updated successfully",
          key: toastKey,
        });
      } else {
        toast({
          variant: "destructive",
          description: state.message,
        });
      }
    }
  }, [state?.message]);

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
            <form
              ref={formRef}
              className=" grid gap-4 py-4"
              action={formAction}
              onSubmit={handlePasswordSubmit}
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
