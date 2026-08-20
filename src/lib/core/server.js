"use server";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
