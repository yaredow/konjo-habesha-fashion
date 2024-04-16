import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchOrder() {
  const { data } = await axios.get("http://localhost:3000/api/order");

  return data;
}

export default function useGetOrders() {
  const {
    data: responseData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrder,
  });

  const orders = responseData?.orders;

  return { orders, isFetched, refetch };
}
