"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import ProductReview from "../product/review/ProductReview";
import { CommentRatings } from "../ui/rating-stars";
import RatingBreakdown from "../product/review/RatingBreakdown";
import useGetReviews from "@/utils/hook/useGetReviews";
import Spinner from "../Spinner";
import UserReview from "../product/review/Review";
import { Product, Review } from "@prisma/client";
import { ProductReviewType } from "../../../types/review";

type ReviewsProps = {
  reviews: Review[];
  isFetched: boolean;
  refetch: () => void;
};

type ReviewsTabProps = {
  id: string;
  product: Product;
  productRefetch: () => void;
};

export default function ReviewsTab({
  id,
  productRefetch,
  product,
}: ReviewsTabProps) {
  const {
    reviews,
    isFetched: isReviewsFetched,
    refetch: refetchReviews,
  }: ReviewsProps = useGetReviews(id);

  const avgRating = reviews?.reduce(
    (acc, review) => (acc + review.rating) / reviews.length,
    0,
  );

  return (
    <Tabs defaultValue="Description">
      <div className="mx-auto flex justify-center">
        <TabsList>
          <TabsTrigger value="Description">Description</TabsTrigger>
          <TabsTrigger value="Reviews">Reviews ({reviews?.length})</TabsTrigger>
        </TabsList>
      </div>
      <Separator className="mt-4" />
      <TabsContent className=" m-4" value="Description">
        <div className="mt-4 flex-wrap">{product?.description}</div>
      </TabsContent>
      <TabsContent value="Reviews">
        <div className=" mx-auto mb-4 mt-12 flex justify-center">
          <p
            className={
              reviews?.length! > 0
                ? "hidden"
                : "Be the first to rate this product"
            }
          ></p>
          <ProductReview productId={product.id} refetch={productRefetch} />
        </div>

        <div className="grid gap-4 pt-4">
          {reviews?.length! > 0 ? (
            <div className="mx-auto mb-4 grid w-full max-w-2xl gap-12 md:grid-cols-2">
              <Card className="grid gap-6 p-6">
                <CardHeader>
                  <CardTitle>Overal Rating</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4">
                  <div className="text-8xl font-bold">
                    {avgRating}
                    <span className="text-5xl text-gray-500 dark:text-gray-400">
                      / 5
                    </span>
                  </div>
                  <div className="flex items-center rounded-full bg-gray-100 px-3 py-2 dark:bg-gray-800">
                    <CommentRatings fixed={true} rating={avgRating as number} />
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {`out of ${reviews?.length} ${reviews?.length === 1 ? "review" : "reviews"}`}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="grid gap-6 p-6">
                <CardHeader>
                  <CardTitle>Rating Breakdown</CardTitle>
                </CardHeader>
                <RatingBreakdown reviews={reviews as Review[]} />
              </Card>
            </div>
          ) : (
            <p className=" text-center">Be the first to review this product</p>
          )}

          <Separator />

          <div className=" mt-4">
            <h1 className=" mb-4 text-center font-semibold">
              Reviews<span className=" ml-2">{`(${reviews?.length})`}</span>
            </h1>
            <ul>
              {!isReviewsFetched ? (
                <div className=" grid items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                reviews.map((review) => (
                  <li key={review.id}>
                    <UserReview
                      refetch={refetchReviews}
                      review={review as ProductReviewType}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
