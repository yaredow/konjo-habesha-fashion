"use client";

import { useForm } from "react-hook-form";
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
import { UpdateAccountFormSchema } from "@/lib/utils/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { updateUserData } from "@/server/actions/account/updateUserData";
import SpinnerMini from "../ui/SpinnerMini";

const initialState = {
  message: "",
  errors: {},
};

function SubmitUserData() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">{pending ? <SpinnerMini /> : "Submit change"}</Button>
  );
}

function UpdateUserData() {
  const [state, formAction] = useFormState(updateUserData, initialState);
  const accountForm = useForm<z.infer<typeof UpdateAccountFormSchema>>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

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
          <Form {...accountForm}>
            <form className=" grid gap-4 py-4" action={formAction}>
              <FormField
                control={accountForm.control}
                name="fullName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Name"
                          type="text"
                          name="fullName"
                        />
                      </FormControl>
                      <FormMessage className=" mx-2" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={accountForm.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email"
                          type="email"
                          name="email"
                        />
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
