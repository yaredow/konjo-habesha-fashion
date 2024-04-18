import { Order } from "@/types/order";
import axios from "axios";

export async function calculateTotalSales(timeRange: string) {
  const fetchOrders = async (timeRange: string) => {
    try {
      const response = await axios.post("http://localhost:3000/api/order", {
        filter: {
          time_range: timeRange,
        },
      });
      return response.data.orders;
    } catch (err) {
      console.error("Error fetching orders:", err);
      return [];
    }
  };

  const orders = (await fetchOrders(timeRange)) as Order[];
  const totalSales = orders.reduce((total, order) => total + order.subtotal, 0);
  return totalSales;
}
