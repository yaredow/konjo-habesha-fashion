"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { getCheckoutSessionUrlAction } from "@/server/actions/checkout/getCheckoutSessionUrlAction";
import { CartItem } from "@/types/product";
import React from "react";

const CheckoutButton = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { data: session } = useSession();
  const cartItems = JSON.parse(localStorage.getItem("cartItems")!);
  const user = session?.user;

  const handleCheckout = async (cartItems: CartItem[], user: any) => {
    const formData = new FormData();
    formData.append("cartItems", JSON.stringify(cartItems));
    formData.append("user", JSON.stringify(user));
    setIsLoading(true);
    const result = await getCheckoutSessionUrlAction(formData);

    if (result?.url) {
      setIsLoading(false);
      window.location.href = result.url;
    }
  };

  return (
    <Button
      variant="default"
      disabled={session?.user ? false : true}
      onClick={() => handleCheckout(cartItems, user)}
    >
      {isLoading
        ? "Loading..."
        : session?.user
          ? "Check out"
          : "Login to checkout"}
    </Button>
  );
};

export default CheckoutButton;
