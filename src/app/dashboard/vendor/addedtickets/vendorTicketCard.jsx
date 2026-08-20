"use client";
import { updateVendorTicket } from "@/lib/actions/updateVendorTicket";
import { deleteVendorTicket } from "@/lib/api/deleteVendorTicket";
import {
  Calendar,
  CircleExclamationFill,
  Hammer,
  MapPin,
  Sparkles,
  TrashBin,
  Xmark,
} from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function VendorTicketCard({ ticket }) {
  const isRejected = ticket.status === "rejected";
  //router
  const router = useRouter();

  // Modal visibility states
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for update modal
  const [formData, setFormData] = useState({
    title: ticket.title || "",
    price: ticket.price || 0,
    quantity: ticket.quantity || 1,
    fromLocation: ticket.fromLocation || "",
    toLocation: ticket.toLocation || "",
    departureDateTime: ticket.departureDateTime
      ? new Date(ticket.departureDateTime).toISOString().slice(0, 16)
      : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedPayload = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        totalCost: Number(formData.price) * Number(formData.quantity),
      };

      // update the ticket function
      const res = await updateVendorTicket(ticket._id, updatedPayload);

      if (res?.modifiedCount > 0 || res?.matchedCount > 0) {
        toast.success("Ticket updated successfully!");
        setIsUpdateOpen(false);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update ticket");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Something went wrong while updating");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteVendorTicket(ticket._id);
      toast.success("Ticket deleted successfully!");
      router.refresh(); // Refresh the page to reflect the deletion
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete ticket:", error);
      toast.error("Failed to delete ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Status badge styling lookup
  const statusStyles = {
    pending: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    approved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    rejected: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  };

  // Format departure date and time
  const formattedDate = new Date(ticket.departureDateTime).toLocaleString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <>
      {/* ---------------- CARD ---------------- */}
      <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 bg-white/40">
        {/* Ticket Image & Status Overlay */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={
              ticket.imageUrl ||
              "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?q=80"
            }
            alt={ticket.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Transport Type Badge */}
          <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            {ticket.transportType}
          </span>

          {/* Dynamic Verification Status Badge */}
          <span
            className={`absolute top-3 right-3 rounded-full border px-3 py-1 text-xs font-semibold capitalize backdrop-blur-md ${
              statusStyles[ticket.status] ||
              "bg-muted text-muted-foreground border-border"
            }`}
          >
            {ticket.status}
          </span>

          {/* Route Details Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>{ticket.fromLocation}</span>
              <span className="text-white/60">→</span>
              <span>{ticket.toLocation}</span>
            </div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="flex flex-1 flex-col p-5 space-y-4">
          <div>
            <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground">
              {ticket.title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/40 p-3 text-center border border-border/40">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">
                Price
              </span>
              <span className="font-semibold text-foreground">
                ৳{ticket.price}
              </span>
            </div>
            <div className="border-x border-border/60">
              <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">
                Seats
              </span>
              <span className="font-semibold text-foreground">
                {ticket.quantity}
              </span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">
                Total
              </span>
              <span className="font-semibold text-foreground">
                ৳{ticket.totalCost}
              </span>
            </div>
          </div>

          {/* Perks Tags */}
          {ticket.perks && ticket.perks.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {ticket.perks.map((perk, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                >
                  <Sparkles className="h-2.5 w-2.5 text-primary" />
                  {perk}
                </span>
              ))}
            </div>
          )}

          <div className="flex-1" />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={() => setIsUpdateOpen(true)}
              disabled={isRejected}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold transition-all hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-background"
            >
              <Hammer className="h-4 w-4" />
              Update
            </button>

            <button
              onClick={() => setIsDeleteOpen(true)}
              disabled={isRejected}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-destructive/20 bg-destructive/10 text-destructive px-3 py-2 text-sm font-semibold transition-all hover:bg-red-700 hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-destructive/10 disabled:hover:text-destructive"
            >
              <TrashBin className="h-4 w-4" />
              Delete
            </button>
          </div>

          {isRejected && (
            <p className="text-center text-xs font-medium text-rose-500">
              Actions disabled because this ticket was rejected.
            </p>
          )}
        </div>
      </div>

      {/* ---------------- UPDATE MODAL ---------------- */}
      {isUpdateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Hammer className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Update Ticket
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Modify the information for this listing.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUpdateOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Xmark className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveUpdate} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                    Price (৳)
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                    Seats Available
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                    From
                  </label>
                  <input
                    type="text"
                    name="fromLocation"
                    value={formData.fromLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                    To
                  </label>
                  <input
                    type="text"
                    name="toLocation"
                    value={formData.toLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                  Departure Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="departureDateTime"
                  value={formData.departureDateTime}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- DELETE CONFIRMATION MODAL ---------------- */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/15 text-destructive mb-4">
                <CircleExclamationFill className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Delete Ticket Listing
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-foreground">
                  &quot;{ticket.title}&quot;
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isSubmitting}
                className="rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
              >
                {isSubmitting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
