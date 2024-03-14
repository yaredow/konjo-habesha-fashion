import ProductItem from "@/components/product/ProductItem";
import FeaturedProductsCarousel from "@/components/product/featured/featuredProductsCarousel";
import TrendingProduct from "@/components/product/treding/TrendingProducts";

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
      <TrendingProduct />
    </div>
  );
}

export default page;
