import { requireRole } from "@/lib/core/requireRool";

const adminLayout = async ({ children }) => {
  await requireRole("admin");
  return children;
};

export default adminLayout;
