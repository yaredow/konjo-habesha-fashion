import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../constants";

const fetchProducts = async () => {
  const { data } = await axios.get(`${URL}/api/product/all`);

  console.log(data);

  return data.products;
};

export default function useGetProducts() {
  const {
    data: products,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return { products, isFetched, refetch };
}
