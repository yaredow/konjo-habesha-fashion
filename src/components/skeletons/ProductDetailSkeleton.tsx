function ProductDetailSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="h-2 w-5"></div>

      <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
        {/* Main Product Image */}
        <div className="lg:col-span-3 lg:row-end-1">
          <div className="lg:flex lg:items-start">
            {/* Main Image */}
            <div className="lg:order-2 lg:ml-5">
              <div className="relative max-w-xl overflow-hidden rounded-lg ">
                {/* Image placeholder */}
                <div className="h-full w-full max-w-full bg-gray-300 object-cover"></div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0"></div>
          </div>
        </div>

        {/* Product Information */}
        <div className="flex w-full flex-col gap-4">
          {/* Product name */}
          <div className="h-8 w-full flex-grow bg-gray-200" />
          {/* Product description */}
          <div className=" flex w-full flex-col gap-2">
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
          </div>

          <div className=" flex flex-col gap-4">
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />{" "}
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />{" "}
            <div className="h-4 w-full bg-gray-200" />
          </div>

          {/* Price and Add to Cart */}
          <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-b border-t bg-white py-4 sm:flex-row sm:space-y-0">
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
          </div>

          {/* Additional Information */}
          <div className="mt-8 space-y-2 bg-white">
            <div className="h-4 w-[35%] bg-gray-200" />
            <div className="h-4 w-[25%] bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
