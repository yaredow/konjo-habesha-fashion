import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../constants";

async function fetchProductWithCategory(type: string) {
  const { data } = await axios.get(`${URL}/api/product/categories/${type}`);

  console.log(data);

  return data;
}

function useGetProductsWithCatagory(type: string) {
  const { data, isPending } = useQuery({
    queryKey: ["products", type],
    queryFn: () => fetchProductWithCategory(type),
  });

  return { data, isPending };
}

export default useGetProductsWithCatagory;
