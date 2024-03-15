"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Select from "react-select";

import Link from "next/link";
import {
  Select as SingleSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const formSchema = z.object({
  productName: z.string(),
  price: z.number(),
  category: z.string(),
  size: z.string(),
  stockQuantity: z.number(),
  description: z.string(),
});

const options = [
  { value: "XS", label: "Extra Small" },
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
  { value: "XL", label: "Extra Large" },
  { value: "XXL", label: "Double Extra Large" },
];

function page() {
  const { control } = useForm();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      price: 0,
      category: "",
      size: "",
      stockQuantity: 0,
      description: "",
    },
  });

  const onSubmit = () => {
    toast({
      description: "Your message has been sent successfully!",
    });
  };

  return (
    <main className="my-auto flex flex-col items-center justify-center">
      <h2 className="mb-4 text-start text-xl font-bold">Add a new product</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full max-w-2xl items-center justify-center gap-6"
        >
          <div className=" flex flex-col space-y-6">
            <div className=" w-full ">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Product Name"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className=" w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="$200" type="text" />
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <SingleSelect
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="kids">Kids</SelectItem>
                        </SelectContent>
                      </SingleSelect>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className=" w-full md:w-1/2">
                <Controller
                  control={control}
                  name="sizes"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      options={options}
                      onChange={onChange}
                      isMulti={true}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                    />
                  )}
                />
              </div>

              <div className=" w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="$200" type="text" />
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
              name="description"
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
    </main>
  );
}

export default page;
