import { Review } from "@prisma/client";

type RatingBreakdown = {
  rating: number;
  percentage: string;
  color: string;
};

function getColorForRating(rating: number): string {
  const colors: { [key: number]: string } = {
    1: "red",
    2: "orange",
    3: "yellow",
    4: "lightgreen",
    5: "green",
  };
  return colors[rating] || "gray";
}

export function calculateRatingBreakdown(reviews: Review[]): RatingBreakdown[] {
  const ratingCounts: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  // Count the number of reviews for each rating level
  reviews.forEach((review) => {
    if (ratingCounts[review.rating] !== undefined) {
      ratingCounts[review.rating]++;
    }
  });

  // Calculate the total number of reviews
  const totalReviews = reviews.length;

  // Calculate the percentage for each rating level
  const breakdown: RatingBreakdown[] = Object.keys(ratingCounts).map(
    (rating) => {
      const numericRating = parseInt(rating);
      const percentage =
        totalReviews > 0
          ? ((ratingCounts[numericRating] / totalReviews) * 100).toFixed(2)
          : "0.00";
      const color = getColorForRating(numericRating);
      return {
        rating: numericRating,
        percentage,
        color,
      };
    },
  );

  return breakdown;
}
