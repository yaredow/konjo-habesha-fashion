"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { getTotalCartQuantity } from "@/store/slices/cartSlice";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ToggleCart() {
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const reduxCartQuantity = useAppSelector(getTotalCartQuantity);

  useEffect(() => {
    setCartQuantity(reduxCartQuantity);
  }, [reduxCartQuantity]);

  return (
    <div className="relative flex items-center">
      <Link href="/cart">
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <ShoppingCart strokeWidth={1.5} className="h-[20px] w-[20px]" />
        </Button>
      </Link>
      {cartQuantity > 0 && (
        <span className="absolute bottom-[26px] left-[26px] flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
          {cartQuantity}
        </span>
      )}
    </div>
  );
}
