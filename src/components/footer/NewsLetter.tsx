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
import NewsLetterSubscriptionForm from "../forms/NewsLetterSubscriptionForm";

function NewsLetter() {
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
            <NewsLetterSubscriptionForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewsLetter;
