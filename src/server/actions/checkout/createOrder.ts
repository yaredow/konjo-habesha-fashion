import Order from "@/models/orderModel";

export async function createOrder(formData: FormData) {
  const customer = formData.get("customer");
  const data = formData.get("data");

  const items = JSON.parse(customer?.metadata.cart);

  const products = items.map((item: any) => {
    return {
      productId: item.productId,
      name: item.name,
      images: item.images,
      quantity: item.quantity,
    };
  });

  const newOrder = new Order({
    userId: customer?.metadata.userId,
    customerId: data?.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data?.amount_subtotal / 100,
    total: data?.amount_total,
    shipping: data?.customer_details,
    payment_status: data?.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log(savedOrder);
  } catch (err) {
    console.error(err);
  }
}
