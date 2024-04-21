import { ObjectId } from "mongoose";
import { Field } from "react-hook-form";

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  images: { url: string; public_id: string }[];
  stockQuantity: number;
  unitsSold: number;
  quantity: number;
  productAddedDate: Date;
  isFeatured: boolean;
  inStock: boolean;
  sizes: string[];
  status: string;
};

type CartItem = {
  _id: string;
  images: {
    public_id: string;
    url: string;
  }[];
  name: string;
  category: string;
  price: number;
  size: string;
  quantity: number;
  totalPrice?: number | undefined;
};

type CartState = {
  cart: CartItem[];
};

interface SessionUserWithID extends SessionUser {
  id: string;
}

export type FormState = {
  message: string;
};
