"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";
import { Product } from "../../../../type";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import useGetTrendingProducts from "./useGetProductsWithCatagory";

function TrendingProductCarousel() {
  const { products, isFetching } = useGetTrendingProducts("trending");

  console.log(products);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div className=" mx-auto flex justify-center gap-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className=" w-full max-w-[80rem]"
      >
        <CarouselContent>
          {products.map((product: Product) => (
            <CarouselItem key={product._id} className="md:basis-1/4">
              <div className="p-1">
                <Card>
                  <CardContent className="justify-cente flex aspect-square items-center p-2">
                    <div className=" relative  w-full bg-cover">
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={product.images[0].url}
                          alt="images of habesha traditional clothes"
                          fill
                          className="rounded-md object-cover "
                        />
                      </AspectRatio>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}

          {isFetching &&
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default TrendingProductCarousel;
