import { stripe } from "@/lib/stripe";

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (session_id) {
    // Stripe থেকে সেশনের সব তথ্য ফেচ করা
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Payment Intent ID বা Transaction ID
    const transactionId = session.payment_intent;
    const paymentStatus = session.payment_status;

    console.log("Transaction ID:", transactionId);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p>
          Transaction ID: <span className="font-mono">{transactionId}</span>
        </p>
        <p>Status: {paymentStatus}</p>
      </div>
    );
  }

  return <div>Payment verified.</div>;
}
