import { Field } from "react-hook-form";

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  images: { url: string; value: string }[];
  stockQuantity: number;
  unitsSold: number;
  quantity: number;
  productAddedDate: Date;
  isFeatured: boolean;
  inStock: boolean;
  sizes: [string];
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

type FormState = {
  message: string;
  errors: string | undefined;
  fieldValues: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
};
