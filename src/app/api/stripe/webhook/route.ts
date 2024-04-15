import { createOrder } from "@/server/actions/checkout/createOrder";
import { stripe } from "@/utils/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET as string;
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");
  const res = JSON.parse(payload);

  try {
    let event = await stripe.webhooks.constructEvent(
      payload,
      sig as string,
      endpointSecret,
    );

    switch (event.type) {
      case "checkout.session.completed":
        stripe.customers.retrieve(res.data.customer).then(async (customer) => {
          try {
            const formData = new FormData();
            formData.append("customer", JSON.stringify(customer));
            formData.append("data", JSON.stringify(r));

            const res = await createOrder(formData);
          } catch (err) {
            console.error(err);
            throw err;
          }
        });
    }

    console.log(res);

    return NextResponse.json({ status: "success", event: event.type });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
