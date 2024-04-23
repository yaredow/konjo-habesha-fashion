import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CommentRatings } from "@/components/ui/rating-stars";
import { Review } from "@/types/review";
import { formatName, getInitials } from "@/utils/formatName";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

export default function UserReview({ review }: { review: Review }) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>
                  {getInitials(review.user.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <h4 className="font-medium">
                  {formatName(review.user.fullName)}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {` Order #${review.order.id}`}
                </p>
              </div>
            </div>

            <div className=" my-2">
              <CommentRatings fixed={true} rating={review.rating} />
            </div>

            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {review.review}
            </p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-2">
            <div className="flex items-center gap-1">
              <Button className="text-green-500" size="icon" variant="ghost">
                <ThumbsUpIcon className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {review.likes > 0 ? review.likes : null}
              </span>
              <Button className="text-red-500" size="icon" variant="ghost">
                <ThumbsDownIcon className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {review.dislikes > 0 ? review.dislikes : null}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
