import FeaturedProducts from "@/components/product/featured/FeaturedProducts";
import NewArrival from "@/components/product/new-arrival/NewArrival";
import TrendingProductCarousel from "@/components/product/trending/TrendingProductsCarousel";

function page() {
  return (
    <div>
      <TrendingProductCarousel />
      <FeaturedProducts />
      <NewArrival />
    </div>
  );
}

export default page;
