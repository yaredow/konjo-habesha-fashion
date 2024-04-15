"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { getCheckoutSessionUrlAction } from "@/server/actions/checkout/getCheckoutSessionUrlAction";
import { CartItem } from "@/types/product";

const CheckoutButton = () => {
  const { data: session } = useSession();
  const cartItems = JSON.parse(localStorage.getItem("cartItems")!);
  const user = session?.user;

  const handleCheckout = async (cartItems: CartItem[], user: any) => {
    const formData = new FormData();
    formData.append("cartItems", JSON.stringify(cartItems));
    formData.append("user", JSON.stringify(user));

    const result = await getCheckoutSessionUrlAction(formData);

    if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <Button
      variant="default"
      disabled={session?.user ? false : true}
      onClick={() => handleCheckout(cartItems, user)}
    >
      {session?.user ? "Check out" : "Login to checkout"}
    </Button>
  );
};

export default CheckoutButton;
