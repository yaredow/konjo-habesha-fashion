"use client";

import { useForm } from "react-hook-form";
import { UpdateAccountFormSchema } from "@/lib/utils/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import {
  FormState,
  updateUserData,
} from "@/server/actions/account/updateUserData";
import SpinnerMini from "../ui/SpinnerMini";
import React, { useEffect, useRef } from "react";
import { toast } from "../ui/use-toast";
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

const initialState: FormState = {
  message: "",
};

function SubmitUserData() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">{pending ? <SpinnerMini /> : "Submit change"}</Button>
  );
}

function UpdateUserData({ id }: { id: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const updateUserDataWithId = updateUserData.bind(null, id);
  const [state, formAction] = useFormState(updateUserDataWithId, initialState);

  const form = useForm<z.infer<typeof UpdateAccountFormSchema>>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: {
      fullName: "",
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
    <Card>
      <CardHeader>
        <CardTitle className=" tracking-normal">Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid gap-4">
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

              <SubmitUserData />
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

export default UpdateUserData;
