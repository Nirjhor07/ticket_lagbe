"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const setUserRoleByAdmin = async (userId, role) => {
  try {
    const data = await auth.api.setRole({
      body: {
        userId,
        role,
      },
      headers: await headers(),
    });

    // Make sure this matches your exact route folder name:
    revalidatePath("/dashboard/admin/usercontrol");

    return { success: true, data };
  } catch (error) {
    console.error("Error setting role:", error);
    return { success: false, error: error.message || "Failed to update role" };
  }
};
