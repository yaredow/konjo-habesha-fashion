import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetProductsWithCatagory(type: string) {
  const { data: products, isPending: isFetching } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/product/categories/trending/${type}`,
      );

      return data.trendingProducts;
    },
  });
  return { products, isFetching };
}

export default useGetProductsWithCatagory;
