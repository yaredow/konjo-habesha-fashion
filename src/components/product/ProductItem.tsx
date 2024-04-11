"use client";

import { Product } from "../../types/product";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "../ui/use-toast";
import { useCart } from "@/lib/context/CartContext";
import { formatCurrency } from "@/utils/helpers";
import useAddToCart from "@/utils/hook/useAddToCart";

function ProductItem({ product }: { product: Product }) {
  const router = useRouter();
  const { handleAddToCart } = useAddToCart(product);
  const { handleCartPopupOpen } = useCart();

  const handleClick = () => {
    router.replace(`/product/${product._id}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    if (!product.inStock) {
      toast({
        description: "This item is out of stock",
      });
      e.stopPropagation();
      return;
    }
    handleCartPopupOpen();
    handleAddToCart();
    e.stopPropagation();
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
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm ">{product.name}</h3>
          <p className="mt-1 text-sm font-medium ">
            {formatCurrency(product.price)}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleAddToCartClick}
          size="icon"
          className=" h-10 w-10 rounded-full"
        >
          <IoCartOutline className=" text-2xl text-blue-600" />
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
