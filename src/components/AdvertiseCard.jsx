import TicketCard from "@/app/all-tickets/TicketCard";
import { getAllticketAdvertiseStatus } from "@/lib/api/getAlltickets";

const AdvertiseCard = async () => {
  const tickets = (await getAllticketAdvertiseStatus()) || [];

  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 bg-[#E3F2FD]">
      {/* Decorative Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-sky-400/30 via-indigo-400/25 to-blue-300/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-blue-400/15 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5 border-b border-sky-900/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/70 backdrop-blur-md text-blue-700 border border-white/60 shadow-sm mb-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              Featured Deals
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Sponsored & Advertised Tickets
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl font-normal">
              Handpicked premium listings and exclusive travel options currently
              spotlighted.
            </p>
          </div>

          {tickets.length > 0 && (
            <div className="self-start md:self-auto inline-flex items-center gap-2 bg-white/75 backdrop-blur-md border border-white/80 px-4 py-2 rounded-xl shadow-xs text-xs font-semibold text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>
                {tickets.length} {tickets.length === 1 ? "Listing" : "Listings"}{" "}
                Available
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-sky-300/80 bg-white/40 backdrop-blur-sm py-20 px-6 text-center shadow-inner">
            <div className="p-4 bg-white rounded-2xl mb-4 text-sky-600 shadow-sm border border-sky-100">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No active advertisements
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">
              Check back later for newly featured promotional deals and
              spotlighted routes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="group relative transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_35px_-10px_rgba(30,58,138,0.15)] rounded-2xl"
              >
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvertiseCard;
