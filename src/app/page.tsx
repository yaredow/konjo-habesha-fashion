import FeaturedProducts from "@/components/product/categories/FeaturedProducts";
import NewArrivedProducts from "@/components/product/categories/NewArrivedProducts";
import NewCollection from "@/components/product/categories/NewCollection";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <div className=" flex flex-col md:gap-16">
      <div>
        <NewCollection />
        <NewArrivedProducts />
        <FeaturedProducts />
      </div>

      <Button variant="secondary" className="mx-auto inline-block items-center">
        Browse All
      </Button>
    </div>
  );
}

export default page;
