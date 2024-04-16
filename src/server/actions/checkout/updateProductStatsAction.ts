import Product from "@/models/productModel";
import { CartItem, Product as ProductType } from "@/types/product";

export async function updateProductStats(formData: FormData) {
  const customer = JSON.parse(formData.get("customer") as string);

  const items = customer.metadata.cart;

  await Promise.all(
    items.map(async (item: CartItem) => {
      try {
        const product = await Product.findOne({ name: item.name });

        if (!product) {
          return {
            error: "Product not found",
          };
        }

        product.unitsSold += item.quantity;
        product.stockQuantity -= item.quantity;

        // set the inStock field to false when the stockQuantity is 0
        if (product.stockQuantity === 0) {
          product.inStock = false;
        }

        // Save the updated product
        await product.save();
      } catch (err) {
        console.error(err);
        throw err;
      }
    }),
  );
}
