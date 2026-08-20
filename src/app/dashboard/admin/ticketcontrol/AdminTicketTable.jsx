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
      // await updateTicketStatus(ticketId, newStatus);
      const res = await updateVendorTicketStatusByAdmin(ticketId, newStatus);

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
      <Table aria-label="Admin Ticket Management Table">
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

                      {/* Colored Semantic Action Buttons */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          {/* Success Approve Button */}
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

                          {/* Warning Pending Button */}
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

                          {/* Danger Reject Button */}
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
