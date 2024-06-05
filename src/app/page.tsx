import Slider from "@/components/Slider";
import FeaturedProducts from "@/components/product/categories/FeaturedProducts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TrendingProducts from "@/components/product/categories/TrendingProducts";

export default function page() {
  return (
    <div className=" flex flex-col md:gap-16">
      <>
        <Slider />
        <TrendingProducts />
        <FeaturedProducts />
      </>

      <Button
        variant="secondary"
        className="mx-auto my-6 inline-block items-center"
        asChild
      >
        <Link href="/shop">Browse All</Link>
      </Button>
    </div>
  );
}
