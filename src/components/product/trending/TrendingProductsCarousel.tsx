"use client";

import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";
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

function TrendingProductCarousel({
  trendingProducts,
}: {
  trendingProducts: Product[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <main className="">
      <h2 className="mb-6 text-center font-roboto text-base font-semibold md:text-start md:text-2xl">
        Trending Items
      </h2>
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
            {trendingProducts.map((product) => (
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
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}

export default TrendingProductCarousel;
