import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "../account/authenticate";
import { auth } from "@/auth";

export async function createOrder(
  formData: FormData,
): Promise<ErrorAndSuccessType> {
  const customer = JSON.parse(formData.get("customer") as string);
  const data = JSON.parse(formData.get("data") as string);

  const items = JSON.parse(customer?.metadata.cart);

  const products = items.map((item: any) => {
    return {
      productId: item.productId,
      name: item.name,
      images: item.images,
      quantity: item.quantity,
    };
  });

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId: customer?.metadata.userId,
        customerId: data?.customer,
        paymentIntentId: data.payment_intent,
        subtotal: data?.amount_subtotal / 100,
        shipping: data?.customer_details,
        payment_status: data?.payment_status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (!newOrder) {
      return { error: "Unable t crate an order" };
    }

    return { success: "Order created successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
