"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

const newsLetterFormSchema = z.object({
  fullName: z.string().refine(
    (value) => {
      if (value !== "") {
        const names = value.trim().split(" ");
        return names.length === 2 && names.every((name) => name.length > 0);
      }
    },
    {
      message: "Please enter your full name with both first and last names.",
    },
  ),
  email: z.string().email(),
});

function NewsLetter() {
  const form = useForm<z.infer<typeof newsLetterFormSchema>>({
    resolver: zodResolver(newsLetterFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async () => {
    toast({
      description: "You have successfully subscribed to our newsletter",
    });
  };

  return (
    <div className=" mb-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Subscribe</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subscribe to our newsletter</DialogTitle>
            <DialogDescription>Please fill ou the below form</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                className=" grid gap-4 py-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Full Name"
                            type="text"
                          />
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

                <Button className=" mt-4" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewsLetter;
