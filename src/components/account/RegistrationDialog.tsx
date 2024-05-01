"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import React, { useEffect, useRef, useState } from "react";
import { register } from "@/server/actions/account/register";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "../LogoutButton";
import { registrationFormSchema } from "@/utils/validators/form-validators";

export function RegistrationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[600px] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Fill out the detail below to create your account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
      </DialogContent>
    </Dialog>
  );
}
