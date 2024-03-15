import { useDispatch } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";

function DeleteItem() {
  return (
    <div className="flex">
      <button
        type="button"
        className="font-medium text-blue-500 hover:text-blue-600"
      >
        <MdOutlineDelete className=" text-xl text-gray-600 hover:text-red-500" />
      </button>
    </div>
  );
}

export default DeleteItem;
