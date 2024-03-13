"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import habeshaImage from "@/assets/habesha.webp";

function ProductItem() {
  return (
    <Card>
      <CardContent>
        <div className="items-start p-2">
          <Image
            src={habeshaImage}
            alt="Images of habesha woman with a dress"
            className=" rounded-md object-cover"
          />
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default ProductItem;
