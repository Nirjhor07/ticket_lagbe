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

// getting jwt Token from the server
export const getJwtToken = async () => {
  const token = await auth.api.getToken({
    headers: await headers(),
  });
  return token?.token || null;
};
