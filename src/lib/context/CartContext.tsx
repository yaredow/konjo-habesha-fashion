"use client";

import { createContext, useContext, useState } from "react";

type CartContextType = {
  cartPopupOpen: boolean;
  handleCartPopupOpen: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartPopupOpen, setCartPopupOpen] = useState<boolean>(false);

  const handleCartPopupOpen = () => {
    setCartPopupOpen((cartPopupOpen) => !cartPopupOpen);
  };
  return (
    <CartContext.Provider value={{ cartPopupOpen, handleCartPopupOpen }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("Search context has been used outside of SearchProvider");
  return context;
}

export { useCart, CartProvider };
