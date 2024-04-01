import Featured from "@/components/product/featured/Featured";
import NewArrival from "@/components/product/new-arrival/NewArrival";
import TrendingProductCarousel from "@/components/product/trending/TrendingProductsCarousel";

function page() {
  return (
    <div>
      <TrendingProductCarousel />
      <Featured />
      <NewArrival />
    </div>
  );
}

export default page;
