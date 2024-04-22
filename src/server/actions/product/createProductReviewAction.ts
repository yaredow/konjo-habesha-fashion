import { FormState } from "@/types/product";

export async function createProductReviewAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    return { message: "success" };
  } catch (err) {
    throw err;
  }
}
