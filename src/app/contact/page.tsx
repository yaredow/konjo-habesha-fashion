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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const formSchema = z.object({
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
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  message: z.string().max(1000, {
    message: "Message must not be longer than 1000 characters.",
  }),
});

function page() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    toast({
      description: "Your message has been sent successfully!",
    });
  };

  return (
    <main className=" fixed inset-0 my-auto flex items-center justify-center">
      <Card className="mx-auto max-w-2xl items-center p-6">
        <CardHeader>
          <CardTitle className=" pb-4">Contact Us</CardTitle>
          <CardDescription>
            Have a question or need assistance? Feel free to reach out to us
            using the form below. We&apos;re here to help!
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      name="fullName"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Full name"
                                type="text"
                              />
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
                              <Input
                                {...field}
                                placeholder="Email"
                                type="email"
                              />
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

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

export default page;
