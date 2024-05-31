import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProduct() {
  const { data } = await axios.get(
    "https://konjo-habesha-fashion.vercel.app/api/product/all",
  );

  return data;
}

export default function useGetProducts() {
  const {
    data: responseData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProduct,
  });

  const products = responseData?.products;

  return { products, isFetched, refetch };
}
