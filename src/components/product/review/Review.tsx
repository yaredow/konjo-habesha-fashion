import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CommentRatings } from "@/components/ui/rating-stars";
import { toast } from "@/components/ui/use-toast";
import { formatName, getInitials } from "@/utils/formatName";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useCallback, useTransition } from "react";
import { cn } from "@/utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  deleteReviewAction,
  likeOrDislikeAReviewAction,
} from "@/server/actions/product-review/actions";
import { FaEllipsisVertical } from "react-icons/fa6";
import { formatDate } from "@/utils/helpers";
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
import { ProductReviewType } from "@/../types/review";

type ReviewProps = {
  review: ProductReviewType;
  refetch: () => void;
};

export default function UserReview({ review, refetch }: ReviewProps) {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const onSubmit = () => refetch();
  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = useCallback(debouncedSubmit, [debouncedSubmit]);

  const handleReviewLikeOrDislike = async (action: "like" | "dislike") => {
    if (!user) {
      toast({
        variant: "destructive",
        description: "Please login to like a review",
      });
      router.push("/account");
      return;
    }

    startTransition(() => {
      likeOrDislikeAReviewAction(user.id!, review.id, action)
        .then((data) => {
          if (data.success) {
            _debouncedSubmit();
          }
        })
        .catch((error) => {
          console.error(error);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        });
    });
  };

  const handleDeleteReview = async (reviewId: string, userId: string) => {
    startTransition(() => {
      deleteReviewAction(reviewId, userId)
        .then((data) => {
          if (data.success) {
            toast({
              description: data.success,
            });
            _debouncedSubmit();
          } else {
            toast({
              variant: "destructive",
              description: data.error,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        });
    });
  };

  return (
    <div className="mx-auto grid grid-cols-2 rounded-lg border p-6 md:max-w-3xl">
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage alt="@shadcn" src={user?.image || ""} />
            <AvatarFallback>{getInitials(review.user.name!)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h3 className="font-semibold">{formatName(review.user.name!)}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {`Order #${review.order.id}`}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(review.createdAt)}
        </div>
      </div>

      <div className="relative grid gap-4">
        <div className="flex items-center gap-1">
          <CommentRatings
            fixed={true}
            variant="yellow"
            rating={review.rating}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {review.rating}
          </span>
        </div>
        <h4 className="font-semibold">{review.title}</h4>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {review.review}
        </div>
        <div className="absolute right-0 top-0 flex items-center gap-2">
          <Button
            onClick={() => handleReviewLikeOrDislike("like")}
            size="icon"
            variant="ghost"
          >
            <ThumbsUpIcon
              className={cn("h-5 w-5", {
                "fill-primary": review.likes.some(
                  (like) => like.userId === user?.id,
                ),
              })}
            />
          </Button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {review.likes.length > 0 ? review.likes.length : null}
          </span>
          <Button
            onClick={() => handleReviewLikeOrDislike("dislike")}
            size="icon"
            variant="ghost"
          >
            <ThumbsDownIcon
              className={cn("h-5 w-5", {
                "fill-primary": review.dislikes.some(
                  (dislike) => dislike.userId === user?.id,
                ),
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
                  <FaEllipsisVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      disabled={isPending}
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
                        This action cannot be undone. This will permanently
                        delete your review.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteReview(review.id, user?.id!);
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
    </div>
  );
}
