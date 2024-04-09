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
  Select as SingleSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/ui/multiple-selector";
import { useState } from "react";

const formSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  category: z.string(),
  size: z.string(),
  stockQuantity: z.coerce.number(),
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
  const [images, setImages] = useState([]);
  console.log(images);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      size: "",
      stockQuantity: 0,
      description: "",
    },
  });

  const onSubmit = async () => {
    const formData = form.getValues();

    const res = await fetch("api/products/create-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, images }),
    });

    const data = await res.json();

    if (res?.ok) {
      toast({
        description: data.message,
      });
    } else {
      console.log(data.message);
    }
  };

  return (
    <main className="my-auto flex flex-col items-center justify-center">
      <h2 className="mb-8 text-start text-xl font-bold">Add a new product</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full max-w-2xl items-center justify-center gap-8"
        >
          <div className=" flex flex-col space-y-8">
            <div className=" w-full ">
              <FormField
                control={form.control}
                name="name"
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
                          <Input {...field} placeholder="Price" type="number" />
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
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Kids">Kids</SelectItem>
                        </SelectContent>
                      </SingleSelect>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className=" w-full md:w-1/2">
                <MultipleSelector
                  defaultOptions={options}
                  placeholder="Select Size"
                />
              </div>

              <div className=" w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Stock Quantity"
                            type="number"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write product description"
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
