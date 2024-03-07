"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";

const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

export function ForgotPasswordDialog() {
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    toast({
      description: "You have successfully registered",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Forgot your password?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Your Password</DialogTitle>
          <DialogDescription>
            We will send you an email to reset your password.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              className=" grid gap-4 py-4"
              onSubmit={form.handleSubmit(onSubmit)}
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
                      <FormMessage className=" mx-2" />
                    </FormItem>
                  );
                }}
              />

              <Button className=" mt-4" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
