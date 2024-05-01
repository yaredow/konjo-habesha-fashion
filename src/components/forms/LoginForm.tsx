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
import { Button } from "../ui/button";
import SpinnerMini from "../ui/SpinnerMini";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const SubmitButtom = () => {
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? <SpinnerMini /> : "Submit"}</Button>;
};

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   const onSubmit = async () => {
  //     const formData = form.getValues();
  //     try {
  //       const res = await signIn("credentials", {
  //         redirect: false,
  //         ...formData,
  //       });
  //       console.log(res);
  //       if (res?.ok) {
  //         toast({
  //           description: "You have successfully signed in",
  //         });
  //         router.replace("/account/profile");
  //       } else {
  //         toast({
  //           variant: "destructive",
  //           description: res?.error,
  //         });
  //       }
  //     } catch (error: any) {
  //       throw new Error("Unexpected error during sign-in");
  //     }
  //   };

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
          <SubmitButtom />
        </div>
      </form>
    </Form>
  );
}
