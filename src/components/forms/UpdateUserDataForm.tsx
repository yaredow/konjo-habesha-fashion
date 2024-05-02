"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect, useRef } from "react";
import { UpdateAccountFormSchema } from "@/utils/validators/form-validators";

import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { updateUserData } from "@/server/actions/account/updateUserData";
import SubmitButton from "../SubmitButton";
import { toast } from "../ui/use-toast";
import { User } from "next-auth";

const initialState = {
  message: "",
};

type UserDataType = {
  user: User;
};

export default function UpdateUserDataForm({ user }: UserDataType) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(updateUserData, initialState);

  const form = useForm<z.infer<typeof UpdateAccountFormSchema>>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  const handleSubmitData = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    form.handleSubmit(() => {
      formAction(new FormData(formRef.current!));
    })(evt);
  };

  useEffect(() => {
    if (state?.message !== "") {
      if (state?.message === "success") {
        toast({
          description: "Username updated successfully",
        });
      }
      form.reset();
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
        onSubmit={handleSubmitData}
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

        <SubmitButton />
      </form>
    </Form>
  );
}
