import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProduct(id: string) {
  const { data } = await axios.get(
    `https://konjo-habesha-fashion.vercel.app/api/product/${id}`,
  );

  return data;
}

export default function useGetProduct(id: string) {
  const {
    data: responseData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(id),
  });

  const product = responseData?.product;

  return { product, isFetched, refetch };
}
