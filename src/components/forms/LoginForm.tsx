"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form className="w-full flex-grow items-center justify-center gap-4">
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
                    <Input {...field} placeholder="password" type="password" />
                  </FormControl>
                  <FormMessage className=" mx-2" />
                </FormItem>
              );
            }}
          />
          <SubmitButton />
        </div>
      </form>
    </Form>
  );
}
