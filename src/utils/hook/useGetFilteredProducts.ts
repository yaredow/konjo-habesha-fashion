import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductState } from "../validators/product-validators";

async function fetchFilteredProducts(filter: ProductState) {
  const { data } = await axios.post("http://localhost:3000/api/product", {
    filter: {
      sort: filter.sort,
      price: filter.price.range,
      size: filter.size,
      category: filter.category,
    },
  });

  return data;
}

export default function useGetFilteredProducts(filter: any) {
  const { data: responseData, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchFilteredProducts(filter),
  });

  const products = responseData?.sortedProducts;

  return { products, refetch };
}
