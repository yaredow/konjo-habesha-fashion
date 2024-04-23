"use client";

import ImageUploader from "@/components/ImageUploader";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommentRatings } from "@/components/ui/rating-stars";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { createProductReviewAction } from "@/server/actions/product/createProductReviewAction";
import { cn } from "@/utils/cn";

import { useSession } from "next-auth/react";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ProductReview({ productId }: { productId: string }) {
  const { data: session, status } = useSession();
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [rating, setRating] = React.useState<number>(1);
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const userId = session?.user._id;

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    formData.append("rating", rating.toString());
    console.log(formData);

    if (files) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    }

    setIsloading(true);
    const response = await createProductReviewAction(
      formData,
      userId,
      productId,
    );

    if (response.success) {
      toast({
        description: response.message,
      });
      setIsloading(false);
    } else {
      toast({
        variant: "destructive",
        description: response.message,
      });
      setIsloading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link">Leave a review</Button>
      </DialogTrigger>
      <DialogContent className=" mx-auto max-h-screen overflow-y-scroll">
        <div className="max-w-2xl px-4 py-8 md:px-6">
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold">Leave a Review</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Share your thoughts on this product.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating</Label>
                  <CommentRatings
                    rating={rating}
                    variant="yellow"
                    onRatingChange={handleRatingChange}
                    totalStars={5}
                  />
                </div>
              </div>

              <div className=" flex flex-row gap-2">
                <div className=" flex flex-grow flex-col gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    disabled={status === "authenticated"}
                    placeholder={
                      status === "authenticated"
                        ? session?.user?.name
                        : "Full Name"
                    }
                    type="text"
                  />
                </div>

                <div className=" flex flex-grow flex-col gap-2">
                  <Label htmlFor="email">Email (Won't be published)</Label>
                  <Input
                    disabled={status === "authenticated"}
                    placeholder={
                      status === "authenticated"
                        ? session?.user?.email
                        : "Email"
                    }
                    type="email"
                  />
                </div>
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
                <ImageUploader files={files} setFiles={setFiles} />
              </div>

              <Button type="submit">
                {isLoading ? (
                  <Spinner className={cn({ "text-white": isLoading })} />
                ) : status === "unauthenticated" ? (
                  "Login to review"
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
