import { getUserById } from "@/data/user";
import { ErrorAndSuccessType } from "./authenticate";

export async function uploadUserProfileImage(
  formData: FormData,
): Promise<ErrorAndSuccessType> {
  const id = formData.get("id");
  const image = formData.get("image");

  return { success: "Image uploaded successfully" };
}
