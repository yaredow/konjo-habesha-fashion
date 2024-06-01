import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { newsLetterFormSchema } from "@/utils/validators/form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { newsLetterSubscriptionAction } from "@/server/actions/newsletter/newsLetterSubscriptionAction";
import { toast } from "../ui/use-toast";
import SubmitButton from "../SubmitButton";

export default function NewsLetterSubscriptionForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof newsLetterFormSchema>>({
    resolver: zodResolver(newsLetterFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newsLetterFormSchema>) => {
    startTransition(() => {
      newsLetterSubscriptionAction(values).then((data) => {
        if (data.success) {
          toast({
            description: data.success,
          });
          form.reset();
        } else {
          toast({
            variant: "destructive",
            description: data.error,
          });
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form className=" grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Full Name" type="text" />
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

        <SubmitButton isPending={isPending} />
      </form>
    </Form>
  );
}
