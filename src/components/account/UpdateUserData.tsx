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

function UpdateUserData() {
  const accountForm = useForm<z.infer<typeof UpdateAccountFormSchema>>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = () => {};

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
            <form
              className=" grid gap-4 py-4"
              onSubmit={accountForm.handleSubmit(onSubmit)}
            >
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

              <Button className=" mt-4" type="submit">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

export default UpdateUserData;
