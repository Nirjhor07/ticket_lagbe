import { serverFetch, serverProtectedFetch } from "../core/server";

export const getAllTransitions = async (userId) => {
  const res = await serverProtectedFetch(
    `/api/user/transition?userId=${userId}`,
  );

  return res;
};
