import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  let event: Stripe.Event;
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig as string,
      endpointSecret as string,
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Checkout session ${session.id} completed.`);
      // Add your business logic here
      break;
    // Add more cases for other event types you want to handle
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new NextResponse(null, { status: 200 });
}
