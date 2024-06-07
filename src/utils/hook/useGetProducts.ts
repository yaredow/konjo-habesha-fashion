import { getAllProducts } from "@/data/product";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts() {
  const {
    data: products,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => getAllProducts(),
  });

  return { products, isFetched, refetch };
}
