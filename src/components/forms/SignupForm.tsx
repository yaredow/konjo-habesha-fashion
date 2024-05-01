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
import { registrationFormSchema } from "@/utils/validators/form-validators";
import { useFormState } from "react-dom";
import { register } from "@/server/actions/account/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { toast } from "../ui/use-toast";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const initialState = {
  message: "",
};

export default function SignupForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(register, initialState);

  const handleSubmitRegistration = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    form.handleSubmit(() => {
      formAction(new FormData(formRef.current!));
    })(evt);
  };

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
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
    <Card className=" min-w-3xl w-full">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Provide the following information to create a new account
        </CardDescription>
        <Form {...form}>
          {state?.message !== "" && state?.message !== "success" && (
            <div className=" text-red-500">{state.message}</div>
          )}
          <form
            ref={formRef}
            className=" grid gap-4 py-4"
            action={formAction}
            onSubmit={handleSubmitRegistration}
          >
            <FormField
              control={form.control}
              name="fullName"
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
