"use client";

import React, { useState } from "react";
import { Table, Chip, Button } from "@heroui/react";
import { Check, Clock, Xmark } from "@gravity-ui/icons";
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
      //function for updating the status of the ticket by vendor
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
      <Table aria-label="Vendor Bookings Table">
        <Table.ScrollContainer className="max-h-[600px] overflow-y-auto">
          <Table.Content className="min-w-[850px]">
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

                      {/* booked by user name*/}
                      {/* i will add the name of the booked user later, 
                      right now my database store the userid and i dont want to change it  */}
                      <Table.Cell>
                        <span className="text-sm text-foreground/90">
                          {ticket.bookedBy}
                        </span>
                      </Table.Cell>

                      {/* Total Price */}
                      <Table.Cell>
                        <span className="text-sm text-foreground/90">
                          ৳ {(ticket.price * ticket.quantity).toFixed(2)}
                        </span>
                      </Table.Cell>

                      {/* booking quantity */}
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
  );
}
