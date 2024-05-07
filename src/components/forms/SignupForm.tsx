"use client";

import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SignupFormSchema } from "@/utils/validators/form-validators";
import { register } from "@/server/actions/account/register";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";

export default function SignupForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  return (
    <Form {...form}>
      <form className=" grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isPending}
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
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isPending}
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

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isPending}
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
        <FormSuccess message={success} />
        <FormError message={error} />
        <SubmitButton isPending={isPending} />
      </form>
    </Form>
  );
}
