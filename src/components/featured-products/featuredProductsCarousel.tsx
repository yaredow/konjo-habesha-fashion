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

function FeaturedProductsCarousel({ featuredProducts = [] }: any) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <main className="">
      <div className="">
        <h2 className="mb-6 text-center font-roboto text-base font-semibold md:mx-[26px] md:text-start md:text-2xl">
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
            className=" w-full max-w-[78rem]"
          >
            <CarouselContent>
              {featuredProducts.data.slice(0, 8).map((product: any) => (
                <CarouselItem key={product._id} className="md:basis-1/4">
                  <div className="p-1">
                    <Card>
                      <CardContent className="justify-cente flex aspect-square items-center p-2">
                        <div className=" mb-4 w-full">
                          <AspectRatio ratio={4 / 5}>
                            <Image
                              src={product.images[0].url}
                              alt="images of habesha traditional clothes"
                              width={800}
                              height={1000}
                              className=" rounded-md object-cover"
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
      </div>
    </main>
  );
}

export default FeaturedProductsCarousel;
