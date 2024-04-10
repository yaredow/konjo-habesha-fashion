import cloudinary from "@/lib/utils/cloudinary";
import connectMongoDB from "@/lib/utils/mongo/db";
import { CreateProductFormSchema } from "@/lib/utils/validators/form-validators";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

type UploadeImage = {
  public_id: string;
  url: string;
};
export async function POST(request: Request) {
  const data = await request.formData();
  console.log(data.get("sizes"));
  const uploadedImages: UploadeImage[] = [];

  try {
    // const { images }: { images: File[] } = data;

    // for (const image of images) {
    //   const arrayBuffer = await image.arrayBuffer();
    //   const buffer = new Uint8Array(arrayBuffer);

    //   const uploadResult = await new Promise((resolve, reject) => {
    //     cloudinary.uploader
    //       .upload_stream(
    //         {
    //           tags: ["nextjs-konjo-habesha-test-uploads"],
    //           upload_preset: "konjo-habesha",
    //         },
    //         function (error, result) {
    //           if (error) {
    //             reject(error);
    //             return;
    //           }
    //           resolve(result);
    //         },
    //       )
    //       .end(buffer);
    //   });

    //   console.log(uploadResult);
    // }

    const validatedData = CreateProductFormSchema.safeParse({
      name: data.get("name"),
      price: data.get("price"),
      category: data.get("category"),
      sizes: data.get("sizes"),
      stockQuantity: data.get("stockQuantity"),
      description: data.get("description"),
    });

    console.log(validatedData.success);

    if (!validatedData.success) {
      return NextResponse.json(
        { message: validatedData.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    await connectMongoDB();
    const newProduct = await Product.create(validatedData.data);

    if (!newProduct) {
      return NextResponse.json(
        { message: "There was an error creating the product" },
        { status: 400 },
      );
    }

    return NextResponse.json({ mesage: "Product creation was successful" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Intern server error" },
      { status: 500 },
    );
  }
}
