export const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "NO_PICKUP":
      return "bg-yellow-100 text-yellow-800";
    case "PROCESSING":
      return "bg-orange-100 text-orange-800";
    case "PACKING":
      return "bg-purple-100 text-purple-800";
    case "SHIPPING":
      return "bg-blue-100 text-blue-800";
    case "SUCCESS":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-gray-100 text-gray-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "NO_PICKUP":
      return "Pending";
    case "PROCESSING":
      return "Processing";
    case "PACKING":
      return "Packing";
    case "SHIPPING":
      return "Shipping";
    case "SUCCESS":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    case "FAILED":
      return "Failed";
    default:
      return status;
  }
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
