"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import ImageOf from "@/assets/habesha.webp";
import UpdateItemQuantity from "./UpdateItemQuantity";
import DeleteItem from "./DeleteItem";

function CartItem() {
  return (
    <div className="mb-6 justify-between rounded-lg border p-6 shadow-md sm:flex sm:justify-start md:h-64">
      <Image
        src={ImageOf}
        alt="habesha"
        className="w-full rounded-lg sm:w-40"
      />

      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold">Product name</h2>
          <p className="mt-1 text-sm">female</p>
        </div>
        <div className="mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6 sm:space-y-6">
          <UpdateItemQuantity />
          <div className="flex items-center space-x-4">
            <p className="text-sm dark:text-gray-100">$200</p>
            <DeleteItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
