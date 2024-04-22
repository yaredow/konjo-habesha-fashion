import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";

export async function createProductReviewAction(formData: FormData) {
  const email = formData.get("email");

  try {
    await connectMongoDB();
    const review = await Review.findOne({ email });
    return { message: "success" };
  } catch (err) {
    throw err;
  }
}
