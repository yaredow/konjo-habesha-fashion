import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const { data } = await axios.get(
    "https://konjo-habesha-fashion.vercel.app/api/product/all",
  );

  return data.products;
};

export default function useGetProducts() {
  const {
    data: products,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return { products, isFetched, refetch };
}
