"use client";

import React, { useState } from "react";
import { Table, Chip, Button } from "@heroui/react";
import { Check, Clock, Xmark } from "@gravity-ui/icons";
import { updateVendorTicketStatusByAdmin } from "@/lib/actions/updateVendorTicketStatusByAdmin";

const statusColorMap = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
};

const columns = [
  { id: "title", name: "Ticket Title" },
  { id: "price", name: "Price" },
  { id: "quantity", name: "Booking Quantity" },
  { id: "departureDateTime", name: "Departure Date" },
  { id: "vendorEmail", name: "Vendor Email" },
  { id: "status", name: "Status" },
  { id: "actions", name: "Actions" },
];

export default function AdminTicketTable({ initialTickets = [] }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [loadingAction, setLoadingAction] = useState({
    id: null,
    status: null,
  });

  const handleStatusUpdate = async (ticketId, newStatus) => {
    setLoadingAction({ id: ticketId, status: newStatus });
    try {
      await updateVendorTicketStatusByAdmin(ticketId, newStatus);

      // Optimistic state update
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket,
        ),
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoadingAction({ id: null, status: null });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* mobile view */}
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
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
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
                      Price
                    </span>
                    <span className="font-bold text-gray-900">
                      ৳ {ticket.price?.toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium">
                      Quantity
                    </span>
                    <span className="text-gray-800 font-medium">
                      {ticket.quantity}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium">
                      Departure Date
                    </span>
                    <span className="text-gray-700">
                      {new Date(ticket.departureDateTime).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium">
                      Vendor Email
                    </span>
                    <span
                      className="text-gray-700 truncate block"
                      title={ticket.vendorEmail}
                    >
                      {ticket.vendorEmail}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
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

                  {/* Pending */}
                  <Button
                    size="sm"
                    color="warning"
                    variant={
                      currentStatus === "pending" ? "secondary" : "tertiary"
                    }
                    className="flex-1 font-medium min-w-[85px]"
                    startContent={
                      !(
                        isTicketLoading && loadingAction.status === "pending"
                      ) && <Clock className="text-sm" />
                    }
                    isDisabled={currentStatus === "pending" || isTicketLoading}
                    isLoading={
                      isTicketLoading && loadingAction.status === "pending"
                    }
                    onPress={() => handleStatusUpdate(ticket._id, "pending")}
                  >
                    Pending
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
            No tickets found.
          </div>
        )}
      </div>

      {/* visible on large screens */}
      <div className="hidden lg:block">
        <Table aria-label="Admin Ticket Management Table">
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
                        {/* Ticket Title & Route */}
                        <Table.Cell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground">
                              {ticket.title}
                            </span>
                            <span className="text-xs text-muted">
                              {ticket.fromLocation} → {ticket.toLocation} (
                              {ticket.transportType})
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Price */}
                        <Table.Cell>
                          <span className="text-sm text-foreground/90 font-medium">
                            ৳ {ticket.price?.toFixed(2)}
                          </span>
                        </Table.Cell>

                        {/* Booking Quantity */}
                        <Table.Cell>
                          <span className="text-sm text-foreground/90">
                            {ticket.quantity}
                          </span>
                        </Table.Cell>

                        {/* Departure Date */}
                        <Table.Cell>
                          <span className="text-sm text-foreground/90 whitespace-nowrap">
                            {new Date(
                              ticket.departureDateTime,
                            ).toLocaleDateString()}
                          </span>
                        </Table.Cell>

                        {/* Vendor Email */}
                        <Table.Cell>
                          <span className="text-sm text-foreground/90">
                            {ticket.vendorEmail}
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

                        {/* Semantic Action Buttons */}
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

                            {/* Pending Button */}
                            <Button
                              size="sm"
                              color="warning"
                              variant={
                                currentStatus === "pending"
                                  ? "secondary"
                                  : "tertiary"
                              }
                              className="font-medium"
                              startContent={
                                !(
                                  isTicketLoading &&
                                  loadingAction.status === "pending"
                                ) && <Clock className="text-sm" />
                              }
                              isDisabled={
                                currentStatus === "pending" || isTicketLoading
                              }
                              isLoading={
                                isTicketLoading &&
                                loadingAction.status === "pending"
                              }
                              onPress={() =>
                                handleStatusUpdate(ticket._id, "pending")
                              }
                            >
                              Pending
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
