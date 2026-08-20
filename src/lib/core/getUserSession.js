"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
  // calling get session on the server
  const res = await auth.api.getSession({
    headers: await headers(),
  });
  return res?.user || null;
};
