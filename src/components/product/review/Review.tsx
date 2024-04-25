import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CommentRatings } from "@/components/ui/rating-stars";
import { toast } from "@/components/ui/use-toast";
import { likeAReviewAction } from "@/server/actions/product-review/likeAReviewAction";
import { formatName, getInitials } from "@/utils/formatName";
import { MoreHorizontalIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { ObjectId } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Review as ReviewTypes } from "@/types/review";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import React from "react";
import { cn } from "@/utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteReviewAction } from "@/server/actions/product-review/deleteReviewAction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ReviewType = {
  review: ReviewTypes;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

export default function UserReview({ review, refetch }: ReviewType) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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

    setIsLoading(true);

    try {
      const response = await likeAReviewAction(
        userIdString,
        review.product._id,
        action,
      );

      if (response?.success === true) {
        setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string, userId: string) => {
    setIsLoading(true);
    try {
      const response = await deleteReviewAction(reviewId, userId);

      if (response.success === true) {
        toast({
          description: response.message,
        });
        setIsLoading(false);
        _debouncedSubmit();
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-6">
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10 border">
              <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
              <AvatarFallback>
                {getInitials(review.user.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-4">
                  <h4 className="font-semibold">
                    {formatName(review.user.fullName)}
                  </h4>

                  <CommentRatings
                    rating={review.rating}
                    size={16}
                    fixed={true}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {`Order #${review.order}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleReviewLikeOrDislike("like")}
                  size="icon"
                  variant="ghost"
                >
                  <ThumbsUpIcon
                    className={cn("h-5 w-5", {
                      "fill-muted-foreground": review.likes.includes(userId),
                    })}
                  />
                </Button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {review.likes.length > 0 ? review.likes.length : null}
                </span>
                <Button
                  disabled={isLoading}
                  onClick={() => handleReviewLikeOrDislike("dislike")}
                  size="icon"
                  variant="ghost"
                >
                  <ThumbsDownIcon
                    className={cn("h-5 w-5", {
                      "fill-muted-foreground": review.dislikes.includes(userId),
                    })}
                  />
                </Button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {review.dislikes.length > 0 ? review.dislikes.length : null}
                </span>

                {session?.user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontalIcon className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <DropdownMenuItem
                            className=" w-full text-red-500"
                            onSelect={(e) => {
                              e.preventDefault();
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your review.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={(e) => {
                                e.stopPropagation();
                                () => handleDeleteReview(review._id, userId);
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold">{review.title}</h5>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {review.review}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
