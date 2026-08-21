"use client";

import React, { useState } from "react";
import { Table, Chip, Button } from "@heroui/react";
import { Megaphone, Xmark } from "@gravity-ui/icons";
import { advertisementStatusUpdate } from "@/lib/actions/updateVendorTicketStatusByAdmin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const MAX_ADVERTISED = 6;

const columns = [
  { id: "title", name: "Ticket Title" },
  { id: "route", name: "Route & Transport" },
  { id: "price", name: "Price" },
  { id: "quantity", name: "Seats" },
  { id: "departureDateTime", name: "Departure Date" },
  { id: "status", name: "Status" },
  { id: "actions", name: "Actions" },
];

export default function AdvertiseTable({ tickets = [] }) {
  const [loadingAction, setLoadingAction] = useState({
    id: null,
    status: null,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: null, // "advertise" | "unadvertise" | "limit_exceeded"
    ticket: null,
  });

  const activeCount = tickets.filter(
    (t) => t.advertisementStatus === "active",
  ).length;

  const initiateAction = (ticket, targetStatus) => {
    setErrorMsg(null);

    // Guard: Trigger Limit Warning Modal if exceeding 6
    if (targetStatus === "active" && activeCount >= MAX_ADVERTISED) {
      setModalConfig({
        type: "limit_exceeded",
        ticket,
      });
      setIsOpen(true);
      return;
    }

    // Trigger Action Confirmation Modal
    setModalConfig({
      type: targetStatus === "active" ? "advertise" : "unadvertise",
      ticket,
    });
    setIsOpen(true);
  };

  const handleAdvertisementUpdate = async () => {
    const { ticket, type } = modalConfig;
    if (!ticket || type === "limit_exceeded") {
      setIsOpen(false);
      return;
    }

    const newStatus = type === "advertise" ? "active" : "inactive";
    setLoadingAction({ id: ticket._id, status: newStatus });
    setIsOpen(false);

    try {
      // calling the api to update the advertisement status of the ticket
      const res = await advertisementStatusUpdate(ticket._id, newStatus);
      if (res.modifiedCount > 0) {
        toast.success(
          `Advertisement status updated to "${newStatus}" for ticket "${ticket.title}".`,
        );
        router.refresh();
      }
    } catch (error) {
      toast.error(
        `Failed to update advertisement status: ${error.message || error}`,
      );
    } finally {
      setLoadingAction({ id: null, status: null });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Responsive Slot Counter & Notifications */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-surface-secondary border border-divider p-3 sm:p-4 rounded-xl text-sm">
        <div className="flex items-center gap-2">
          <span className="text-foreground font-medium text-xs sm:text-sm">
            Currently Advertised:
          </span>
          <Chip
            size="sm"
            color={activeCount >= MAX_ADVERTISED ? "warning" : "primary"}
            variant="soft"
            className="font-semibold"
          >
            {activeCount} / {MAX_ADVERTISED}
          </Chip>
        </div>

        {errorMsg && (
          <span className="text-xs text-danger font-medium bg-danger/10 px-2.5 py-1 rounded-md">
            {errorMsg}
          </span>
        )}
      </div>

      {/* Empty State */}
      {tickets.length === 0 && (
        <div className="p-8 text-center text-muted border border-dashed border-divider rounded-xl">
          No approved tickets available for advertisement.
        </div>
      )}

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {tickets.map((ticket) => {
          const currentAdStatus = ticket.advertisementStatus || "inactive";
          const isTicketLoading = loadingAction.id === ticket._id;
          const isLimitReached =
            currentAdStatus === "inactive" && activeCount >= MAX_ADVERTISED;

          return (
            <div
              key={ticket._id}
              className="bg-content1 border border-divider rounded-xl p-4 space-y-3 shadow-sm"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {ticket.imageUrl && (
                    <img
                      src={ticket.imageUrl}
                      alt={ticket.title}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-default-100"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-sm truncate">
                      {ticket.title}
                    </h3>
                    <p className="text-xs text-muted truncate">
                      {ticket.fromLocation} → {ticket.toLocation}
                    </p>
                    <span className="inline-block text-[11px] font-medium text-primary capitalize">
                      {ticket.transportType}
                    </span>
                  </div>
                </div>

                <Chip
                  color={currentAdStatus === "active" ? "success" : "default"}
                  size="sm"
                  variant="soft"
                  className="capitalize font-medium flex-shrink-0"
                >
                  {currentAdStatus}
                </Chip>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-2 gap-2 text-xs border-t border-divider/60 pt-2 text-foreground/80">
                <div>
                  <span className="text-muted block text-[11px]">
                    Price / Seats
                  </span>
                  <span className="font-medium text-foreground">
                    ৳ {ticket.price?.toFixed(2)}{" "}
                    <span className="text-muted text-[11px]">
                      ({ticket.quantity} seats)
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-muted block text-[11px]">
                    Departure Date
                  </span>
                  <span>
                    {new Date(ticket.departureDateTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-span-2 truncate">
                  <span className="text-muted block text-[11px]">Vendor</span>
                  <span className="truncate">{ticket.vendorEmail}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  size="sm"
                  color="success"
                  variant={
                    currentAdStatus === "active" ? "primary" : "tertiary"
                  }
                  className="w-full font-medium text-xs"
                  startContent={
                    !(isTicketLoading && loadingAction.status === "active") && (
                      <Megaphone className="text-sm" />
                    )
                  }
                  isDisabled={
                    currentAdStatus === "active" ||
                    isTicketLoading ||
                    isLimitReached
                  }
                  isLoading={
                    isTicketLoading && loadingAction.status === "active"
                  }
                  onPress={() => initiateAction(ticket, "active")}
                >
                  Advertise
                </Button>

                <Button
                  size="sm"
                  color="danger"
                  variant={
                    currentAdStatus === "inactive" ? "danger" : "tertiary"
                  }
                  className="w-full font-medium text-xs"
                  startContent={
                    !(
                      isTicketLoading && loadingAction.status === "inactive"
                    ) && <Xmark className="text-sm" />
                  }
                  isDisabled={currentAdStatus === "inactive" || isTicketLoading}
                  isLoading={
                    isTicketLoading && loadingAction.status === "inactive"
                  }
                  onPress={() => initiateAction(ticket, "inactive")}
                >
                  Unadvertise
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop / Tablet View */}
      <div className="hidden md:block w-full">
        <Table aria-label="Admin Ticket Advertisement Management Table">
          <Table.ScrollContainer className="max-h-[650px] overflow-y-auto">
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
                    const currentAdStatus =
                      ticket.advertisementStatus || "inactive";
                    const isTicketLoading = loadingAction.id === ticket._id;
                    const isLimitReached =
                      currentAdStatus === "inactive" &&
                      activeCount >= MAX_ADVERTISED;

                    return (
                      <Table.Row key={ticket._id}>
                        {/* Title & Preview Image */}
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            {ticket.imageUrl && (
                              <img
                                src={ticket.imageUrl}
                                alt={ticket.title}
                                className="w-10 h-10 rounded-md object-cover flex-shrink-0 bg-default-100"
                              />
                            )}
                            <div className="flex flex-col">
                              <span className="font-semibold text-foreground text-sm">
                                {ticket.title}
                              </span>
                              <span className="text-xs text-muted">
                                Vendor: {ticket.vendorName}
                              </span>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Route & Transport */}
                        <Table.Cell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">
                              {ticket.fromLocation} → {ticket.toLocation}
                            </span>
                            <span className="text-xs text-muted capitalize">
                              {ticket.transportType}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Price */}
                        <Table.Cell>
                          <span className="text-sm font-medium text-foreground">
                            ৳ {ticket.price?.toFixed(2)}
                          </span>
                        </Table.Cell>

                        {/* Booking Quantity */}
                        <Table.Cell>
                          <span className="text-sm text-foreground/90">
                            {ticket.quantity} seats
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

                        {/* Status Chip */}
                        <Table.Cell>
                          <Chip
                            color={
                              currentAdStatus === "active"
                                ? "success"
                                : "default"
                            }
                            size="sm"
                            variant="soft"
                            className="capitalize font-medium"
                          >
                            {currentAdStatus}
                          </Chip>
                        </Table.Cell>

                        {/* Actions */}
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              color="success"
                              variant={
                                currentAdStatus === "active"
                                  ? "primary"
                                  : "tertiary"
                              }
                              className="font-medium"
                              startContent={
                                !(
                                  isTicketLoading &&
                                  loadingAction.status === "active"
                                ) && <Megaphone className="text-sm" />
                              }
                              isDisabled={
                                currentAdStatus === "active" ||
                                isTicketLoading ||
                                isLimitReached
                              }
                              isLoading={
                                isTicketLoading &&
                                loadingAction.status === "active"
                              }
                              onPress={() => initiateAction(ticket, "active")}
                            >
                              Advertise
                            </Button>

                            <Button
                              size="sm"
                              color="danger"
                              variant={
                                currentAdStatus === "inactive"
                                  ? "danger"
                                  : "tertiary"
                              }
                              className="font-medium"
                              startContent={
                                !(
                                  isTicketLoading &&
                                  loadingAction.status === "inactive"
                                ) && <Xmark className="text-sm" />
                              }
                              isDisabled={
                                currentAdStatus === "inactive" ||
                                isTicketLoading
                              }
                              isLoading={
                                isTicketLoading &&
                                loadingAction.status === "inactive"
                              }
                              onPress={() => initiateAction(ticket, "inactive")}
                            >
                              Unadvertise
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

      {/* Confirmation & Limit Warning Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2 font-semibold text-gray-900 text-base">
                {modalConfig.type === "limit_exceeded" && (
                  <>
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-600 text-sm font-bold">
                      !
                    </span>
                    <span>Advertisement Limit Reached</span>
                  </>
                )}
                {modalConfig.type === "advertise" && (
                  <>
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                      <Megaphone className="text-base" />
                    </div>
                    <span>Confirm Ticket Advertisement</span>
                  </>
                )}
                {modalConfig.type === "unadvertise" && (
                  <>
                    <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
                      <Xmark className="text-base" />
                    </div>
                    <span>Remove Advertisement</span>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <Xmark className="text-base" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 text-sm text-gray-600 bg-white space-y-2">
              {modalConfig.type === "limit_exceeded" && (
                <p>
                  You have already reached the maximum limit of{" "}
                  <strong className="text-gray-900 font-semibold">
                    {MAX_ADVERTISED} active advertisements
                  </strong>
                  . Please unadvertise another ticket before promoting this one.
                </p>
              )}

              {modalConfig.type === "advertise" && (
                <p>
                  Are you sure you want to promote{" "}
                  <strong className="text-gray-900 font-semibold">
                    &quot;{modalConfig.ticket?.title}&quot;
                  </strong>
                  ? This will occupy{" "}
                  <span className="font-semibold text-blue-600">
                    {activeCount + 1} of {MAX_ADVERTISED}
                  </span>{" "}
                  available advertisement slots.
                </p>
              )}

              {modalConfig.type === "unadvertise" && (
                <p>
                  Are you sure you want to stop advertising{" "}
                  <strong className="text-gray-900 font-semibold">
                    &quot;{modalConfig.ticket?.title}&quot;
                  </strong>
                  ? It will be removed from the featured public listings.
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-100 bg-white">
              {modalConfig.type === "limit_exceeded" ? (
                <Button
                  size="sm"
                  color="primary"
                  className="font-medium"
                  onPress={() => setIsOpen(false)}
                >
                  Understood
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="flat"
                    color="default"
                    className="font-medium"
                    onPress={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    color={
                      modalConfig.type === "advertise" ? "success" : "danger"
                    }
                    className="font-medium"
                    onPress={handleAdvertisementUpdate}
                  >
                    {modalConfig.type === "advertise"
                      ? "Confirm & Advertise"
                      : "Confirm & Remove"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
