"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../SubmitButton";
import { Input } from "../ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

export default function ForgetPasswordForm() {
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    toast({
      description: "You have successfully registered",
    });
  };

  return (
    <Card className="mx-auto max-w-[36rem] flex-grow items-center p-6">
      <CardHeader>
        <CardTitle className=" pb-4">Reset Your Password</CardTitle>
        <CardDescription>
          We will send you an email to reset your password.
        </CardDescription>
      </CardHeader>
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

          <SubmitButton />
        </form>
      </Form>
    </Card>
  );
}
