"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { getCheckoutSessionUrlAction } from "@/server/actions/checkout/getCheckoutSessionUrlAction";

const CheckoutButton = () => {
  const { data: session } = useSession();
  const cartItems = JSON.parse(localStorage.getItem("cartItems")!);
  const user = session?.user;

  const handleCheckout = async () => {
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
      onClick={() => handleCheckout()}
    >
      {session?.user ? "Check out" : "Login to checkout"}
    </Button>
  );
};

export default CheckoutButton;
