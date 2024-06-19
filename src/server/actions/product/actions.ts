"use server";

import { revalidatePath } from "next/cache";
import {
  CreateProductFormSchema,
  ErrorAndSuccessType,
} from "@/utils/validators/form-validators";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import cloudinary from "@/utils/cloudinary";
import { Product } from "@prisma/client";
import { UploadApiResponse } from "cloudinary";

type ImageTypes = {
  public_id: string;
  url: string;
};

type ReturnType = {
  error?: string;
  success?: string;
  uploadedImages?: ImageTypes[];
};

export async function createProductAction(
  formData: FormData,
): Promise<ErrorAndSuccessType> {
  let sizes: string[] = [];
  const sizesData = formData.get("sizes");
  const images = formData.getAll("images") as File[];

  if (typeof sizesData === "string") {
    sizes = sizesData.split(",").map((size) => size.trim());
  } else if (Array.isArray(sizesData)) {
    sizes = sizesData;
  }

  const validatedFields = CreateProductFormSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    sizes,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid data",
    };
  }

  try {
    const { uploadedImages } = await uploadProductImagesAction(images);
    const slug = slugify(validatedFields.data.name, { lower: true });

    const newProduct = await prisma.product.create({
      data: {
        ...validatedFields.data,
        images: uploadedImages,
        slug,
      },
    });

    if (!newProduct) {
      return { error: "New product creation failed" };
    }

    revalidatePath("/");
    return { success: "Product created successfully" };
  } catch (err) {
    throw err;
  }
}

export async function deleteProductImageAction(
  public_id: string,
  product_id: string,
) {
  try {
    const cloudinaryResult = await cloudinary.uploader.destroy(public_id);

    if (cloudinaryResult.result === "ok") {
      const product = await prisma.product.findUnique({
        where: { id: product_id },
      });

      if (!product) {
        return { error: "Product not found " };
      }

      const updatedImages = product.images.filter(
        (image) => image.public_id !== public_id,
      );

      await prisma.product.update({
        where: { id: product_id },
        data: {
          images: updatedImages,
        },
      });
    }

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw error;
  }
}

export async function deleteProductAction(
  id: string,
): Promise<ErrorAndSuccessType> {
  try {
    const product = await prisma.product.delete({ where: { id } });

    if (!product) {
      return {
        error: "Product not found",
      };
    }

    revalidatePath("/");

    return {
      success: "Product deleted successfully",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editProductAction(
  productDetails: Product,
): Promise<ErrorAndSuccessType> {
  try {
    const { id, ...updateData } = productDetails;
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        Review: {},
      },
    });

    if (!product) {
      return {
        error: "Failed to update product",
      };
    }

    return {
      success: "Product successfully updated",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchProductsWithCategory(type: string) {
  try {
    let products: Product[] = [];

    if (type === "trending") {
      const minUnitSold = 10;
      products = await prisma.product.findMany({
        where: {
          unitsSold: {
            gte: minUnitSold,
          },
        },
        take: 8,
        orderBy: {
          unitsSold: "desc",
        },
      });
    } else if (type === "featured") {
      products = await prisma.product.findMany({
        where: {
          isFeatured: true,
          stockQuantity: {
            gt: 0,
          },
        },
        take: 8,
      });
    } else if (type === "new-arrival") {
      const daysAgo = 30;
      products = await prisma.product.findMany({
        where: {
          productAddedDate: {
            gte: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
          },
        },
        take: 8,
        orderBy: {
          productAddedDate: "desc",
        },
      });
    } else {
      throw new Error("Invalid type");
    }

    if (products) {
      return { success: true, products };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadProductImagesAction(
  images: File[],
  productId?: string,
): Promise<ReturnType> {
  const uploadedImages = [] as ImageTypes[];

  try {
    for (const image of images) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const uploadResult = await new Promise<UploadApiResponse | undefined>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                tags: ["konjo-habesha-next-js"],
                upload_preset: "konjo-habesha",
              },
              function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              },
            )
            .end(buffer);
        },
      );

      uploadedImages.push({
        public_id: uploadResult?.public_id as string,
        url: uploadResult?.url as string,
      });
    }

    if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (product) {
        await prisma.product.update({
          where: { id: product.id },
          data: {
            images: [...product.images, ...uploadedImages],
          },
        });
      }

      return { success: "Images are updated successfully" };
    }

    return {
      uploadedImages,
      success: "Images are uploaded successfully",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
