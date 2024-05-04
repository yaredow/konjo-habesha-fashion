"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { authenticate } from "@/server/actions/account/authenticate";
import { loginFormSchema } from "@/utils/validators/form-validators";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { useState, useTransition } from "react";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  console.log(error);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      authenticate(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-grow items-center justify-center gap-4"
      >
        <div className=" flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="email"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className=" mx-2" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className=" mx-2" />
                </FormItem>
              );
            }}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
