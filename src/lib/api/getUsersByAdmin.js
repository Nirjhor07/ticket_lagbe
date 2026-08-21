"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserByAdmin = async (req, res) => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name",
      sortDirection: "desc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  return users;
};
