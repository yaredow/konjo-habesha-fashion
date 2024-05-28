import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders } from "@/data/order";
import { formatName } from "@/utils/formatName";
import { formatCurrency } from "@/utils/helpers";
import { Badge } from "../ui/badge";

export default async function OrdersTable() {
  const orders = await getAllOrders();
  console.log(orders);

  return (
    <Table className={`${orders?.length === 0 && "overflow-hidden"}`}>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden xl:table-column">Type</TableHead>
          <TableHead className="hidden xl:table-column">Status</TableHead>
          <TableHead className="hidden xl:table-column">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">
                {formatName(order.shipping.name)}
              </div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {order.shipping.email}
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">Sale</TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-23
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(order.subtotal)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
