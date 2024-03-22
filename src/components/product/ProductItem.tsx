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

function ProductItem({ product }: { product: Product }) {
  const { handleAddToCart } = useAddToCart(product);
  const handleAddToCartClick = (e: React.MouseEvent) => {
    if (!product.inStock) {
      toast({
        description: "This item is out of stock",
      });
      e.stopPropagation();
      return;
    }
    handleAddToCart();
    e.stopPropagation();
  };

  return (
    <Card className=" rounded-lg shadow-md hover:cursor-pointer">
      <CardContent className="justify-cente flex aspect-square items-center p-2">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className=" relative w-full bg-cover">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={product.images[0].url}
                    alt="images of habesha traditional clothes"
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sticky="always" sideOffset={-44}>
              <div className=" flex flex-col gap-2">
                <Button variant="outline" size="icon" className=" rounded-full">
                  <FaHeart className=" text-xl" />
                </Button>
                <Button
                  onClick={handleAddToCartClick}
                  size="icon"
                  className=" rounded-full"
                >
                  <FaCartPlus className=" text-xl" />
                </Button>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <CardFooter className="-mb-4 flex flex-col items-center justify-start md:flex-row md:justify-between">
        <h2>{product.name}</h2>
        <h2>{formatCurrency(product.price)}</h2>
      </CardFooter>
    </Card>
  );
}

export default ProductItem;
