"use client";

import { useEffect, useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState } from "react-dom";
import { register } from "@/server/actions/account/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { toast } from "../ui/use-toast";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SignupFormSchema } from "@/utils/validators/form-validators";
import { X } from "lucide-react";

export default function SignupForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(register, undefined);

  const handleSubmitRegistration = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    form.handleSubmit(() => {
      formAction(new FormData(formRef.current!));
    })(evt);
  };

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      ...(state?.fields ?? {}),
    },
  });

  useEffect(() => {
    if (state?.message !== "" && state?.message === "success") {
      toast({
        description: "You have registered successfully",
      });
    }
    form.reset();
  }, [state?.message]);

  return (
    <Card className="mx-auto max-w-[36rem] flex-grow items-center p-6">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Provide the following information to create a new account
        </CardDescription>
        <Form {...form}>
          {state?.message !== "" && state?.message !== "success" && (
            <div className=" text-red-500">{state?.message}</div>
          )}

          {state?.issues && (
            <div className="text-red-500">
              <ul>
                {state.issues.map((issue) => (
                  <li key={issue} className="flex gap-1">
                    <X fill="red" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form
            ref={formRef}
            className=" grid gap-4 py-4"
            action={formAction}
            onSubmit={handleSubmitRegistration}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Name" type="text" />
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
                      <Input {...field} placeholder="Email" type="email" />
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
      </CardHeader>
    </Card>
  );
}
