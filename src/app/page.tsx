import Featured from "@/components/product/featured/Featured";
import NewArrival from "@/components/product/new-arrival/NewArrival";
import Trending from "@/components/product/trending/Trending";

function page() {
  return (
    <div>
      <Trending />
      <Featured />
      <NewArrival />
    </div>
  );
}

export default page;
