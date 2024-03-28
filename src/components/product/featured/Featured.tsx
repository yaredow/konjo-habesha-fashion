import { getProductWithCategory } from "@/server/actions/product/getProductCatagories";
import FeaturedProducts from "./FeaturedProducts";

async function Featured() {
  const data = await getProductWithCategory("featured");
  return (
    <div>
      <FeaturedProducts featuredProducts={data.featuredProducts} />
    </div>
  );
}

export default Featured;
