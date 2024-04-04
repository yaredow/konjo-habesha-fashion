import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetProductsWithCatagory(id: string) {
  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/product/${id}`,
      );

      return data.product;
    },
  });

  return { product };
}

export default useGetProductsWithCatagory;
