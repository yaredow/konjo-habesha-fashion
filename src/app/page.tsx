import FeaturedProducts from "@/components/product/categories/FeaturedProducts";
import NewArrivedProducts from "@/components/product/categories/NewArrivedProducts";
import TrendingProductCarousel from "@/components/product/categories/TrendingProductsCarousel";

function page() {
  return (
    <div>
      <TrendingProductCarousel />
      <FeaturedProducts />
      <NewArrivedProducts />
    </div>
  );
}

export default page;
