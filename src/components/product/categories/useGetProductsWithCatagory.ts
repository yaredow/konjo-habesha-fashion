import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetProductsWithCatagory(type: string) {
  const { data } = useQuery({
    queryKey: ["products", type],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/product/categories/${type}`,
      );

      return data;
    },
  });
  return { data };
}

export default useGetProductsWithCatagory;
