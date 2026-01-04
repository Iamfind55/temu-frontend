"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import {
   Bell,
   Loader,
   ChevronLeft,
   ChevronRight,
   Package,
   CreditCard,
   ShoppingCart,
   Truck,
   Crown,
   AlertTriangle,
   UserCheck,
   Wallet,
   CheckCircle2,
   Circle,
   Calendar,
} from "lucide-react"

// Components
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationEllipsis,
} from "@/components/ui/pagination"

// API & Types
import { QUERY_GET_SHOP_NOTIFICATIONS, MUTATION_SHOP_MARK_NOTIFICATION_AS_READ } from "@/app/api/shop/notification"
import { useShopStore } from "@/store/shop-store"
import {
   INotification,
   IGetNotificationsResponse,
   NotificationType,
   notificationTypeConfig,
} from "@/types/notification"
import { cn } from "@/lib/utils"

// Notification type options for filter
const notificationTypeOptions: { value: string; label: string }[] = [
   { value: "all", label: "All Types" },
   { value: "DEALER_APPLICATION", label: "Dealer Application" },
   { value: "PRODUCT_APPLICATION", label: "Product Application" },
   { value: "WITHDRAWAL", label: "Withdrawal" },
   { value: "RECHARGE", label: "Recharge" },
   { value: "ORDER", label: "Order" },
   { value: "INVENTORY_SHIPMENT", label: "Inventory Shipment" },
   { value: "FUND_PUNISH", label: "Fund Punish" },
   { value: "SHOP_REQUEST_VIP", label: "VIP Request" },
]

// Read status options for filter
const readStatusOptions = [
   { value: "all", label: "All Status" },
   { value: "unread", label: "Unread" },
   { value: "read", label: "Read" },
]

// Get icon for notification type
function getNotificationIcon(type: NotificationType) {
   switch (type) {
      case "DEALER_APPLICATION":
         return UserCheck
      case "PRODUCT_APPLICATION":
         return Package
      case "WITHDRAWAL":
         return Wallet
      case "RECHARGE":
         return CreditCard
      case "ORDER":
         return ShoppingCart
      case "INVENTORY_SHIPMENT":
         return Truck
      case "FUND_PUNISH":
         return AlertTriangle
      case "SHOP_REQUEST_VIP":
         return Crown
      default:
         return Bell
   }
}

// Format date
function formatDate(dateString: string) {
   const date = new Date(dateString)
   const now = new Date()
   const diffMs = now.getTime() - date.getTime()
   const diffMins = Math.floor(diffMs / 60000)
   const diffHours = Math.floor(diffMs / 3600000)
   const diffDays = Math.floor(diffMs / 86400000)

   if (diffMins < 1) return "Just now"
   if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`
   if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
   if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`

   return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   })
}

// Notification Card Component
function NotificationCard({
   notification,
   onClick
}: {
   notification: INotification
   onClick: (notification: INotification) => void
}) {
   const typeConfig = notificationTypeConfig[notification.notification_type]
   const Icon = getNotificationIcon(notification.notification_type)

   return (
      <div
         onClick={() => onClick(notification)}
         className={cn(
            "bg-white rounded-lg border p-4 transition-all hover:shadow-md cursor-pointer",
            !notification.is_read && "border-l-4 border-l-orange-500 bg-orange-50/30"
         )}
      >
         <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={cn("p-2 rounded-full flex-shrink-0", typeConfig?.bgColor || "bg-gray-100")}>
               <Icon className={cn("h-5 w-5", typeConfig?.color || "text-gray-600")} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
               <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                        <h3 className={cn("font-semibold text-gray-900", !notification.is_read && "text-gray-900")}>
                           {notification.title}
                        </h3>
                        {!notification.is_read && (
                           <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                        )}
                     </div>
                     <p className="text-sm text-gray-600 line-clamp-2">{notification.description}</p>
                  </div>

                  {/* Type Badge */}
                  <Badge className={cn("flex-shrink-0 text-xs", typeConfig?.bgColor, typeConfig?.color)}>
                     {typeConfig?.label || notification.notification_type}
                  </Badge>
               </div>

               {/* Footer */}
               <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">{formatDate(notification.created_at)}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                     {notification.is_read ? (
                        <>
                           <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                           <span>Read</span>
                        </>
                     ) : (
                        <>
                           <Circle className="h-3.5 w-3.5 text-orange-500" />
                           <span>Unread</span>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

// Empty State Component
function EmptyState() {
   return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border">
         <Bell className="h-16 w-16 text-gray-300 mb-4" />
         <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
         <p className="text-sm text-gray-600">You don't have any notifications yet</p>
      </div>
   )
}

// Loading State Component
function LoadingState() {
   return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
         <Loader className="h-8 w-8 text-orange-500 animate-spin mb-4" />
         <p className="text-sm text-gray-600">Loading notifications...</p>
      </div>
   )
}

