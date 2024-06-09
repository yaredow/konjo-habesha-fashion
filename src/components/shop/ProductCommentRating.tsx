"use client";

import { Review } from "@prisma/client";
import { CommentRatings } from "../ui/rating-stars";
import useGetReviews from "@/utils/hook/useGetReviews";

export default function ProductCommentRating({
  productId,
}: {
  productId: string;
}) {
  console.log("productId: ", productId);
  const { reviews, isFetched }: { reviews: Review[]; isFetched: boolean } =
    useGetReviews(productId);

  const avgRating = reviews?.reduce(
    (acc, review) => (acc + review.rating) / reviews.length,
    0,
  );

  if (isFetched) return null;

  return (
    <div className="flex items-center gap-4">
      <CommentRatings fixed={true} rating={avgRating} />
    </div>
  );
}
