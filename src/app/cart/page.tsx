"use client";

import CartItem from "@/components/cart/CartItem";
import EmptyCart from "@/components/cart/EmptyCart";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import {
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
} from "@/store/slices/cartSlice";
import { FaArrowLeft } from "react-icons/fa";

const Cart = () => {
  const cart = useAppSelector(getCart);
  const totalPrice = useAppSelector(getTotalCartPrice);
  const totalCartQuantity = useAppSelector(getTotalCartQuantity);

  if (totalCartQuantity === 0) return <EmptyCart />;

  return (
    <div className="h-auto">
      <h1 className="mb-10 text-center text-2xl font-bold">
        Your Cart({totalCartQuantity})
      </h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart?.map((item) => <CartItem key={item._id} item={item} />)}
        </div>
        {/* Sub total */}
        <div className="sticky top-28 mb-6 mt-6 h-full rounded-lg border p-4 shadow-md md:mt-0 md:h-64 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p>{totalPrice}</p>
            <p>$200</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold ">Total</p>
            <div className=" mb-2">
              <p className="mb-1 text-lg font-bold ">$500</p>
              <p className="text-sm">includin g VAT</p>
            </div>
          </div>
          <Button>Checkout</Button>
          <Button
            variant="link"
            className="my-2 flex items-center gap-2 text-center  text-sm hover:underline"
          >
            <span>
              <FaArrowLeft />
            </span>{" "}
            Continue shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
