import { z } from "zod";
import {
  AVAILABLE_CATEGORY,
  AVAILABLE_SIZES,
  AVAILABLE_SORT,
} from "../constants";

const SizeEnum = z.enum(AVAILABLE_SIZES);
const SortEnum = z.enum(AVAILABLE_SORT);
const CategoryEnum = z.enum(AVAILABLE_CATEGORY);

// Define the validator using the created enums
export const ProductFilterValidator = z.object({
  size: z.array(SizeEnum),
  sort: SortEnum,
  category: CategoryEnum,
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
