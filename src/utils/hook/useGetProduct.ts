import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../constants";

const fetchProduct = async (slug: string) => {
  const { data } = await axios.get(`${URL}/api/product/${slug}`);

  return data.product;
};

export default function useGetProduct(slug: string) {
  const {
    data: product,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProduct(slug),
  });

  return { product, isFetched, refetch };
}
