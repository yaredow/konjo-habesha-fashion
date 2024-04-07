import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchAllProducts() {
  const { data } = await axios.get("http://localhost:3000/api/product/all");

  return data;
}

export default async function useGetProduct() {
  const { data: responseData } = useQuery({
    queryKey: ["product"],
    queryFn: fetchAllProducts,
  });

  const products = responseData?.products;
  return { products };
}
