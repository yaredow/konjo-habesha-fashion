import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductFilter } from "../validators/product-validators";

async function fetchFilteredProducts(filter: ProductFilter) {
  const { data } = await axios.post("http://localhost:3000/api/product", {
    filter: {
      sort: filter.sort,
      price: filter.price,
      size: filter.size,
      category: filter.category,
    },
  });

  console.log(data);

  return data;
}

export default function useGetFilteredProducts(filter: any) {
  const {
    data: responseData,
    refetch,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchFilteredProducts(filter),
  });

  if (error) {
    console.error("Error fetching products:", error);
  }

  const products = responseData?.products;
  return { products, refetch };
}
