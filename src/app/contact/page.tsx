"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  fullName: z.string().refine((value) => {
    const names = value.trim().split(" ");
    return (
      names.length === 2 && names.every((name) => name.length > 0),
      {
        message: "Please enter your full name with both first and last names.",
      }
    );
  }),
  email: z.string().email(),
  message: z.string().max(1000, {
    message: "Bio must not be longer than 30 characters.",
  }),
});

function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit() {}

  return (
    <main className=" mx-auto flex flex-col items-center justify-center gap-8">
      <div className=" text-md mx-auto mb-6 flex max-w-md flex-col justify-center text-center">
        <h2 className="font-custom mb-6 text-3xl font-semibold ">Contact Us</h2>
        <p>
          Have a question or need assistance? Feel free to reach out to us using
          the form below. We&apos;re here to help!
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex w-full max-w-md flex-col gap-6"
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
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Full name" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="write your message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default page;
