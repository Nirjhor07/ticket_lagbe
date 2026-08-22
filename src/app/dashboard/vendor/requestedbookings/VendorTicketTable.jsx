"use client";

import React, { useState } from "react";
import { Table, Chip, Button } from "@heroui/react";
import { Check, Xmark } from "@gravity-ui/icons";
import { updateVendorTicketStatusByAdmin } from "@/lib/actions/updateVendorTicketStatusByAdmin";
import { updateUserBookingRequest } from "@/lib/actions/updateUserBookingRequest";
import { toast } from "react-toastify";

const statusColorMap = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
};

const columns = [
  { id: "title", name: "Ticket Title" },
  { id: "Booked by", name: "Booked by" },
  { id: "Total Price", name: "Total Price" },
  { id: "quantity", name: "Booking Quantity" },
  { id: "status", name: "Status" },
  { id: "actions", name: "Actions" },
];

export default function VendorTicketTable({ initialTickets = [] }) {
  console.log("Initial Tickets:", initialTickets); // Log the initial tickets for debugging
  const [tickets, setTickets] = useState(initialTickets);
  const [loadingAction, setLoadingAction] = useState({
    id: null,
    status: null,
  });

  const handleStatusUpdate = async (ticketId, newStatus) => {
    setLoadingAction({ id: ticketId, status: newStatus });
    try {
      // Function for updating the status of the ticket by vendor
      const res = await updateUserBookingRequest(ticketId, newStatus);
      if (res.modifiedCount > 0) {
        toast.success("Ticket status updated successfully!");
      }

      // Optimistic update
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket,
        ),
      );
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    } finally {
      setLoadingAction({ id: null, status: null });
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket) => {
            const currentStatus = ticket.status?.toLowerCase() || "pending";
            const isTicketLoading = loadingAction.id === ticket._id;

            return (
              <div
                key={ticket._id}
                className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4 flex flex-col justify-between"
              >
                {/* Header: Title, Route & Status */}
                <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base capitalize truncate">
                      {ticket.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {ticket.fromLocation} → {ticket.toLocation} (
                      {ticket.transportType})
                    </p>
                  </div>
                  <Chip
                    color={statusColorMap[currentStatus] || "default"}
                    size="sm"
                    variant="soft"
                    className="capitalize font-medium shrink-0"
                  >
                    {ticket.status}
                  </Chip>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium">
                      Booked By
                    </span>
                    <span className="text-gray-800 truncate block font-mono">
                      {ticket.bookedBy}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium">
                      Total Price
                    </span>
                    <span className="font-bold text-gray-900">
                      ৳ {(ticket.price * ticket.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium">
                      Booking Quantity
                    </span>
                    <span className="text-gray-800 font-medium">
                      {ticket.quantity}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                  {/* Approve */}
                  <Button
                    size="sm"
                    color="success"
                    variant={
                      currentStatus === "approved" ? "primary" : "tertiary"
                    }
                    className="flex-1 font-medium min-w-[85px]"
                    startContent={
                      !(
                        isTicketLoading && loadingAction.status === "approved"
                      ) && <Check className="text-sm" />
                    }
                    isDisabled={currentStatus === "approved" || isTicketLoading}
                    isLoading={
                      isTicketLoading && loadingAction.status === "approved"
                    }
                    onPress={() => handleStatusUpdate(ticket._id, "approved")}
                  >
                    Approve
                  </Button>

                  {/* Reject */}
                  <Button
                    size="sm"
                    color="danger"
                    variant={
                      currentStatus === "rejected" ? "danger" : "tertiary"
                    }
                    className="flex-1 font-medium min-w-[85px]"
                    startContent={
                      !(
                        isTicketLoading && loadingAction.status === "rejected"
                      ) && <Xmark className="text-sm" />
                    }
                    isDisabled={currentStatus === "rejected" || isTicketLoading}
                    isLoading={
                      isTicketLoading && loadingAction.status === "rejected"
                    }
                    onPress={() => handleStatusUpdate(ticket._id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white p-8 text-center rounded-xl border border-gray-200 text-gray-500 text-sm">
            No bookings found.
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* Desktop Table View (Visible on screens >= lg)             */}
      {/* ========================================================= */}
      <div className="hidden lg:block">
        <Table aria-label="Vendor Bookings Table">
          <Table.ScrollContainer className="max-h-[600px] overflow-y-auto">
            <Table.Content className="min-w-full">
              <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
                {columns.map((col) => (
                  <Table.Column
                    key={col.id}
                    id={col.id}
                    isRowHeader={col.id === "title"}
                  >
                    {col.name}
                  </Table.Column>
                ))}
              </Table.Header>

              <Table.Body>
                <Table.Collection items={tickets}>
                  {(ticket) => {
                    const currentStatus =
                      ticket.status?.toLowerCase() || "pending";
                    const isTicketLoading = loadingAction.id === ticket._id;

                    return (
                      <Table.Row key={ticket._id}>
                        {/* Ticket Title & Route Details */}
                        <Table.Cell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground capitalize">
                              {ticket.title}
                            </span>
                            <span className="text-xs text-muted">
                              {ticket.fromLocation} → {ticket.toLocation} (
                              {ticket.transportType})
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Booked by user */}
                        <Table.Cell>
                          <span className="text-sm text-foreground/90 font-mono">
                            {ticket.bookedBy}
                          </span>
                        </Table.Cell>

                        {/* Total Price */}
                        <Table.Cell>
                          <span className="text-sm text-foreground/90 font-medium">
                            ৳ {(ticket.price * ticket.quantity).toFixed(2)}
                          </span>
                        </Table.Cell>

                        {/* Booking Quantity */}
                        <Table.Cell>
                          <span className="text-sm text-foreground/90">
                            {ticket.quantity}
                          </span>
                        </Table.Cell>

                        {/* Status Chip */}
                        <Table.Cell>
                          <Chip
                            color={statusColorMap[currentStatus] || "default"}
                            size="sm"
                            variant="soft"
                            className="capitalize font-medium"
                          >
                            {ticket.status}
                          </Chip>
                        </Table.Cell>

                        {/* Action Buttons */}
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            {/* Approve Button */}
                            <Button
                              size="sm"
                              color="success"
                              variant={
                                currentStatus === "approved"
                                  ? "primary"
                                  : "tertiary"
                              }
                              className="font-medium"
                              startContent={
                                !(
                                  isTicketLoading &&
                                  loadingAction.status === "approved"
                                ) && <Check className="text-sm" />
                              }
                              isDisabled={
                                currentStatus === "approved" || isTicketLoading
                              }
                              isLoading={
                                isTicketLoading &&
                                loadingAction.status === "approved"
                              }
                              onPress={() =>
                                handleStatusUpdate(ticket._id, "approved")
                              }
                            >
                              Approve
                            </Button>

                            {/* Reject Button */}
                            <Button
                              size="sm"
                              color="danger"
                              variant={
                                currentStatus === "rejected"
                                  ? "danger"
                                  : "tertiary"
                              }
                              className="font-medium"
                              startContent={
                                !(
                                  isTicketLoading &&
                                  loadingAction.status === "rejected"
                                ) && <Xmark className="text-sm" />
                              }
                              isDisabled={
                                currentStatus === "rejected" || isTicketLoading
                              }
                              isLoading={
                                isTicketLoading &&
                                loadingAction.status === "rejected"
                              }
                              onPress={() =>
                                handleStatusUpdate(ticket._id, "rejected")
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  }}
                </Table.Collection>
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}
