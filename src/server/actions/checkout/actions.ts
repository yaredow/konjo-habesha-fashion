"use server";

import prisma from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "../email/email";
import { ErrorAndSuccessType } from "@/utils/validators/form-validators";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import { CartItem } from "@/../../types/product";
import { stripe } from "@/lib/stripe";

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
      quantity: item.quantity,
      price: item.price,
    };
  });

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId: customer?.metadata.userId,
        customerId: data?.customer,
        paymentIntentId: data.payment_intent,
        products,
        subtotal: data?.amount_subtotal / 100,
        shipping: data?.customer_details,
        payment_status: data?.payment_status,
      },
    });

    if (!newOrder) {
      return { error: "Unable t crate an order" };
    }

    await sendOrderConfirmationEmail(
      customer?.metadata.name,
      newOrder?.id,
      newOrder?.createdAt.toISOString(),
      newOrder?.products,
      newOrder?.subtotal,
      customer?.metadata.email,
    );

    return { success: "Order created successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCheckoutSessionUrlAction(formData: FormData) {
  const cartItems = JSON.parse(formData.get("cartItems") as string);
  const userSession = await auth();
  const user = userSession?.user as User;

  const cartData = cartItems.map((item: CartItem) => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const customer = await stripe.customers.create({
    email: user.email!,
    metadata: {
      userId: user.id,
      cart: JSON.stringify(cartData),
    },
  });

  const lineItems = cartItems.map((item: CartItem) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.images[0].url],
      },
      unit_amount: item.totalPrice! * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "ET"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items: lineItems,
    mode: "payment",
    customer: customer.id,
    success_url:
      "https://konjo-habesha-fashion.vercel.app/checkout/checkout-success",
    cancel_url: "https://konjo-habesha-fashion.vercel.app/cart",
  });

  const { url } = session;

  if (session) {
    return { success: true, url };
  }
}

export async function updateProductStats(formData: FormData) {
  const customer = JSON.parse(formData.get("customer") as string);

  const items = JSON.parse(customer.metadata.cart);

  await Promise.all(
    items.map(async (item: CartItem) => {
      try {
        const product = await prisma.product.findFirst({
          where: { name: item.name },
        });

        if (!product) {
          throw new Error("Product not found");
        }

        await prisma.product.update({
          where: { id: product.id },
          data: {
            unitsSold: product.unitsSold + item.quantity,
            stockQuantity: product.stockQuantity - item.quantity,
          },
        });

        product.unitsSold += item.quantity;
        product.stockQuantity -= item.quantity;

        if (product.stockQuantity === 0) {
          product.inStock = false;
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    }),
  );
}
