import { getAllProducts } from "@/data/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetProducts() {
  const {
    data: products,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { products, isFetched, refetch };
}
