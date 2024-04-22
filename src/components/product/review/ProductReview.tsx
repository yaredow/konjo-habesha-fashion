import ImageUploader from "@/components/ImageUploader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommentRatings } from "@/components/ui/rating-stars";
import { Textarea } from "@/components/ui/textarea";
import { createProductReviewAction } from "@/server/actions/product/createProductReviewAction";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

export default function ProductReview() {
  const { data: session, status } = useSession();
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [rating, setRating] = React.useState<number>(1);
  const [review, setReview] = React.useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("rating", rating.toString());
    formData.append("email", session?.user.email.toString());
    formData.append("review", review);
    if (files) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await createProductReviewAction(formData);
  };

  return (
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
                  status === "authenticated" ? session?.user?.name : "Full Name"
                }
                type="text"
              />
            </div>

            <div className=" flex flex-grow flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled={status === "authenticated"}
                placeholder={
                  status === "authenticated" ? session?.user?.email : "Email"
                }
                type="email"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="review">Review</Label>
            <Textarea
              onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                setReview(evt.target.value);
              }}
              className="min-h-[120px]"
              id="review"
              placeholder="Write your review here..."
            />
          </div>

          <div className="grid gap-2">
            <ImageUploader files={files} setFiles={setFiles} />
          </div>
          <Button
            onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
              evt.preventDefault();
            }}
            type="submit"
          >
            {status === "unauthenticated" ? "Login to review" : "Submit"}
          </Button>
        </form>

        <div className="grid gap-4 border-t pt-4 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage alt="User Image" src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-sm">
                <div className="font-medium">John Doe</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Order #12345
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <time className="text-sm text-gray-500 dark:text-gray-400">
                2 days ago
              </time>
              <div className="flex items-center gap-1 text-sm font-medium">
                <ThumbsUpIcon className="h-5 w-5 fill-primary" />
                <span>12</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <ThumbsDownIcon className="h-5 w-5 fill-primary" />
                <span>3</span>
              </div>
            </div>
          </div>
          <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
            <p>
              The product I purchased is absolutely stunning! The quality of the
              fabric and the intricate embroidery are truly impressive. It fits
              perfectly and is so comfortable to wear. I can't wait to wear it
              to my next event.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
