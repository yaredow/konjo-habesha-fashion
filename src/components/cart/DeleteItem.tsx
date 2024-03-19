import { useAppDispatch } from "@/store/hooks";
import { deleteItem } from "@/store/slices/cartSlice";
import { MdOutlineDelete } from "react-icons/md";

function DeleteItem({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex">
      <button
        onClick={() => dispatch(deleteItem(id))}
        type="button"
        className="font-medium text-blue-500 hover:text-blue-600"
      >
        <MdOutlineDelete className=" text-xl hover:text-red-500" />
      </button>
    </div>
  );
}

export default DeleteItem;
