import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProduct(id: string) {
  const { data } = await axios.get(`http://localhost:3000/api/product/${id}`);

  return data;
}

function useGetProduct(id: string) {
  const { data: responseData, isPending } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(id),
  });

  const product = responseData?.product;

  return { product, isPending };
}

export default useGetProduct;
