import { getProductApi } from "@/services/productApi";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts() {
  const { isPending, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProductApi,
  });

  return { isPending, products };
}
