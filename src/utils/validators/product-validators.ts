import { z } from "zod";

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
const AVAILABLE_SORT = [
  "none",
  "price-asc",
  "price-desc",
  "name-asc",
  "name-desc",
] as const;
const AVAILABLE_CATEGORY = ["All", "Male", "Female", "Kids"] as const;

export const ProductFilterValidator = z.object({
  size: z.array(z.enum(AVAILABLE_SIZES)),
  sort: z.enum(AVAILABLE_SORT),
  category: z.enum(AVAILABLE_CATEGORY),
  price: z.object({
    isCustom: z.boolean(),
    range: z.tuple([z.number(), z.number()]),
  }),
});

export type ProductFilter = z.infer<typeof ProductFilterValidator>;

export type FilterOptions = keyof Omit<
  ProductFilter,
  "price" | "sort" | "category"
>;
