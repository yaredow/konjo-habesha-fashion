import { FilterType } from "@/app/dashboard/order/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../constants";

async function fetchOrder(filter: FilterType) {
  const { data } = await axios.post(`${URL}/api/dashboard/order`, {
    filter: {
      delivery_status: filter.delivery_status || null,
      time_range: filter.time_range,
    },
  });

  return data;
}

export default function useGetOrders(filter: FilterType) {
  const {
    data: responseData,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrder(filter),
  });

  const orders = responseData?.orders;

  return { orders, isFetched, refetch };
}
