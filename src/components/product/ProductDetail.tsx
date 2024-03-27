"use client";

import { useState } from "react";
import { Product } from "../../../type";
import useAddToCart from "@/hook/useAddToCart";
import Image from "next/image";

const ProductDetail = ({ product }: { product: Product }) => {
  console.log(product);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { handleAddToCart } = useAddToCart({});

  function handleAddToCartClick() {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
    if (!product?.inStock) {
      console.log("The item is out of stock");
      return;
    }
    handleAddToCart();
  }

  const selectSize = (sizes: any) => {
    setSelectedSize(sizes);
    setIsDropdownOpen(false);
  };

  const handleThumbnailClick = (index: any) => {
    setSelectedPhotoIndex(index);
  };

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="">
          <a
            href="#"
            className="rounded-md text-sm font-medium  hover:text-blue-500 focus:shadow"
          >
            Home
          </a>
        </div>

        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          {/* Main Product Image */}
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              {/* Main Image */}
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <Image
                    src={product.images[selectedPhotoIndex].url}
                    alt={product.images[selectedPhotoIndex].public_id}
                    className="h-full w-full max-w-full object-cover"
                  />
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  {product.images.map((image, index) => (
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
                      <img
                        className="h-full w-full object-cover"
                        src={image.url}
                        alt={image.public_id}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            {/* name */}

            <h1 className="font-bold text-gray-900 sm:text-3xl">name</h1>
            {/* description */}
            <div className="lg:col-span-3">
              <div className=" font-body mt-6 font-normal">description</div>
            </div>

            <div className="mt-8 block text-base font-medium leading-6 text-gray-900">
              Category: <span className=" font-normal italic">category</span>
            </div>

            <div className=" mt-4 block text-base font-medium leading-6 text-gray-900">
              Sold: <span className=" font-normal italic">15</span>
            </div>

            <div className="mt-4 block text-base font-medium leading-6 text-gray-900">
              Stock Quantity:
              <span className=" font-normal italic">20</span>
            </div>

            {/* Sizes */}
            <div>
              <label
                id="sizes-label"
                className="mt-4 block text-base font-medium leading-6 text-gray-900"
              >
                Sizes:
              </label>
              <div className="relative mt-4">
                <button
                  type="button"
                  className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  aria-labelledby="sizes-label"
                >
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">
                      {selectedSize || "Select Sizes"}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <svg
                      className={`h-5 w-5 ${
                        isDropdownOpen ? "rotate-180 transform" : ""
                      } text-gray-400`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

                {/* {isDropdownOpen && (
                  <ul
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    tabIndex="-1"
                    role="listbox"
                    aria-labelledby="sizes-label"
                  >
                    {sizes.map((size) => (
                      <li
                        key={size}
                        className={`relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 ${
                          selectedSize === size
                            ? "bg-indigo-600 text-white"
                            : ""
                        }`}
                        role="option"
                        onClick={() => selectSize(size)}
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal">
                            {size}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )} */}
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-b border-t py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">$200</h1>
              </div>
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="button"
              >
                Add to cart
              </button>
            </div>
            {/* Additional Information */}
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
};

export default ProductDetail;
