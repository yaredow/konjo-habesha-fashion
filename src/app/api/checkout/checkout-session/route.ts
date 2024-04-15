import { CartItem } from "@/types/product";
import { stripe } from "@/utils/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { cartItems, user } = await request.json();

  const cartData = cartItems.map((item: CartItem) => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const customer = await stripe.customers.create({
    email: user.email,
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
    success_url: `${process.env.HOST}/checkout/checkout-success`,
    cancel_url: `${process.env.HOST}/cart`,
  });

  return NextResponse.json({ session }, { status: 200 });
}
