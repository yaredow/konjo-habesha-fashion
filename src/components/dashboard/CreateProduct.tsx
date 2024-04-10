"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateProductFormSchema } from "@/lib/utils/validators/form-validators";

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogContent,
} from "../ui/dialog";
import { PlusCircle } from "lucide-react";
import ImageUploader from "../ImageUploader";
import { MultiSelect } from "../ui/MultiSelect";
import { Controller } from "react-hook-form";

const options = [
  { value: "XS", label: "Extra Small" },
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
  { value: "XL", label: "Extra Large" },
  { value: "XXL", label: "Double Extra Large" },
];

export default function CreateProduct() {
  const [files, setFiles] = React.useState<File[] | null>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateProductFormSchema>>({
    resolver: zodResolver(CreateProductFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      sizes: [],
      stockQuantity: 0,
      description: "",
    },
  });

  const onSumbit = async () => {
    const formData = new FormData();
    const anotherformData = form.getValues();

    Object.keys(anotherformData).forEach((key) => {
      if (key in anotherformData) {
        formData.append(key, anotherformData[key]);
      }
    });

    if (files) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    }

    const res = await fetch(
      "http://localhost:3000/api/product/create-product",
      {
        method: "POST",

        body: formData,
      },
    );

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
    <Dialog>
      <DialogTrigger>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" overflow-auto">
        <DialogHeader>
          <DialogTitle>Create a product</DialogTitle>
        </DialogHeader>
        <div className="my-auto flex flex-col items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSumbit)}
              className=" w-full max-w-2xl items-center justify-center gap-4"
            >
              <div className=" flex flex-col space-y-8">
                <div className=" w-full ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
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
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Price"
                                type="number"
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
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Controller
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Kids">Kids</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                  <div className=" w-full md:w-1/2">
                    <FormField
                      control={form.control}
                      name="sizes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sizes</FormLabel>
                          <FormControl>
                            <Controller
                              control={form.control}
                              name="sizes"
                              render={({ field }) => (
                                <MultiSelect
                                  selected={field.value}
                                  options={options}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className=" w-full md:w-1/2">
                    <FormField
                      control={form.control}
                      name="stockQuantity"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
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
                      <FormLabel>Description</FormLabel>
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

                <ImageUploader files={files} setFiles={setFiles} />

                <Button type="submit">Create Product</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
