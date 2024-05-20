import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Review } from "@prisma/client";
import { StarIcon } from "lucide-react";

export default function RatingBreakdown({ reviews }: { reviews: Review[] }) {
  return (
    <CardContent className="grid gap-4">
      {reviews &&
        reviews.length > 0 &&
        Array.from({ length: 5 }).map((_, index) => {
          const ratingLevel = 5 - index;
          const count = reviews.filter(
            (review) => review.rating === ratingLevel,
          ).length;
          const totalReviews = reviews.length;
          const percentage = (count / totalReviews) * 100;

          return (
            <div key={ratingLevel} className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                {ratingLevel}
                <StarIcon className={`h-4 w-4 shrink-0 fill-yellow-500`} />
              </div>
              <Progress className=" bg-primary-foreground" value={percentage} />
              {percentage.toFixed(1)}%
            </div>
          );
        })}
    </CardContent>
  );
}
