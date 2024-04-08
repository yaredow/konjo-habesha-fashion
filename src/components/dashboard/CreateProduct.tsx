"use client";

import React from "react";
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
import { CreateProductFormSchema } from "@/lib/utils/validators/form-validators";
import { useFormState, useFormStatus } from "react-dom";
import { createProductAction } from "@/server/actions/product/createProducts";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogContent,
} from "../ui/dialog";
import { PlusCircle } from "lucide-react";
import SpinnerMini from "../ui/SpinnerMini";
import { AvatarUpload } from "../ImageUploader";

const options = [
  { value: "XS", label: "Extra Small" },
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
  { value: "XL", label: "Extra Large" },
  { value: "XXL", label: "Double Extra Large" },
];

const initialState = {
  message: "",
};

function CreateProductButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">{pending ? <SpinnerMini /> : "Register"}</Button>
  );
}

export default function CreateProduct() {
  const [state, formAction] = useFormState(createProductAction, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [images, setImages] = React.useState([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateProductFormSchema>>({
    resolver: zodResolver(CreateProductFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      size: "",
      stockQuantity: 0,
      description: "",
    },
  });

  const handleSubmitRegistration = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });

    form.handleSubmit(() => {
      formAction(formData);
    })(evt);
  };

  React.useEffect(() => {
    if (state?.message !== "" && state?.message === "success") {
      toast({
        description: "You have registered successfully",
      });
    }
    form.reset();
  }, [state?.message]);

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a product</DialogTitle>
        </DialogHeader>
        <div className="my-auto flex flex-col items-center justify-center">
          <Form {...form}>
            {state?.message !== "" && state?.message !== "success" && (
              <div className=" text-red-500">{state.message}</div>
            )}
            <form
              ref={formRef}
              onSubmit={handleSubmitRegistration}
              action={formAction}
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

                <AvatarUpload />

                <CreateProductButton />
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
