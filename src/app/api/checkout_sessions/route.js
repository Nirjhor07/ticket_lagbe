import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await request.formData();
    const ticketId = formData.get("ticketId");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const userId = formData.get("userId");
    const vendorId = formData.get("vendorId");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1U71ZdHkqDHeUamJHINm8FYc",
          quantity: 1,
        },
      ],
      // client_reference_id: userId,
      metadata: {
        ticketId: ticketId,
        price: price,
        quantity: quantity,
        vendorId: vendorId,
        userId: userId,
      },
      mode: "payment",
      success_url: `${origin}/dashboard/user/bookticket/success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      // integration_identifier: "{{INTEGRATION_ID}}",
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
