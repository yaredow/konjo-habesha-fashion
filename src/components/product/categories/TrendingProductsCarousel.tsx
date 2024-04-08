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
import { Product } from "../../../types/product";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import useGetTrendingProducts from "../../../lib/hook/useGetProductsWithCatagory";
import { formatCurrency } from "@/lib/utils/helpers";

function TrendingProductCarousel() {
  const { data } = useGetTrendingProducts("trending");

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
          {data
            ? data.trendingProducts.map((product: Product) => (
                <CarouselItem key={product._id} className="md:basis-1/4">
                  <div className="p-1">
                    <Card>
                      <CardContent className="justify-cente flex aspect-square flex-col items-center p-2">
                        <AspectRatio ratio={1 / 1}>
                          <Image
                            fill
                            alt={product.images[0].public_id}
                            src={product.images[0].url}
                            className=" object-cover"
                          />
                        </AspectRatio>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
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
