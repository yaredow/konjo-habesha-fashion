import { Review } from "../../types/review";

function calculateRatingBreakdown(reviews: Review[]) {
  const ratingCounts = {
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
  const breakdown = Object.keys(ratingCounts).map((rating) => {
    const percentage = ((ratingCounts[rating] / totalReviews) * 100).toFixed(2);
    const color = getColorForRating(rating);
    return {
      rating,
      percentage,
      color,
    };
  });

  return breakdown;
}
