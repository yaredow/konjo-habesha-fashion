"use client";

import CartItem from "@/components/cart/CartItem";
import EmptyCart from "@/components/cart/EmptyCart";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import {
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
} from "@/store/slices/cartSlice";
import { formatCurrency } from "@/utils/helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Cart = () => {
  const [totalCartQuantity, setTotalCartQuantity] = useState<number>(0);
  const cart = useAppSelector(getCart);
  const totalPrice = useAppSelector(getTotalCartPrice);
  const reduxTotalCartQuantity = useAppSelector(getTotalCartQuantity);

  useEffect(() => {
    setTotalCartQuantity(reduxTotalCartQuantity);
  }, [reduxTotalCartQuantity]);

  if (totalCartQuantity === 0) return <EmptyCart />;

  return (
    <div className="h-auto">
      <h1 className="mb-10 text-center text-2xl font-bold">
        Your Cart({totalCartQuantity})
      </h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart?.map((item) => <CartItem key={item.id} item={item} />)}
        </div>

        {/* Sub total */}
        <div className="sticky top-28 mb-6 mt-6 h-full rounded-lg border p-4 shadow-md md:mt-0 md:h-64 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p>Total</p>
            <p>{formatCurrency(totalPrice)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold ">Total</p>
            <div className=" mb-2">
              <p className="mb-1 text-lg font-bold ">
                {formatCurrency(totalPrice + 4.99)}
              </p>
              <p className="text-sm">includin VAT</p>
            </div>
          </div>
          <CheckoutButton />
          <Button
            variant="link"
            className="mx-auto my-2 flex items-center justify-center text-center text-sm hover:underline"
          >
            <Link href="/shop" className=" flex flex-row items-center gap-2">
              <FaArrowLeft />
              Continue shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
