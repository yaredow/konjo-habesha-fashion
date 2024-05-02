"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { updatePasswordAction } from "@/server/actions/account/updatePassword";
import { useEffect, useRef } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";
import { signOut } from "next-auth/react";
import { UpdatePasswordFormSchema } from "@/utils/validators/form-validators";
import SubmitButton from "../SubmitButton";

const initialState = {
  message: "",
};

export default function UpdatePasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(updatePasswordAction, initialState);

  const form = useForm<z.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },
  });

  const handlePasswordSubmit = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    form.handleSubmit(() => {
      formAction(new FormData(formRef.current!));
    })(evt);
  };

  useEffect(() => {
    if (state?.message !== "" && state?.message === "success") {
      toast({
        description: "Password has been updated successfully",
      });
      form.reset();
      signOut({ callbackUrl: "http://localhost:3000/account" });
    }
  }, [state?.message]);

  return (
    <Form {...form}>
      {state?.message !== "" && state?.message !== "success" && (
        <div className=" text-red-500">{state.message}</div>
      )}
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

        <SubmitButton />
      </form>
    </Form>
  );
}
