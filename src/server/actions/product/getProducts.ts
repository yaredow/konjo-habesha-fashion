export async function getProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/product", {
      cache: "no-store",
    });

    if (!res?.ok) {
      throw new Error("There was an error fetching products");
    }

    const data = await res?.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
