import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetProducts(filter: any) {
  const { data: responseData, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post("http://localhost:3000/api/product", {
        filter: {
          sort: filter.sort,
          price: filter.price.range,
          size: filter.size,
          category: filter.category,
        },
      });

      return data;
    },
  });

  const products = responseData?.products;
  const minPrice = responseData?.minPrice;
  const maxPrice = responseData?.maxPrice;

  return { products, minPrice, maxPrice, refetch };
}
