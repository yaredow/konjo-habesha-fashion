import { FilterType } from "@/app/admin/dashboard/order/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchOrder(filter: FilterType) {
  const { data } = await axios.post(
    "https://konjo-habesha-fashion.vercel.app/api/admin/order",
    {
      filter: {
        delivery_status: filter.delivery_status || null,
        time_range: filter.time_range,
      },
    },
  );

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
