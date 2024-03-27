export async function getProductWithCategory(category: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/product/categories/${category}`,
    );

    const data = await res?.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
