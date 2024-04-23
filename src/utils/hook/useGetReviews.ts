import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUserReviews() {
  const response = await axios.get("http://localhost:3000/api/product/review");
  console.log(response);

  return response.data;
}

export default function useGetReviews() {
  const { data, isFetched, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchUserReviews,
  });

  return { reviews: data, isFetched, refetch };
}
