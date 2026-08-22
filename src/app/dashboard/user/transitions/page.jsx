import { getAllTransitions } from "@/lib/api/getAlltransitions";
import { getUserSession } from "@/lib/core/getUserSession";
import React from "react";

const UserTransitionPage = async () => {
  const user = await getUserSession();
  const transitions = await getAllTransitions(user?.id || null);
  console.log("User Transitions:", transitions);

  return (
    <main className="w-full min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              User Transactions
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and track all your recent orders and payment statuses.
            </p>
          </div>
          <div className="text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-xs self-start sm:self-auto">
            Total: {transitions?.length || 0} Records
          </div>
        </header>

        {/* --- Mobile View (Card List - visible on screens < md) --- */}
        <section className="grid grid-cols-1 gap-4 md:hidden">
          {transitions && transitions.length > 0 ? (
            transitions.map((item) => (
              <article
                key={item._id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="font-mono text-xs text-gray-500 truncate max-w-[200px]">
                    {item.transactionId}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      item.paymentStatus === "paid"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                        : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-gray-400 block uppercase font-medium">
                      Ticket ID
                    </span>
                    <span className="font-mono text-xs text-gray-700 truncate block">
                      {item.ticketId}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block uppercase font-medium">
                      Quantity
                    </span>
                    <span className="text-gray-800 font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block uppercase font-medium">
                      Date
                    </span>
                    <span className="text-xs text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block uppercase font-medium">
                      Total Amount
                    </span>
                    <span className="font-bold text-gray-900">
                      {item.amountTotal} {item.currency?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="bg-white p-8 text-center rounded-xl border border-gray-200 text-gray-500 text-sm">
              No transactions found.
            </div>
          )}
        </section>

        {/* --- Tablet & Desktop View (Full Data Table - visible on screens >= md) --- */}
        <section className="hidden md:block overflow-hidden bg-white shadow-xs rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-3.5">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Ticket ID
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-center">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transitions && transitions.length > 0 ? (
                  transitions.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50/75 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs font-medium text-gray-900 whitespace-nowrap">
                        {item.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-500 whitespace-nowrap">
                        {item.ticketId}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-800 font-medium">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                        {item.amountTotal} {item.currency?.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            item.paymentStatus === "paid"
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                              : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                          }`}
                        >
                          {item.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default UserTransitionPage;
