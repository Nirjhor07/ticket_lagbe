"use server";

import { notFound, redirect } from "next/navigation";
import { getJwtToken } from "./getUserSession";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// get headers from the server token jwt
export const getHeaders = async () => {
  const token = await getJwtToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return headers;
};

//protected server fetch function
export const serverProtectedFetch = async (path) => {
  const headers = await getHeaders();
  if (!headers.Authorization) {
    redirect("/unauthorized");
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  await validateServerResponse(res);
  return res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // Disable caching for GET requests
  });
  return res.json();
};

export const serverMutation = async (path, body, Method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: Method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

// server protected mutation function
export const serverProtectedMutation = async (path, body, Method = "POST") => {
  const headers = await getHeaders();
  if (!headers.Authorization) {
    redirect("/unauthorized");
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method: Method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  await validateServerResponse(res);
  return res.json();
};

//response validation function
export const validateServerResponse = async (res) => {
  if (!res) return;

  // Extract status code whether `res` is a standard fetch Response, Axios object, or custom API payload
  const status = res.status || res.statusCode || res.code;

  // 401 Unauthorized -> Redirect to Login
  if (status === 401) {
    redirect("/unauthorized"); // You can create an app/unauthorized/page.jsx or redirect to login page '/login'
  }

  // 403 Forbidden -> Redirect to Forbidden/Unauthorized Page
  if (status === 403) {
    redirect("/forbidden"); // You can create an app/forbidden/page.jsx or redirect to home '/'
  }

  // 404 Not Found -> Trigger Next.js native notFound() or custom redirect
  if (status === 404) {
    notFound(); // i will add not found page later, for now it will show the default not found page of next js
  }

  // 500 Internal Server Error (Optional fallback)
  if (status >= 500) {
    redirect("/error");
  }
};
