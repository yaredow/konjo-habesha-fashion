"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { FaCartPlus } from "react-icons/fa";
import { formatCurrency } from "@/lib/utils/helpers";
import { Card, CardContent, CardFooter } from "../ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

function ProductItem({ product }: { product: Product }) {
  return (
    <Card className=" rounded-lg shadow-md">
      <CardContent className="justify-cente flex aspect-square items-center p-2">
        <div className=" relative  w-full bg-cover">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={product.images[0].url}
              alt="images of habesha traditional clothes"
              fill
              className="rounded-md object-cover "
            />
          </AspectRatio>
        </div>
      </CardContent>
      <CardFooter className="-mb-4 flex flex-col items-center justify-start md:flex-row md:justify-between">
        <h2>{product.name}</h2>
        <h2>{formatCurrency(product.price)}</h2>
      </CardFooter>
    </Card>
  );
}

export default ProductItem;
