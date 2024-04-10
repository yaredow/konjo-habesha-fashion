import cloudinary from "@/lib/utils/cloudinary";
import connectMongoDB from "@/lib/utils/mongo/db";
import { CreateProductFormSchema } from "@/lib/utils/validators/form-validators";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  const images = data.getAll("images") as File[];
  const uploadedImages = [];

  console.log(images);

  try {
    for (const image of images) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: ["nextjs-konjo-habesha-test-uploads"],
              upload_preset: "konjo-habesha",
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            },
          )
          .end(buffer);
      });

      uploadedImages.push({
        public_id: uploadResult.public_id,
        url: uploadResult.url,
      });
    }

    let sizes: string[] = [];
    const sizesData = data.get("sizes");

    if (typeof sizesData === "string") {
      // Parse the string into an array
      sizes = sizesData.split(",").map((size) => size.trim());
    } else if (Array.isArray(sizesData)) {
      sizes = sizesData;
    }

    const validatedData = CreateProductFormSchema.safeParse({
      name: data.get("name"),
      price: data.get("price"),
      category: data.get("category"),
      sizes: sizes,
      stockQuantity: data.get("stockQuantity"),
      description: data.get("description"),
    });

    if (!validatedData.success) {
      return NextResponse.json(
        { message: validatedData.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    await connectMongoDB();
    const newProduct = await Product.create({
      ...validatedData.data,
      images: uploadedImages,
    });

    if (!newProduct) {
      return NextResponse.json(
        { message: "There was an error creating the product" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { mesage: "Product creation was successful" },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Intern server error" },
      { status: 500 },
    );
  }
}
