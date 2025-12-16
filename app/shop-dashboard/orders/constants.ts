import { Package, Truck, CheckCircle, Loader, X } from "lucide-react";

export const orderTabs = [
  {
    label: "No Pickup",
    value: "no_pickup",
    icon: Package,
    statusFilter: "NO_PICKUP",
  },
  { label: "All orders", value: "all", icon: Package, statusFilter: null },
  {
    label: "Processing",
    value: "processing",
    icon: Loader,
    statusFilter: "PROCESSING",
  },
  {
    label: "Packing",
    value: "packing",
    icon: Package,
    statusFilter: "PACKING",
  },
  {
    label: "Shipping",
    value: "shipping",
    icon: Truck,
    statusFilter: "SHIPPING",
  },
  {
    label: "Completed",
    value: "completed",
    icon: CheckCircle,
    statusFilter: "SUCCESS",
  },
  {
    label: "Cancelled",
    value: "cancelled",
    icon: X,
    statusFilter: "CANCELLED",
  },
];
