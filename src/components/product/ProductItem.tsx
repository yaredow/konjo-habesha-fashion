"use client";

import Image from "next/image";
import habeshaImage from "@/assets/habesha.webp";
import { Button } from "../ui/button";
import { FaCartPlus } from "react-icons/fa";
import { formatCurrency } from "@/lib/utils/helpers";

function ProductItem({ product }: { product: Product }) {
  return (
    <div className=" ">
      <div className=" justify-cente flex items-center p-[2px]">
        <Image
          src={habeshaImage}
          alt="Images of habesha woman with a dress"
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex justify-between">
        <div className=" mt-2 flex flex-row justify-between gap-2 md:flex-col">
          <h2>{product.name}</h2>
          <h2>{formatCurrency(product.price)}</h2>
        </div>
        <Button size="icon" className="hidden rounded-full md:-mt-6 md:flex">
          <FaCartPlus />
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
