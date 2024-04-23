import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUserReviews(id: string) {
  const response = await axios.get(
    `http://localhost:3000/api/product/review/${id}`,
  );
  console.log(response);

  return response.data;
}

export default function useGetReviews(id: string) {
  const { data, isFetched, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchUserReviews(id),
  });

  return { reviews: data, isFetched, refetch };
}
