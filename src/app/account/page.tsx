"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FaFacebookF } from "react-icons/fa6";
import { useState } from "react";
import { RegistrationDialog } from "@/components/registration-dialogue/RegistrationDialog";
import { ForgotPasswordDialog } from "@/components/forgot-password/ForgotPasswordDialog";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

function page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    const formData = form.getValues();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...formData,
      });
      console.log(res);
      if (res?.ok) {
        toast({
          description: "You have successfully signed in",
        });
        router.replace("/");
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong while signing in",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something happend!",
      });
    }
  };

  return (
    <main className=" fixed inset-0 my-auto flex items-center justify-center">
      <Card className=" mx-auto max-w-[36rem] flex-grow items-center p-6">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
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
                          <Input {...field} placeholder="email" type="text" />
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
                <Button type="submit">Login</Button>
              </div>
            </form>
          </Form>

          <div className=" mx-4 my-4 flex flex-row justify-between text-sm ">
            <RegistrationDialog />
            <ForgotPasswordDialog />
          </div>
        </CardContent>
        <CardFooter className=" grid grid-rows-1">
          <div className="mb-8 mt-2 flex flex-grow items-center">
            <hr className="border-1 w-full rounded-full" />
            <div className="mx-4 flex-none text-xs font-normal">
              OR LOGIN WITH
            </div>
            <hr className="border-1 w-full rounded-full" />
          </div>

          <div className="flex flex-row gap-4">
            <Button
              variant="outline"
              className=" flex w-1/2 items-center gap-2 text-lg"
            >
              <span>
                <FaGoogle />
              </span>
              Google
            </Button>

            <Button
              variant="outline"
              className=" flex w-1/2 items-center gap-2 text-lg font-semibold"
            >
              <span>
                <FaFacebookF />
              </span>
              Facebook
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default page;
