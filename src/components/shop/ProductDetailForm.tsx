"use client";

import { Label } from "../ui/label";
import { Product } from "@prisma/client";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, getCart } from "@/store/slices/cartSlice";
import { toast } from "../ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CartItem } from "../../../types/product";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "lucide-react";

type ProductDetailFormProps = {
  product: Product;
  isFetched: boolean;
};

export default function ProductDetailForm({
  product,
  isFetched,
}: ProductDetailFormProps) {
  const [cartFilter, setCartFilter] = useState<CartItem | null>(null);

  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);

  const handleAddToCart = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const isProductInCart = cart.some(
      (item: CartItem) => item.id === cartFilter?.id,
    );

    if (product && product.stockQuantity > 0 && isFetched) {
      if (!isProductInCart) {
        dispatch(addItem(cartFilter as CartItem));
      } else {
        toast({
          variant: "destructive",
          description: "Item already exists",
        });
      }
    } else {
      toast({
        variant: "destructive",
        description: "Item is out of stock",
      });
    }
  };

  useEffect(() => {
    if (isFetched && product) {
      setCartFilter({
        ...product,
        quantity: 1,
        size: product.sizes[0],
      });
    }
  }, [isFetched, product]);

  return (
    <form className="grid gap-4 md:gap-10">
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="size">
          Size
        </Label>
        <ul className="flex flex-row gap-4">
          {product.sizes.map((size, index) => (
            <li key={index}>
              <Button
                variant={cartFilter?.size === size ? "default" : "outline"}
                size="icon"
                onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
                  evt.preventDefault();
                  setCartFilter((prev) => ({
                    ...(prev as CartItem),
                    size: size,
                  }));
                }}
                id={size}
                value={size}
              >
                {size}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="quantity">
          Quantity
        </Label>
        <Select
          onValueChange={(value) => {
            setCartFilter((prev) => ({
              ...(prev as CartItem),
              quantity: Number(value),
            }));
          }}
          defaultValue={cartFilter?.quantity?.toString() || "1"}
        >
          <SelectTrigger className="md:w-44">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 8 }).map((_, index) => (
              <SelectItem key={index} value={(index + 1).toString()}>
                {index + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="flex w-full items-center gap-2"
        onClick={handleAddToCart}
        size="lg"
      >
        <span>
          <ShoppingCartIcon size={20} />
        </span>
        Add to cart
      </Button>
    </form>
  );
}
