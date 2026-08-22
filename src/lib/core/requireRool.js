import { redirect } from "next/navigation";
import { getUserSession } from "./getUserSession";

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/login");
  }
  if (user?.role !== role) {
    redirect("/unauthorized");
  }
};
