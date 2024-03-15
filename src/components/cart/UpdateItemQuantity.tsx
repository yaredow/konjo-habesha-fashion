function UpdateItemQuantity() {
  return (
    <div className="flex items-center border-gray-100">
      <span className="cursor-pointer rounded-l bg-gray-100 px-3.5 py-1 duration-100 hover:bg-blue-500 hover:text-blue-50">
        -
      </span>
      <input
        className="h-8 w-8 border bg-white text-center text-xs outline-none"
        type="number"
        value={1}
        min="1"
        readOnly
      />
      <span
        className={`cursor-pointer rounded-r bg-gray-100 px-3 py-1 duration-100`}
      >
        +
      </span>
    </div>
  );
}

export default UpdateItemQuantity;
