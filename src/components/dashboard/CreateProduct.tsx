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
import { useRef, useState } from "react";
import ImageUploadButton from "@/components/UploadButton";
import { CreateProductFormSchema } from "@/lib/utils/validators/form-validators";
import { useFormState, useFormStatus } from "react-dom";
import { createProductAction } from "@/server/actions/product/createProducts";
import SpinnerMini from "../ui/SpinnerMini";

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

export function CreateProductButton() {
  const { pending } = useFormStatus();

  return <Button>{pending ? <SpinnerMini /> : "Create Product"}</Button>;
}

function CreateProduct() {
  const formRef = useRef<HTMLFormElement>(null);
  const [images, setImages] = useState([]);
  console.log(images);

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

  const [state, formAction] = useFormState(createProductAction, initialState);

  const handleSubmitRegistration = async (
    evt: React.MouseEvent<HTMLFormElement>,
  ) => {
    evt.preventDefault();
    form.handleSubmit(() => {
      formAction(new FormData(formRef.current!));
    })(evt);
  };

  return (
    <div className="my-auto flex flex-col items-center justify-center">
      <h2 className="mb-8 text-start text-xl font-bold">Add a new product</h2>
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

            <ImageUploadButton setImages={setImages} />

            <CreateProductButton />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateProduct;
