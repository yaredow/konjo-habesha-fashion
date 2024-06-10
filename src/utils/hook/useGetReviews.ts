import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchReviews = async (id: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/product/review/${id}`,
    );

    return data.reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export default function useGetReviews(id: string) {
  console.log(id);
  const {
    data: reviews,
    isFetched,
    refetch,
    error,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchReviews(id),
  });

  if (error) {
    console.error("Error fetching reviews:", error);
  }

  return { reviews, isFetched, refetch };
}
