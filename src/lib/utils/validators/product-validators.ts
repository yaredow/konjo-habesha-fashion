import { z } from "zod";
import { AVAILABLE_SIZES } from "../constants";

export const productFilterValidator = z.object({
  size: z.array(z.enum(AVAILABLE_SIZES)),
  sort: z.enum(AVAILABLE_SIZES),
});
