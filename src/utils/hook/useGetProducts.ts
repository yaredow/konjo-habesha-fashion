import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProduct(filter: string) {
  const { data } = await axios.get("http://localhost:3000/api/product/all");

  return data;
}

export default function useGetProducts(filter: string) {
  const {
    data: responseData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProduct(filter),
  });

  const products = responseData?.products;

  return { products, isFetched, refetch };
}
