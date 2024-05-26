import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProductWithCategory(type: string) {
  const { data } = await axios.get(
    `https://konjo-habesha-fashion.vercel.app/api/product/categories/${type}`,
  );

  return data;
}

function useGetProductsWithCatagory(type: string) {
  const { data } = useQuery({
    queryKey: ["products", type],
    queryFn: () => fetchProductWithCategory(type),
  });

  return { data };
}

export default useGetProductsWithCatagory;
