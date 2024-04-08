import { CreateProductFormSchema } from "@/lib/utils/validators/form-validators";
import connectMongoDB from "@/lib/utils/mongo/db";
import { FormState } from "@/types/product";
import Product from "@/models/productModel";

export async function createProductAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = CreateProductFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    size: formData.get("size"),
    stockQuantity: formData.get("stockQuantity"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data",
    };
  }

  try {
    await connectMongoDB();

    const newProduct = await Product.create(validatedFields.data);

    if (newProduct) {
      return {
        message: "Product created successfully",
      };
    }

    return { message: "success" };
  } catch (err) {
    return {
      message: "Something went wrong while creating product",
    };
  }
}
