import { Product } from "../../../../type";
import ProductItem from "../ProductItem";

async function FeaturedProducts({
  featuredProducts,
}: {
  featuredProducts: Product[];
}) {
  return (
    <div className="mt-[5rem]">
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featuredProducts.map((product: Product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
