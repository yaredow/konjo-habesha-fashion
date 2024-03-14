import FeaturedProducts from "@/components/product/featured/TrendingProducts";
import NewArrivals from "@/components/product/new-arrival/NewArrivedProducts";
import TrendingProductCarousel from "@/components/product/trending/TrendingProductsCarousel";

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
      <TrendingProductCarousel featuredProducts={featuredProducts} />
      <FeaturedProducts />
      <NewArrivals />
    </div>
  );
}

export default page;
