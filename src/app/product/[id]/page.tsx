"use client";

import { useState } from "react";
import useAddToCart from "@/lib/utils/hook/useAddToCart";
import Image from "next/image";
import useGetProduct from "@/lib/utils/hook/useGetProduct";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/CartContext";

function ProductDetail({ params }: { params: { id: string } }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const { id } = params;
  const { product = {}, isPending } = useGetProduct(id);
  let url, altTextx;

  const { handleAddToCart } = useAddToCart(product);

  function handleAddToCartClick() {
    if (!product?.inStock) {
      console.log("The item is out of stock");
      return;
    }
    handleAddToCart();
  }

  const handleThumbnailClick = (index: any) => {
    setSelectedPhotoIndex(index);
  };

  if (isPending) return <Spinner />;

  return (
    <section className=" mx-12 ">
      <div className="container mx-auto px-4">
        <div className="">
          <a
            href="/"
            className="rounded-md text-sm font-medium  hover:text-blue-500 focus:shadow"
          >
            Home
          </a>
        </div>

        <div className="lg:col-gap-8 xl:col-gap-12 mt-8 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-5 lg:gap-8">
          {/* Main Product Image */}
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              {/* Main Image */}
              <div className="lg:order-2 lg:ml-5">
                <div className="relative max-w-xl overflow-hidden rounded-lg">
                  <Image
                    src={product.images[selectedPhotoIndex].url}
                    alt={product.images[selectedPhotoIndex].public_id}
                    className="h-full w-full max-w-full object-cover"
                    height={1200}
                    width={1000}
                  />
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  {product &&
                    product.images.map((image: any, index: any) => (
                      <button
                        key={index}
                        type="button"
                        className={`flex-0 mb-3 aspect-square h-20 overflow-hidden rounded-lg border-2 ${
                          index === selectedPhotoIndex
                            ? "border-blue-600"
                            : "border-transparent"
                        } text-center`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <Image
                          className="h-full w-full object-cover"
                          src={image.url}
                          alt={image.public_id}
                          height={600}
                          width={200}
                        />
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="font-bold  sm:text-3xl">{product.name}</h1>

            <div className="lg:col-span-3">
              <div className=" font-body mt-6 font-normal">
                {product.description}
              </div>
            </div>

            <div className="mt-8 block text-base font-medium leading-6 ">
              Category:{" "}
              <span className=" font-normal ">{product.category}</span>
            </div>

            <div className=" mt-2 block text-base font-medium leading-6 ">
              Sold: <span className=" font-normal ">{product.unitsSold}</span>
            </div>

            <div className=" mt-2 block text-base font-medium leading-6 ">
              Stock Quantity:
              <span className=" ml-[6px] font-normal">
                {product.stockQuantity}
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <p>Available sizes</p>
              <ul className="flex flex-row gap-2">
                {product.sizes.map((size: string, index: string) => (
                  <li key={index}>
                    <Button variant="secondary">{size}</Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and Add to Cart */}
            <div className="mt-10 flex flex-row justify-between  border-b  border-t py-4">
              <h1 className="text-3xl font-bold">$200</h1>
              <Button
                type="button"
                onClick={handleAddToCartClick}
                className=" mb-4"
              >
                Add to cart
              </Button>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <span>Free shipping worldwide</span>
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <span>Cancel anytime</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
