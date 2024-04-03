import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetProducts() {
  const { data: responseData } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/product/products",
      );

      return data;
    },
  });

  const minPrice = responseData?.minPrice;
  const maxPrice = responseData?.maxPrice;

  return { minPrice, maxPrice };
}

export default useGetProducts;
