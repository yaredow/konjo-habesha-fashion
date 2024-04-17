import { FilterType } from "@/app/admin/dashboard/order/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchOrder(filter: FilterType) {
  const { data } = await axios.post("http://localhost:3000/api/order", {
    filter: {
      delivery_status: filter.delivery_status,
      createdOn: filter.createdOn,
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
