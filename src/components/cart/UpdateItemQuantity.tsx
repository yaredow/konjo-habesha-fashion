import { useAppDispatch } from "@/store/hooks";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "@/store/slices/cartSlice";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function UpdateItemQuantity({
  id,
  currentQuantity,
}: {
  id: string;
  currentQuantity: number;
}) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-[4px] border-gray-100">
      <Button onClick={() => dispatch(decreaseItemQuantity(id))}>-</Button>
      <Input
        className="h-10 w-16 items-center"
        type="number"
        value={currentQuantity}
        min="1"
        readOnly
      />
      <Button onClick={() => dispatch(increaseItemQuantity(id))}>+</Button>
    </div>
  );
}

export default UpdateItemQuantity;
