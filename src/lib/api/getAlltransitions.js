import { serverFetch } from "../core/server";

export const getAllTransitions = async (userId) => {
  const res = await serverFetch(`/api/user/transition?userId=${userId}`);

  return res;
};
