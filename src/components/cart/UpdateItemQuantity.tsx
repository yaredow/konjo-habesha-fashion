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
    <div>
      <label className="sr-only"> Quantity </label>

      <div className="flex items-center rounded border border-gray-200">
        <button
          onClick={() => dispatch(decreaseItemQuantity(id))}
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
        >
          &minus;
        </button>

        <input
          type="number"
          id="Quantity"
          value={currentQuantity}
          className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          onClick={() => dispatch(increaseItemQuantity(id))}
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
        >
          &plus;
        </button>
      </div>
    </div>
  );
}

export default UpdateItemQuantity;
