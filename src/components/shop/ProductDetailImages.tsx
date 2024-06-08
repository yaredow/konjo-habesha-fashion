"use client";

import { cn } from "@/utils/cn";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

export default function ProductDetailImages({ product }: { product: Product }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const handleThumbnailClick = (index: any) => {
    setSelectedPhotoIndex(index);
  };
  return (
    <div className="grid gap-3 md:grid-cols-5">
      <div className="order-last flex w-full gap-3 overflow-x-auto md:order-first md:col-span-1 md:flex-col">
        {product.images.slice(0, 4).map((image, index) => (
          <button
            onClick={() => handleThumbnailClick(index)}
            key={index}
            className={cn(
              "overflow-hidden rounded-lg border transition-colors",
              {
                "opacity-60": index === selectedPhotoIndex,
              },
            )}
          >
            <Image
              alt={image.public_id}
              className="object-cover"
              height="120"
              src={image.url}
              width="100"
            />
            <span className="sr-only">View Image {index + 1}</span>
          </button>
        ))}
      </div>

      <div className="order-first w-full md:order-last md:col-span-4">
        <Image
          src={product.images[selectedPhotoIndex].url}
          alt={product.images[selectedPhotoIndex].public_id}
          className="w-full overflow-hidden rounded-lg border object-cover"
          height="900"
          width="600"
        />
      </div>
    </div>
  );
}
