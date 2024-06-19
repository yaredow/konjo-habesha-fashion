"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ContactUsFromSchema,
  contactFormSchema,
} from "@/utils/validators/form-validators";
import { useState, useTransition } from "react";
import { toast } from "../ui/use-toast";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";
import SubmitButton from "../SubmitButton";
import { contactUsAction } from "@/server/actions/contact-us/actions";

export default function ContactUsForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ContactUsFromSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      contactUsAction(values)
        .then((data) => {
          if (data.success) {
            toast({
              description: data.success,
            });
          } else {
            toast({
              variant: "destructive",
              description: data.error,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Something went wrong");
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full max-w-2xl items-center justify-center gap-6"
      >
        <div className=" flex flex-col space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className=" w-full md:w-1/2">
              <FormField
                control={form.control}
                name="name"
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
            </div>

            <div className=" w-full md:w-1/2">
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
            </div>
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Phone" type="phone" />
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
                    placeholder="Write your message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSuccess message={success} />
          <FormError message={error} />
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
