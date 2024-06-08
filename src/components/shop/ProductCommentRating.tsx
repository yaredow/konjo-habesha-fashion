"use client";

import { Review } from "@prisma/client";
import { CommentRatings } from "../ui/rating-stars";
import useGetReviews from "@/utils/hook/useGetReviews";

export default function ProductCommentRating({
  productId,
}: {
  productId: string;
}) {
  const { reviews }: { reviews: Review[] } = useGetReviews(productId);
  const avgRating = reviews?.reduce(
    (acc, review) => (acc + review.rating) / reviews.length,
    0,
  );

  return (
    <div className="flex items-center gap-4">
      <CommentRatings fixed={true} rating={avgRating} />
    </div>
  );
}
