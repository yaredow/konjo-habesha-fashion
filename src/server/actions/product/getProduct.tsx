import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/product");

    if (!res?.ok) {
      throw new Error("There was an error fetching products");
    }

    revalidatePath("/shop");

    const data = await res?.json();
    return data;
  } catch (err) {
    console.log(err);
  }

  revalidatePath("/shop");
}
