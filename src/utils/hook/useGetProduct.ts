import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProduct(slug: string) {
  const { data } = await axios.get(
    `https://konjo-habesha-fashion.vercel.app/api/product/${slug}`,
  );

  return data;
}

export default function useGetProduct(slug: string) {
  const {
    data: responseData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(slug),
  });

  const product = responseData?.product;

  return { product, isFetched, refetch };
}
