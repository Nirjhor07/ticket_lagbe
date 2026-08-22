import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { storePaymentData } from "@/lib/actions/transitions";
import { updateUserBookingRequest } from "@/lib/actions/updateUserBookingRequest";

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-slate-600">No session ID found.</p>
          <Link
            href="/dashboard/user/bookticket"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to Bookings
          </Link>
        </div>
      </div>
    );
  }

  // Fetch session details from Stripe
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const transactionId = session.payment_intent;
  const userId = session.metadata?.userId || null;
  const paymentStatus = session.payment_status;
  const amountTotal = (session.amount_total / 100).toFixed(2);
  const currency = session.currency?.toUpperCase() || "BDT";
  const { ticketId, quantity } = session.metadata || {};
  const vendorId = session.metadata?.vendorId || null;

  if (paymentStatus === "paid" && ticketId) {
    const payload = {
      paymentStatus,
      amountTotal,
      currency,
      ticketId,
      quantity,
      transactionId,
      userId,
      vendorId,
    };
    const res = await storePaymentData(payload);
    if (!res.ok) {
      console.log("Failed to store payment data:");
    }
    // await updateUserBookingRequest(ticketId, paymentStatus); i will fix it later to update status when booked
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="mt-5 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Payment Successful!
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Thank you for your purchase. Your ticket has been confirmed.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/75 p-5">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Status</span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-emerald-700 border border-emerald-200">
                {paymentStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid</span>
              <span className="font-bold text-slate-900">
                {amountTotal} {currency}
              </span>
            </div>

            {ticketId && (
              <div className="flex justify-between">
                <span className="text-slate-500">Ticket ID</span>
                <span className="font-medium text-slate-700">{ticketId}</span>
              </div>
            )}

            {quantity && (
              <div className="flex justify-between">
                <span className="text-slate-500">Quantity</span>
                <span className="font-medium text-slate-700">{quantity}</span>
              </div>
            )}

            <div className="border-t border-slate-200 pt-3">
              <p className="text-xs text-slate-500">Transaction ID</p>
              <p className="mt-0.5 break-all font-mono text-xs text-slate-700">
                {transactionId}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/dashboard/user/transitions"
            className="w-full rounded-lg bg-slate-900 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
          >
            View My Bookings
          </Link>
          <Link
            href="/"
            className="w-full rounded-lg border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.99]"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
