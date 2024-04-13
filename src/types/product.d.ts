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

type Data = {
  trendingProducts: Product[];
  featuredProducts: Product[];
  newArrivalProducts: Product[];
};

type CartItem = Omit<
  Product,
  | "description"
  | "stockQuantity"
  | "unitsSold"
  | "productAddedDate"
  | "isFeatured"
  | "inStock"
> & {
  quantity: number;
  totalPrice?: number;
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
