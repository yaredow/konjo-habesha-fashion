import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECREAT_KEY as string);
export async function POST() {}
