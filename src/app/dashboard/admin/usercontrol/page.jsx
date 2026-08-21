import React from "react";
import { getUserByAdmin } from "@/lib/api/getUsersByAdmin";
import AdminUserTable from "./AdminUserTable";

const AdminManageUserPage = async () => {
  const data = await getUserByAdmin();
  const users = data?.users || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          User Management
        </h1>
        <p className="text-sm text-muted">
          Manage system users, assign roles, and handle restrictions (
          {users.length} total users).
        </p>
      </div>

      <AdminUserTable users={users} />
    </div>
  );
};

export default AdminManageUserPage;
