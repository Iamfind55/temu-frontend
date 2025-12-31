// Notification Types

export type NotificationType =
   | "DEALER_APPLICATION"
   | "PRODUCT_APPLICATION"
   | "WITHDRAWAL"
   | "RECHARGE"
   | "ORDER"
   | "INVENTORY_SHIPMENT"
   | "FUND_PUNISH"
   | "SHOP_REQUEST_VIP";

export interface INotification {
   id: string;
   title: string;
   description: string;
   is_read: boolean;
   notification_type: NotificationType;
   status: string;
   created_at: string;
   reference_id: string | null;
   data: Record<string, unknown> | string | null;
}

export interface IGetNotificationsResponse {
   shopGetNotifications: {
      success: boolean;
      total: number;
      data: INotification[];
      error?: {
         message: string;
         code: string;
         details: string;
      };
   };
}

// Notification type config for display
export const notificationTypeConfig: Record<NotificationType, { label: string; color: string; bgColor: string }> = {
   DEALER_APPLICATION: { label: "Dealer Application", color: "text-blue-700", bgColor: "bg-blue-100" },
   PRODUCT_APPLICATION: { label: "Product Application", color: "text-green-700", bgColor: "bg-green-100" },
   WITHDRAWAL: { label: "Withdrawal", color: "text-red-700", bgColor: "bg-red-100" },
   RECHARGE: { label: "Recharge", color: "text-emerald-700", bgColor: "bg-emerald-100" },
   ORDER: { label: "Order", color: "text-orange-700", bgColor: "bg-orange-100" },
   INVENTORY_SHIPMENT: { label: "Inventory Shipment", color: "text-purple-700", bgColor: "bg-purple-100" },
   FUND_PUNISH: { label: "Fund Punish", color: "text-rose-700", bgColor: "bg-rose-100" },
   SHOP_REQUEST_VIP: { label: "VIP Request", color: "text-amber-700", bgColor: "bg-amber-100" },
};
