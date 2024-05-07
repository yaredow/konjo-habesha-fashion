"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../SubmitButton";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { forgotPasswordFormSchema } from "@/utils/validators/form-validators";
import { forgotPasswordAction } from "@/server/actions/account/forgotPasswordAction";

export default function ForgetPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (value: z.infer<typeof forgotPasswordFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      forgotPasswordAction(value);
    });
  };

  return (
    <Form {...form}>
      <form
        className=" grid w-full max-w-2xl gap-6 py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" type="email" />
                </FormControl>
                <FormMessage className=" mx-2" />
              </FormItem>
            );
          }}
        />

        <SubmitButton isPending={isLoading} />
      </form>
    </Form>
  );
}
