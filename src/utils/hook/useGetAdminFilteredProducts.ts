import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductFilterType } from "../validators/product-validators";

async function fetchProduct(filter: ProductFilterType) {
  const { data } = await axios.post(
    "https://konjo-habesha-fashion.vercel.app/api/dashboard/product",
    {
      filter,
    },
  );

  console.log(data);

  return data;
}

export default function useGetAdminFilteredProducts(filter: ProductFilterType) {
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
