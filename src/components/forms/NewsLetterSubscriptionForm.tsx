import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";
import { z } from "zod";
import { newsLetterFormSchema } from "@/utils/validators/form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function NewsLetterSubscriptionForm() {
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

        <Button className=" mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
