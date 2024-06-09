import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchReviews = async (id: string) => {
  console.log(id);
  const { data } = await axios.get(
    `http://localhost:3000/api/product/review/${id}`,
  );

  console.log(data);

  return data.reviews;
};

export default function useGetReviews(id: string) {
  console.log(id);
  const {
    data: reviews,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchReviews(id),
  });

  return { reviews, isFetched, refetch };
}
