import { FilterType } from "@/app/admin/dashboard/order/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchOrder(filter: FilterType) {
  const formData = new FormData();
  formData.append("filter", JSON.stringify(filter));

  const { data } = await axios.get("http://localhost:3000/api/order", {
    data: formData,
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
