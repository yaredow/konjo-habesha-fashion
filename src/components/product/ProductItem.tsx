"use client";

import { Product } from "../../types/product";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/helpers";

function ProductItem({ product }: { product: Product }) {
  const router = useRouter();

  const handleClick = () => {
    router.replace(`/product/${product.id}`);
  };

  return (
    <div onClick={handleClick} className="group relative hover:cursor-pointer">
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md  lg:h-80">
        <img
          src={product.images[0].url}
          alt="product image"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className=" mt-4 flex flex-row items-center justify-between">
        <h3 className="text-sm ">{product.name}</h3>
        <p className="text-sm font-medium ">{formatCurrency(product.price)}</p>
      </div>
    </div>
  );
}

export default ProductItem;
