import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProduct(slug: string) {
  const { data } = await axios.get(`http://localhost:3000/api/product/${slug}`);

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
