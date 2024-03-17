import { useQuery } from "@tanstack/react-query";

export default function useGetProducts() {
  const { isPending, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { isPending, products };
}
