"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { registrationFormSchema } from "@/lib/utils/validators/form-validators";
import React, { useEffect, useRef, useState } from "react";
import { register } from "@/server/actions/account/register";
import { useFormState, useFormStatus } from "react-dom";
import SpinnerMini from "../ui/SpinnerMini";
import SubmitButton from "../SubmitButton";

const initialState = {
  message: "",
};

export function RegistrationDialog() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(register, initialState);

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmitRegistration = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    form.handleSubmit(() => {
      formAction(new FormData(formRef.current!));
    })(evt);
  };

  useEffect(() => {
    if (state?.message !== "" && state?.message === "success") {
      toast({
        description: "You have registered successfully",
      });
    }
    form.reset();
  }, [state?.message]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link">
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[600px] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Fill out the detail below to create your account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