export default function NotificationsPage() {
   const { shop } = useShopStore()
   const [currentPage, setCurrentPage] = useState(1)
   const [selectedType, setSelectedType] = useState("all")
   const [selectedReadStatus, setSelectedReadStatus] = useState("all")
   const [selectedNotification, setSelectedNotification] = useState<INotification | null>(null)
   const [isDialogOpen, setIsDialogOpen] = useState(false)
   const itemsPerPage = 10

   // Mark as read mutation
   const [markAsRead] = useMutation(MUTATION_SHOP_MARK_NOTIFICATION_AS_READ)

   // Build where clause for query
   const buildWhereClause = () => {
      const where: {
         notification_type?: NotificationType | null
         is_read?: boolean | null
         shop_id?: string
      } = {}

      if (shop?.id) {
         where.shop_id = shop.id
      }

      if (selectedType !== "all") {
         where.notification_type = selectedType as NotificationType
      } else {
         where.notification_type = null
      }

      if (selectedReadStatus === "read") {
         where.is_read = true
      } else if (selectedReadStatus === "unread") {
         where.is_read = false
      } else {
         where.is_read = null
      }

      return where
   }

   // Fetch notifications
   const { data, loading, refetch } = useQuery<IGetNotificationsResponse>(QUERY_GET_SHOP_NOTIFICATIONS, {
      variables: {
         page: currentPage,
         limit: itemsPerPage,
         sortedBy: "created_at_DESC",
         where: buildWhereClause(),
      },
      skip: !shop?.id,
      fetchPolicy: "cache-and-network",
   })

   const notifications = data?.shopGetNotifications?.data || []
   const totalNotifications = data?.shopGetNotifications?.total || 0
   const totalPages = Math.ceil(totalNotifications / itemsPerPage)

   // Handle filter changes
   const handleTypeChange = (value: string) => {
      setSelectedType(value)
      setCurrentPage(1)
   }

   const handleReadStatusChange = (value: string) => {
      setSelectedReadStatus(value)
      setCurrentPage(1)
   }

   // Handle notification click
   const handleNotificationClick = async (notification: INotification) => {
      setSelectedNotification(notification)
      setIsDialogOpen(true)

      // Only call mark as read for unread notifications
      if (!notification.is_read) {
         try {
            await markAsRead({
               variables: {
                  shopReadNotificationId: notification.id,
               },
               refetchQueries: ["ShopGetNotifications"],
            })
            // Refetch to update the list
            refetch()
         } catch (error) {
            console.error("Failed to mark notification as read:", error)
         }
      }
   }

   // Close dialog and refetch fresh data
   const handleCloseDialog = () => {
      setIsDialogOpen(false)
      setSelectedNotification(null)
      refetch()
   }

   // Generate pagination items
   const getPaginationItems = () => {
      const items: (number | "ellipsis")[] = []

      if (totalPages <= 7) {
         for (let i = 1; i <= totalPages; i++) {
            items.push(i)
         }
      } else {
         items.push(1)

         if (currentPage > 3) {
            items.push("ellipsis")
         }

         const start = Math.max(2, currentPage - 1)
         const end = Math.min(totalPages - 1, currentPage + 1)

         for (let i = start; i <= end; i++) {
            items.push(i)
         }

         if (currentPage < totalPages - 2) {
            items.push("ellipsis")
         }

         if (totalPages > 1) {
            items.push(totalPages)
         }
      }

      return items
   }

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-2 sm:p-6">
            <div className="mx-auto max-w-4xl">
               {/* Page Header */}
               <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="mb-6 w-full sm:w-1/2">
                     <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
                     <p className="text-sm text-gray-600 mt-1">
                        Stay updated with your shop activities and important alerts
                     </p>
                  </div>

                  <div className="w-full sm:w-1/2 bg-white rounded-lg p-0 sm:p-4 mb-4">
                     <div className="flex gap-3">
                        <div className="flex-1">
                           <label className="text-xs text-gray-500 mb-1 block">Notification Type</label>
                           <Select value={selectedType} onValueChange={handleTypeChange}>
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                 {notificationTypeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                       {option.label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>

                        <div className="flex-1">
                           <label className="text-xs text-gray-500 mb-1 block">Read Status</label>
                           <Select value={selectedReadStatus} onValueChange={handleReadStatusChange}>
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                 {readStatusOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                       {option.label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Results Info */}
               <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">
                     {totalNotifications > 0 ? (
                        <>
                           Showing{" "}
                           <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
                           {" - "}
                           <span className="font-medium">
                              {Math.min(currentPage * itemsPerPage, totalNotifications)}
                           </span>
                           {" of "}
                           <span className="font-medium">{totalNotifications}</span> notifications
                        </>
                     ) : (
                        "No notifications found"
                     )}
                  </p>
               </div>

               {/* Notifications List */}
               {loading ? (
                  <LoadingState />
               ) : notifications.length === 0 ? (
                  <EmptyState />
               ) : (
                  <div className="space-y-3">
                     {notifications.map((notification) => (
                        <NotificationCard
                           key={notification.id}
                           notification={notification}
                           onClick={handleNotificationClick}
                        />
                     ))}
                  </div>
               )}

               {/* Pagination */}
               {totalPages > 1 && (
                  <Pagination className="mt-6">
                     <PaginationContent>
                        <PaginationItem>
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                              className="gap-1"
                           >
                              <ChevronLeft className="h-4 w-4" />
                              Previous
                           </Button>
                        </PaginationItem>

                        {getPaginationItems().map((item, index) =>
                           item === "ellipsis" ? (
                              <PaginationItem key={`ellipsis-${index}`}>
                                 <PaginationEllipsis />
                              </PaginationItem>
                           ) : (
                              <PaginationItem key={item}>
                                 <PaginationLink
                                    onClick={() => setCurrentPage(item)}
                                    isActive={currentPage === item}
                                    className="cursor-pointer"
                                 >
                                    {item}
                                 </PaginationLink>
                              </PaginationItem>
                           )
                        )}

                        <PaginationItem>
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              className="gap-1"
                           >
                              Next
                              <ChevronRight className="h-4 w-4" />
                           </Button>
                        </PaginationItem>
                     </PaginationContent>
                  </Pagination>
               )}
            </div>
         </div>

         {/* Notification Detail Dialog */}
         <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!open) handleCloseDialog()
            else setIsDialogOpen(open)
         }}>
            <DialogContent className="max-w-xl">
               {selectedNotification && (() => {
                  const typeConfig = notificationTypeConfig[selectedNotification.notification_type]
                  const Icon = getNotificationIcon(selectedNotification.notification_type)
                  return (
                     <>
                        <DialogHeader className="pb-4 border-b">
                           <div className="flex items-start gap-4">
                              <div className={cn("p-3 rounded-full flex-shrink-0", typeConfig?.bgColor || "bg-gray-100")}>
                                 <Icon className={cn("h-6 w-6", typeConfig?.color || "text-gray-600")} />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <DialogTitle className="text-lg font-semibold text-gray-900 mb-2">
                                    {selectedNotification.title}
                                 </DialogTitle>
                                 <div className="flex items-center gap-2 flex-wrap">
                                    <Badge className={cn("text-xs", typeConfig?.bgColor, typeConfig?.color)}>
                                       {typeConfig?.label || selectedNotification.notification_type}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                       {selectedNotification.status}
                                    </Badge>
                                 </div>
                              </div>
                           </div>
                        </DialogHeader>

                        <div className="py-4 space-y-4">
                           {/* Description */}
                           <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                              <div className="bg-gray-50 rounded-lg p-4 border">
                                 <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {selectedNotification.description}
                                 </p>
                              </div>
                           </div>

                           {/* Reference ID if available */}
                           {selectedNotification.reference_id && (
                              <div>
                                 <h4 className="text-sm font-medium text-gray-700 mb-2">Reference ID</h4>
                                 <div className="bg-blue-50 rounded-lg px-4 py-2 border border-blue-100">
                                    <code className="text-sm text-blue-700 font-mono">
                                       {selectedNotification.reference_id}
                                    </code>
                                 </div>
                              </div>
                           )}

                           {/* Additional Data if available */}
                           {selectedNotification.data && (
                              <div>
                                 <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Information</h4>
                                 <div className="bg-gray-50 rounded-lg p-4 border">
                                    <pre className="text-xs text-gray-600 whitespace-pre-wrap overflow-x-auto">
                                       {typeof selectedNotification.data === "object"
                                          ? JSON.stringify(selectedNotification.data, null, 2)
                                          : selectedNotification.data}
                                    </pre>
                                 </div>
                              </div>
                           )}
                        </div>

                        {/* Footer with Meta Info */}
                        <div className="pt-4 border-t">
                           <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-4 text-gray-500">
                                 <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(selectedNotification.created_at).toLocaleString("en-US", {
                                       year: "numeric",
                                       month: "short",
                                       day: "numeric",
                                       hour: "2-digit",
                                       minute: "2-digit",
                                    })}</span>
                                 </div>
                              </div>
                              <div className="flex items-center gap-1 text-green-600">
                                 <CheckCircle2 className="h-4 w-4" />
                                 <span className="font-medium">Read</span>
                              </div>
                           </div>
                        </div>
                     </>
                  )
               })()}
            </DialogContent>
         </Dialog>
      </div>
   )
}
