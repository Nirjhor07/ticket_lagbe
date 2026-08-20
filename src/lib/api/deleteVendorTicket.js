const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const deleteVendorTicket = async (ticketId) => {
  try {
    const res = await fetch(`${baseUrl}/api/vendor/tickets/${ticketId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete vendor ticket");
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting vendor ticket:", error);
    throw error;
  }
};
