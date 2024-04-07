import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProduct() {
  const { data } = await axios.get("http://localhost:3000/api/product/all");

  return data;
}

function useGetProduct() {
  const { data: responseData, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProduct,
  });

  const products = responseData?.products;

  return { products, isPending };
}

export default useGetProduct;
