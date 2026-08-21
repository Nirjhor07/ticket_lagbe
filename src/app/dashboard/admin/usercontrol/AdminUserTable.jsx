"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Table, Chip, Button } from "@heroui/react";
import {
  Person,
  ShieldCheck,
  Briefcase,
  Ban,
  CircleCheck,
  Xmark,
} from "@gravity-ui/icons";
import { setUserRoleByAdmin } from "@/lib/actions/setUserRole";
import { toast } from "react-toastify";

const roleColorMap = {
  admin: "primary",
  vendor: "secondary",
  user: "default",
  fraud: "danger",
};

const columns = [
  { id: "user", name: "User" },
  { id: "role", name: "Current Role" },
  { id: "verified", name: "Email Verified" },
  { id: "createdAt", name: "Joined Date" },
  { id: "actions", name: "Change Role" },
];

export default function AdminUserTable({ users = [] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [loadingAction, setLoadingAction] = useState({
    id: null,
    targetRole: null,
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState({
    user: null,
    targetRole: null,
  });

  const promptRoleChange = (user, targetRole) => {
    setSelectedAction({ user, targetRole });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAction({ user: null, targetRole: null });
  };

  const confirmRoleChange = async () => {
    const { user, targetRole } = selectedAction;
    if (!user || !targetRole) return;

    const userId = user.id || user._id;
    handleCloseModal();
    setLoadingAction({ id: userId, targetRole });

    try {
      const res = await setUserRoleByAdmin(userId, targetRole);

      if (res?.success) {
        toast.success(`Role updated to ${targetRole} for ${user.name}`);
        startTransition(() => {
          router.refresh();
        });
      } else {
        toast.error(res?.error || "Failed to update user role");
      }
    } catch (error) {
      console.error("Role update failed:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoadingAction({ id: null, targetRole: null });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* ----------------- MOBILE & SMALL TABLET VIEW (Adaptive Card Stack) ----------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:hidden">
        {users.map((user) => {
          const userId = user.id || user._id;
          const currentRole = user.role?.toLowerCase() || "user";
          const isUserBusy = loadingAction.id === userId;

          return (
            <div
              key={userId}
              className="flex flex-col justify-between rounded-xl border border-border bg-surface-secondary/40 p-4 space-y-3 shadow-sm hover:border-border/80 transition-colors"
            >
              {/* Top: Avatar, Name, Role */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-surface-secondary text-foreground font-semibold flex items-center justify-center text-xs shrink-0 border border-border uppercase">
                      {user.name ? user.name.charAt(0) : "U"}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-foreground capitalize truncate text-sm sm:text-base">
                      {user.name}
                    </span>
                    <span className="text-xs text-muted truncate">
                      {user.email}
                    </span>
                  </div>
                </div>

                <Chip
                  color={roleColorMap[currentRole] || "default"}
                  size="sm"
                  variant="soft"
                  className="capitalize font-medium shrink-0"
                >
                  {user.role}
                </Chip>
              </div>

              {/* Middle: Verification & Joined Date */}
              <div className="flex items-center justify-between text-xs border-y border-border/50 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted">Status:</span>
                  <Chip
                    color={user.emailVerified ? "success" : "default"}
                    size="sm"
                    variant="tertiary"
                    className="font-medium"
                  >
                    <span className="flex items-center gap-1">
                      {user.emailVerified && (
                        <CircleCheck className="text-xs" />
                      )}
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </span>
                  </Chip>
                </div>

                <span className="text-muted text-[11px] sm:text-xs">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>

              {/* Bottom: Action Buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <Button
                  size="sm"
                  variant={currentRole === "user" ? "primary" : "tertiary"}
                  color="default"
                  className="w-full font-medium"
                  isDisabled={currentRole === "user" || isUserBusy}
                  isLoading={isUserBusy && loadingAction.targetRole === "user"}
                  onPress={() => promptRoleChange(user, "user")}
                >
                  {!(isUserBusy && loadingAction.targetRole === "user") && (
                    <Person className="text-sm mr-1" />
                  )}
                  User
                </Button>

                <Button
                  size="sm"
                  variant={currentRole === "admin" ? "primary" : "tertiary"}
                  color="primary"
                  className="w-full font-medium"
                  isDisabled={currentRole === "admin" || isUserBusy}
                  isLoading={isUserBusy && loadingAction.targetRole === "admin"}
                  onPress={() => promptRoleChange(user, "admin")}
                >
                  {!(isUserBusy && loadingAction.targetRole === "admin") && (
                    <ShieldCheck className="text-sm mr-1" />
                  )}
                  Admin
                </Button>

                <Button
                  size="sm"
                  variant={currentRole === "vendor" ? "primary" : "tertiary"}
                  color="secondary"
                  className="w-full font-medium"
                  isDisabled={currentRole === "vendor" || isUserBusy}
                  isLoading={
                    isUserBusy && loadingAction.targetRole === "vendor"
                  }
                  onPress={() => promptRoleChange(user, "vendor")}
                >
                  {!(isUserBusy && loadingAction.targetRole === "vendor") && (
                    <Briefcase className="text-sm mr-1" />
                  )}
                  Vendor
                </Button>

                <Button
                  size="sm"
                  variant={currentRole === "fraud" ? "danger" : "tertiary"}
                  color="danger"
                  className="w-full font-medium"
                  isDisabled={currentRole === "fraud" || isUserBusy}
                  isLoading={isUserBusy && loadingAction.targetRole === "fraud"}
                  onPress={() => promptRoleChange(user, "fraud")}
                >
                  {!(isUserBusy && loadingAction.targetRole === "fraud") && (
                    <Ban className="text-sm mr-1" />
                  )}
                  Fraud
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ----------------- LAPTOP & DESKTOP VIEW (Full Scrollable Table) ----------------- */}
      <div className="hidden lg:block w-full overflow-hidden rounded-xl border border-border">
        <Table aria-label="Admin User Management Table">
          <Table.ScrollContainer className="max-h-[650px] overflow-y-auto overflow-x-auto">
            <Table.Content className="w-full min-w-[900px]">
              <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
                {columns.map((col) => (
                  <Table.Column
                    key={col.id}
                    id={col.id}
                    isRowHeader={col.id === "user"}
                  >
                    {col.name}
                  </Table.Column>
                ))}
              </Table.Header>

              <Table.Body>
                <Table.Collection items={users}>
                  {(user) => {
                    const userId = user.id || user._id;
                    const currentRole = user.role?.toLowerCase() || "user";
                    const isUserBusy = loadingAction.id === userId;

                    return (
                      <Table.Row
                        key={userId}
                        className="border-b border-border/40 last:border-0"
                      >
                        {/* User Column */}
                        <Table.Cell>
                          <div className="flex items-center gap-3 py-1">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.name || "User"}
                                className="w-9 h-9 rounded-full object-cover shrink-0 border border-border"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-surface-secondary text-foreground font-semibold flex items-center justify-center text-xs shrink-0 border border-border uppercase">
                                {user.name ? user.name.charAt(0) : "U"}
                              </div>
                            )}

                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-foreground capitalize truncate">
                                {user.name}
                              </span>
                              <span className="text-xs text-muted truncate max-w-[200px] xl:max-w-none">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Current Role */}
                        <Table.Cell>
                          <Chip
                            color={roleColorMap[currentRole] || "default"}
                            size="sm"
                            variant="soft"
                            className="capitalize font-medium"
                          >
                            {user.role}
                          </Chip>
                        </Table.Cell>

                        {/* Email Verified */}
                        <Table.Cell>
                          <Chip
                            color={user.emailVerified ? "success" : "default"}
                            size="sm"
                            variant="tertiary"
                            className="capitalize font-medium"
                          >
                            <span className="flex items-center gap-1">
                              {user.emailVerified && (
                                <CircleCheck className="text-xs" />
                              )}
                              {user.emailVerified ? "Verified" : "Unverified"}
                            </span>
                          </Chip>
                        </Table.Cell>

                        {/* Joined Date */}
                        <Table.Cell>
                          <span className="text-xs text-muted whitespace-nowrap">
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )
                              : "N/A"}
                          </span>
                        </Table.Cell>

                        {/* Action Buttons */}
                        <Table.Cell>
                          <div className="flex items-center gap-1.5 flex-nowrap">
                            <Button
                              size="sm"
                              variant={
                                currentRole === "user" ? "primary" : "tertiary"
                              }
                              color="default"
                              className="font-medium"
                              isDisabled={currentRole === "user" || isUserBusy}
                              isLoading={
                                isUserBusy &&
                                loadingAction.targetRole === "user"
                              }
                              onPress={() => promptRoleChange(user, "user")}
                            >
                              {!(
                                isUserBusy &&
                                loadingAction.targetRole === "user"
                              ) && <Person className="text-sm mr-1" />}
                              User
                            </Button>

                            <Button
                              size="sm"
                              variant={
                                currentRole === "admin" ? "primary" : "tertiary"
                              }
                              color="primary"
                              className="font-medium"
                              isDisabled={currentRole === "admin" || isUserBusy}
                              isLoading={
                                isUserBusy &&
                                loadingAction.targetRole === "admin"
                              }
                              onPress={() => promptRoleChange(user, "admin")}
                            >
                              {!(
                                isUserBusy &&
                                loadingAction.targetRole === "admin"
                              ) && <ShieldCheck className="text-sm mr-1" />}
                              Admin
                            </Button>

                            <Button
                              size="sm"
                              variant={
                                currentRole === "vendor"
                                  ? "primary"
                                  : "tertiary"
                              }
                              color="secondary"
                              className="font-medium"
                              isDisabled={
                                currentRole === "vendor" || isUserBusy
                              }
                              isLoading={
                                isUserBusy &&
                                loadingAction.targetRole === "vendor"
                              }
                              onPress={() => promptRoleChange(user, "vendor")}
                            >
                              {!(
                                isUserBusy &&
                                loadingAction.targetRole === "vendor"
                              ) && <Briefcase className="text-sm mr-1" />}
                              Vendor
                            </Button>

                            <Button
                              size="sm"
                              variant={
                                currentRole === "fraud" ? "danger" : "tertiary"
                              }
                              color="danger"
                              className="font-medium"
                              isDisabled={currentRole === "fraud" || isUserBusy}
                              isLoading={
                                isUserBusy &&
                                loadingAction.targetRole === "fraud"
                              }
                              onPress={() => promptRoleChange(user, "fraud")}
                            >
                              {!(
                                isUserBusy &&
                                loadingAction.targetRole === "fraud"
                              ) && <Ban className="text-sm mr-1" />}
                              Fraud
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

      {/* ----------------- RESPONSIVE CONFIRMATION MODAL ----------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-2xl bg-surface-secondary border border-border p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Confirm Role Change
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-muted hover:text-foreground transition-colors p-1 rounded-md"
              >
                <Xmark className="text-base" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="text-sm text-foreground/80 space-y-2.5">
              <p className="leading-relaxed">
                Are you sure you want to change the role of{" "}
                <span className="font-semibold text-foreground">
                  {selectedAction.user?.name}
                </span>{" "}
                (<span className="break-all">{selectedAction.user?.email}</span>
                ) from{" "}
                <span className="font-semibold capitalize text-warning">
                  {selectedAction.user?.role}
                </span>{" "}
                to{" "}
                <span className="font-semibold capitalize text-primary">
                  {selectedAction.targetRole}
                </span>
                ?
              </p>
              {selectedAction.targetRole === "fraud" && (
                <div className="rounded-lg bg-danger/10 border border-danger/20 p-2.5 text-xs text-danger font-medium">
                  ⚠️ Warning: Marking this user as fraud will restrict their
                  account access.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-2 border-t border-border/50">
              <Button
                size="sm"
                variant="tertiary"
                color="default"
                className="w-full sm:w-auto"
                onPress={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                color={
                  selectedAction.targetRole === "fraud" ? "danger" : "primary"
                }
                className="w-full sm:w-auto"
                onPress={confirmRoleChange}
              >
                Confirm Change
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
