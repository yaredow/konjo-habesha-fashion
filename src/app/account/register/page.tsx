"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import {
  Card,
  CardContent,
  CardDescription,
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
import Link from "next/link";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

function page() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    toast({
      description: "You have logged in successfully!",
    });
  };

  return (
    <main className=" fixed inset-0 my-auto flex items-center justify-center">
      <Card className=" mx-auto max-w-[36rem] flex-grow items-center p-6">
        <CardHeader className=" mb-2">
          <CardTitle className=" mb-2">Create an account</CardTitle>
          <CardDescription>
            Fill out the detail below to create your account
          </CardDescription>
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
                          <Input {...field} placeholder="Name" type="text" />
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
                            placeholder="Email"
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
                  name="password"
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
                <Button type="submit">Register</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className=" -my-2 mx-4 flex flex-row justify-between text-sm">
          <p>Already have an account?</p>
          <Link
            className=" hover:underline hover:underline-offset-4"
            href="/account"
          >
            Login
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

export default page;
