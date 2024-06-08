import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchReviews = async (productId: string) => {
  const { data } = await axios.get(
    `https://konjo-habesha-fashion.vercel.app/api/product/review/${productId}`,
  );

  return data;
};

export default function useGetReviews(productId: string) {
  const { data, isFetched, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews(productId),
  });

  return { reviews: data, isFetched, refetch };
}
