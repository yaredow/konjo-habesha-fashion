"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { FaCartPlus } from "react-icons/fa";
import { formatCurrency } from "@/lib/utils/helpers";
import { Card, CardContent, CardFooter } from "../ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { FaHeart } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TooltipProvider } from "../ui/tooltip";
import { toast } from "../ui/use-toast";
import useAddToCart from "@/hook/useAddToCart";
import { Product } from "../../../type";
import { useRouter } from "next/navigation";

function ProductItem({ product }: { product: Product }) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-80">
        <img
          src={product.images[0].url}
          alt="product image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm ">{product.name}</h3>
          <p className="mt-1 text-sm ">Size {product.category}</p>
        </div>

        <p className="text-sm font-medium ">{formatCurrency(product.price)}</p>
      </div>
    </div>
  );
}

export default ProductItem;
