"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import habeshaImage from "@/assets/habesha.webp";
import { Button } from "../ui/button";
import { FaCartPlus } from "react-icons/fa";

function ProductItem() {
  return (
    <Card>
      <CardContent className=" justify-cente flex aspect-square items-center p-[2px]">
        <div className="items-start">
          <Image
            src={habeshaImage}
            alt="Images of habesha woman with a dress"
            className=" rounded-md object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="-mb-[12px] flex justify-between">
        <div className=" mt-2 flex flex-col justify-between gap-2">
          <h2>Product name</h2>
          <h2>$50</h2>
        </div>
        <Button size="icon" className="-mt-16 rounded-full">
          <FaCartPlus />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductItem;
