import { Package, Truck, CheckCircle, Loader, X } from "lucide-react";

export const orderTabs = [
  {
    labelKey: "noPickup",
    value: "no_pickup",
    icon: Package,
    statusFilter: "NO_PICKUP",
  },
  { labelKey: "allOrders", value: "all", icon: Package, statusFilter: null },
  {
    labelKey: "processing",
    value: "processing",
    icon: Loader,
    statusFilter: "PROCESSING",
  },
  {
    labelKey: "packing",
    value: "packing",
    icon: Package,
    statusFilter: "PACKING",
  },
  {
    labelKey: "shipping",
    value: "shipping",
    icon: Truck,
    statusFilter: "SHIPPING",
  },
  {
    labelKey: "completed",
    value: "completed",
    icon: CheckCircle,
    statusFilter: "SUCCESS",
  },
  {
    labelKey: "cancelled",
    value: "cancelled",
    icon: X,
    statusFilter: "CANCELLED",
  },
];
