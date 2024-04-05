"use client";

import { formatCurrency } from "@/lib/utils/helpers";

import { Product } from "../../../type";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IoCartOutline } from "react-icons/io5";

function ProductItem({ product }: { product: Product }) {
  const router = useRouter();
  function handleClick() {
    router.replace(`/product/${product._id}`);
  }

  return (
    <div onClick={handleClick} className="group relative hover:cursor-pointer">
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md  lg:h-80">
        <img
          src={product.images[0].url}
          alt="product image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm ">{product.name}</h3>
          <p className="mt-1 text-sm font-medium ">
            {formatCurrency(product.price)}
          </p>
        </div>

        <Button size="icon" className=" h-10 w-10 rounded-full">
          <IoCartOutline className=" text-2xl" />
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
