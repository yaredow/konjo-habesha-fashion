import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CommentRatings } from "@/components/ui/rating-stars";
import { toast } from "@/components/ui/use-toast";
import { likeAReviewAction } from "@/server/actions/product/likeAReviewAction";
import { formatName, getInitials } from "@/utils/formatName";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { ObjectId } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Review as ReviewTypes } from "@/types/review";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import React from "react";
import { cn } from "@/utils/cn";

type ReviewType = {
  review: ReviewTypes;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

export default function UserReview({ review, refetch }: ReviewType) {
  const [isLiking, setIsLiking] = React.useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user._id as ObjectId;
  const userIdString = userId?.toString();

  const onSubmit = () => refetch();
  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = React.useCallback(debouncedSubmit, []);

  const handleReviewLikeOrDislike = async (action: "like" | "dislike") => {
    if (!userId) {
      toast({
        variant: "destructive",
        description: "Please login to like a review",
      });
      router.push("/account");
      return;
    }

    setIsLiking(true);

    try {
      const response = await likeAReviewAction(
        userIdString,
        review.product._id,
        action,
      );

      if (response?.success === true) {
        setIsLiking(false);
        _debouncedSubmit();
      } else {
        console.error("Error updating review likes/dislikes", response);
        toast({
          variant: "destructive",
          description: "Failed to update review",
        });
      }
    } catch (error) {
      console.error("Error handling like/dislike action:", error);
      toast({
        variant: "destructive",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLiking(false);
    }
  };

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
              <Button
                disabled={isLiking}
                onClick={() => handleReviewLikeOrDislike("like")}
                size="icon"
                variant="ghost"
              >
                <ThumbsUpIcon
                  className={cn("h-5 w-5", {
                    "text-gray-500": review.likes.includes(userId),
                  })}
                />
              </Button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {review.likes.length > 0 ? review.likes.length : null}
              </span>
              <Button
                disabled={isLiking}
                onClick={() => handleReviewLikeOrDislike("dislike")}
                size="icon"
                variant="ghost"
              >
                <ThumbsDownIcon
                  className={cn("h-5 w-5", {
                    "text-green": review.dislikes.includes(userId),
                  })}
                />
              </Button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {review.dislikes.length > 0 ? review.dislikes.length : null}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
