"use client";

import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommentRatings } from "@/components/ui/rating-stars";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import { useSession } from "next-auth/react";
import React, { useRef, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createProductReviewAction } from "@/server/actions/product-review/create-product-review";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import SubmitButton from "@/components/SubmitButton";

type ProductReviewType = {
  productId: string;
  refetch: () => void;
};

export default function ProductReview({
  productId,
  refetch,
}: ProductReviewType) {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [rating, setRating] = React.useState<number>(1);
  const userId = session?.user.id as string;
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    formData.append("rating", rating.toString());
    formData.append("userId", userId);
    formData.append("productId", productId);

    if (files) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    }

    setError("");
    setSuccess("");
    startTransition(() => {
      createProductReviewAction(formData)
        .then((data) => {
          if (data.success) {
            toast({
              description: data.success,
            });
            refetch();
            if (formRef.current) {
              formRef.current.reset();
            }
          } else {
            toast({
              variant: "destructive",
              description: data.error,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Something went wrong");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Leave a review</Button>
      </DialogTrigger>
      <DialogContent className=" mx-auto max-h-[50rem] overflow-y-scroll">
        <div className="max-w-2xl px-4 py-8 md:px-6">
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold">Leave a Review</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Share your thoughts on this product.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="grid gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating</Label>
                  <CommentRatings
                    aria-
                    rating={rating}
                    variant="yellow"
                    onRatingChange={handleRatingChange}
                    totalStars={5}
                  />
                </div>
              </div>

              <div className=" flex flex-grow flex-col gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  disabled={status === "authenticated"}
                  placeholder={
                    status === "authenticated"
                      ? session?.user?.name!
                      : "Full Name"
                  }
                  type="text"
                />
              </div>

              <div className=" flex flex-grow flex-col gap-2">
                <Label htmlFor="email">Email (Will not be published)</Label>
                <Input
                  disabled={status === "authenticated"}
                  placeholder={
                    status === "authenticated" ? session?.user?.email! : "Email"
                  }
                  type="email"
                />
              </div>

              <div className=" flex flex-grow flex-col gap-2">
                <Label htmlFor="email">Title</Label>
                <Input
                  name="title"
                  required
                  placeholder="Add a title to your review"
                  type="text"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="review">Review</Label>
                <Textarea
                  name="review"
                  className="min-h-[120px]"
                  placeholder="Write your review here..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="images">Images (optional)</Label>
                <ImageUploader files={files} setFiles={setFiles} />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />
              <SubmitButton isPending={isPending} />
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
