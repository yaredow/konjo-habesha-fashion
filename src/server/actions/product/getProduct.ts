export async function getProduct(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/product/${id}`);

    if (!res?.ok) {
      throw new Error("There was an error fetching product");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}
