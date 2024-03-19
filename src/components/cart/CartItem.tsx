"use client";

import Image from "next/image";
import UpdateItemQuantity from "./UpdateItemQuantity";
import DeleteItem from "./DeleteItem";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

function CartItem({ item }: { item: CartItem }) {
  return (
    <div className="mb-6 justify-between rounded-lg border p-6 shadow-md sm:flex sm:justify-start md:h-64">
      <AspectRatio ratio={1 / 1}>
        <Image
          src={item.images[0].url}
          alt="images of habesha traditional clothes"
          height={500}
          width={150}
          className="rounded-md object-cover"
        />
      </AspectRatio>

      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p className="mt-1 text-sm">{item.category}</p>
        </div>
        <div className="mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6 sm:space-y-6">
          <UpdateItemQuantity />
          <div className="flex items-center space-x-4">
            <p className="text-sm dark:text-gray-100">{item.price}</p>
            <DeleteItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
