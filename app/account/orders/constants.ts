import { CheckCircle, Loader, Package, Truck, X } from "lucide-react";

export const orderTabs = [
  { label: "All orders", value: "all", icon: Package, statusFilter: null },
  {
    label: "Processing",
    value: "processing",
    icon: Loader,
    statusFilter: "NO_PICKUP",
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
