import { z } from "zod";
import {
  AVAILABLE_CATEGORY,
  AVAILABLE_SIZES,
  AVAILABLE_SORT,
} from "../constants";
import Product from "@/types/product";

export const ProductFilterValidator = z.object({
  size: z.array(z.enum(AVAILABLE_SIZES)),
  sort: z.enum(AVAILABLE_SORT),
  category: z.enum(AVAILABLE_CATEGORY),
  price: z.tuple([z.number(), z.number()]),
});

export type ProductState = Omit<
  z.infer<typeof ProductFilterValidator>,
  "price"
> & {
  price: { isCustom: boolean; range: [number, number] };
};
