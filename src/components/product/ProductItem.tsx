"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import habeshaImage from "@/assets/habesha.webp";
import { Button } from "../ui/button";
import { FaCartPlus } from "react-icons/fa";

function ProductItem() {
  return (
    <Card className=" rounded-lg border-b shadow-lg">
      <CardContent className=" justify-cente flex aspect-square items-center p-[2px]">
        <div className="items-start">
          <Image
            src={habeshaImage}
            alt="Images of habesha woman with a dress"
            className=" rounded-lg object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="-mb-[12px] flex justify-between">
        <div className=" mt-2 flex flex-row justify-between gap-2 md:flex-col">
          <h2>Product name</h2>
          <h2>$50</h2>
        </div>
        <Button size="icon" className="hidden rounded-full md:-mt-16 md:flex">
          <FaCartPlus />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductItem;
