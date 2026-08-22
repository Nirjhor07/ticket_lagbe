import { requireRole } from "@/lib/core/requireRool";

const UserlayoutPage = async ({ children }) => {
  await requireRole("user");

  return children;
};

export default UserlayoutPage;
