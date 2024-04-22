import ImageUploader from "@/components/ImageUploader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProductReviewAction } from "@/server/actions/product/createProductReviewAction";
import { CartItem } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProductReviewShcema = z.object({
  review: z.string().min(4, {
    message: "Review is required",
  }),
  rating: z.number().min(1, {
    message: "Please choose a review",
  }),
});

const initialState = {
  message: "",
};

export default function ProductReview() {
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [state, formAction] = useFormState(
    createProductReviewAction,
    initialState,
  );

  const form = useForm<z.infer<typeof ProductReviewShcema>>({
    resolver: zodResolver(ProductReviewShcema),
    defaultValues: {
      review: "",
      rating: 1,
    },
  });

  const handleReviewSubmit = () => {};

  return (
    <div className="max-w-2xl px-4 py-8 md:px-6">
      <div className="grid gap-6">
        <div>
          <h2 className="text-2xl font-bold">Leave a Review</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Share your thoughts on this product.
          </p>
        </div>
        <Form {...form}>
          <form
            action={formAction}
            onSubmit={handleReviewSubmit}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="review">Review</Label>
              <Textarea
                className="min-h-[120px]"
                id="review"
                placeholder="Write your review here..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <SelectItem value={(index + 1).toString()}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <ImageUploader files={files} setFiles={setFiles} />
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        </Form>

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
