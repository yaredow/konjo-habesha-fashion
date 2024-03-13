import ProductItem from "@/components/product/ProductItem";
import FeaturedProductsCarousel from "@/components/product/featured/featuredProductsCarousel";

const getFeaturedProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res?.ok) {
    throw new Error("There was an error fetching the featured products");
  }

  return res.json();
};
async function page() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <div>
      <FeaturedProductsCarousel featuredProducts={featuredProducts} />
      <div className=" mt-12 flex flex-row gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductItem key={index} />
        ))}
      </div>
    </div>
  );
}

export default page;
