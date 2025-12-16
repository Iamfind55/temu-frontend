"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLazyQuery, useMutation } from "@apollo/client/react"
import { ChevronRight, ShoppingBasket, Package, Loader, ChevronDown, MoreVertical, Eye, Trash2 } from "lucide-react"

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// API & Utils
import { useToast } from "@/lib/toast"
import { orderTabs } from "./constants"
import { GetOrdersResponse, Order } from "./interfaces"
import { formatDate, getStatusBadgeStyle, getStatusLabel } from "./functions"
import { QUERY_GET_CUSTOMER_ORDERS, MUTATION_DELETE_ORDER } from "@/app/api/order"

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { successMessage, errorMessage } = useToast()

  const currentStatus = searchParams.get("status") || "all"
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [allOrders, setAllOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const limit = 10

  // Get orders query
  const [getOrders, { data, loading, error }] = useLazyQuery<GetOrdersResponse>(
    QUERY_GET_CUSTOMER_ORDERS,
    { fetchPolicy: "network-only" }
  )
  const [deleteOrder, { loading: deleteLoading }] = useMutation(MUTATION_DELETE_ORDER)
  const getStatusFilter = () => {
    const tab = orderTabs.find(t => t.value === currentStatus)
    return tab?.statusFilter || null
  }

  // Fetch orders when tab changes
  useEffect(() => {
    setPage(1)
    setAllOrders([])

    const statusFilter = getStatusFilter()
    getOrders({
      variables: {
        page: 1,
        limit: limit,
        sortedBy: "created_at_DESC",
        where: statusFilter ? { order_status: statusFilter } : null,
      },
    })
  }, [currentStatus])

  // Update orders when data changes
  useEffect(() => {
    if (data?.customerGetOrders?.success && data.customerGetOrders.data) {
      if (page === 1) {
        setAllOrders(data.customerGetOrders.data)
      }
    }
  }, [data, page])

  const handleTabClick = (value: string) => {
    const newUrl =
      value === "all"
        ? "/account/orders"
        : `/account/orders?status=${value}`

    router.push(newUrl)
  }

  const handleLoadMore = async () => {
    const nextPage = page + 1
    const statusFilter = getStatusFilter()

    try {
      const result = await getOrders({
        variables: {
          page: nextPage,
          limit: limit,
          sortedBy: "created_at_DESC",
          where: statusFilter ? { order_status: statusFilter } : null,
        },
      })

      if (result.data?.customerGetOrders?.success && result.data.customerGetOrders.data) {
        setAllOrders((prev) => [...prev, ...result.data!.customerGetOrders.data])
        setPage(nextPage)
      }
    } catch (err) {
      console.error("Error loading more orders:", err)
    }
  }

  const handleViewDetails = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  const handleDeleteOrder = async (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm("Are you sure you want to delete this order?")) return

    try {
      const result: any = await deleteOrder({
        variables: { id: orderId },
      })

      if (result?.data?.deleteOrder?.success) {
        successMessage({ message: "Order deleted successfully", duration: 3000 })
        // Remove order from local state
        setAllOrders((prev) => prev.filter((order) => order.id !== orderId))
      } else {
        const errorMsg = result?.data?.deleteOrder?.error?.message || "Failed to delete order"
        errorMessage({ message: errorMsg, duration: 3000 })
      }
    } catch (err) {
      console.error("Error deleting order:", err)
      errorMessage({ message: "An error occurred while deleting the order", duration: 3000 })
    }
  }

  // Filter orders by search query
  const filteredOrders = allOrders.filter(order => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      order.order_no.toLowerCase().includes(query) ||
      order.order_details.some(detail =>
        detail.product_name?.toLowerCase().includes(query)
      )
    )
  })

  const totalOrders = data?.customerGetOrders?.total || 0
  const hasMore = allOrders.length < totalOrders

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-white p-4 sm:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 sm:mb-8">
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              <div className="flex gap-2 sm:gap-6 min-w-max">
                {orderTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => handleTabClick(tab.value)}
                    className={`cursor-pointer flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm whitespace-nowrap transition-colors hover:border-b-2 hover:border-orange-500 ${currentStatus === tab.value
                      ? "border-b-2 border-orange-500"
                      : ""
                      }`}
                  >
                    {tab.value !== "all" && <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="hidden md:grid mb-4 grid-cols-8 gap-4 border-b pb-3 text-sm font-medium text-gray-900">
              <div className="text-center">#</div>
              <div>Order No</div>
              <div>Items</div>
              <div className="text-center">Qty</div>
              <div>Total</div>
              <div>Status</div>
              <div>Date</div>
              <div className="text-center">Actions</div>
            </div>

            {loading && allOrders.length === 0 ? (
              <div className="py-12 text-center flex items-center justify-center gap-2">
                <Loader className="h-5 w-5 animate-spin text-orange-500" />
                <p className="text-gray-600">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <p className="text-red-600">Error loading orders. Please try again.</p>
              </div>
            ) : filteredOrders.length > 0 ? (
              <>
                <div className="md:hidden space-y-3">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-gray-200 rounded-xl p-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          #{order.order_no.slice(-8)}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusBadgeStyle(order.order_status)}`}>
                            {getStatusLabel(order.order_status)}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => handleViewDetails(order, e)}
                                className="cursor-pointer"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => handleDeleteOrder(order.id, e)}
                                className="cursor-pointer text-red-600 focus:text-red-600"
                                disabled={deleteLoading}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Products</span>
                          <span className="font-medium">{order.total_products} items ({order.total_quantity} qty)</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Total</span>
                          <span className="font-bold text-green-600">${order.total_price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Date</span>
                          <span className="text-gray-600">{formatDate(order.created_at)}</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-3 text-orange-600 border-orange-200 hover:bg-orange-50"
                        onClick={(e) => handleViewDetails(order, e)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="hidden md:block space-y-2">
                  {filteredOrders.map((order, index: number) => (
                    <div
                      key={order.id}
                      className="grid grid-cols-8 gap-4 py-4 text-sm border-b last:border-0 hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      <div className="text-center text-gray-600 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="flex items-center">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          #{order.order_no.slice(-8)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">
                          {order.total_products} products
                        </span>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-800 text-xs font-medium">
                          {order.total_quantity}
                        </span>
                      </div>
                      <div className="flex items-center font-medium text-green-600">
                        ${order.total_price.toFixed(2)}
                      </div>
                      <div className="flex items-center">
                        <Badge className={`text-xs ${getStatusBadgeStyle(order.order_status)}`}>
                          {getStatusLabel(order.order_status)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs">
                        {formatDate(order.created_at)}
                      </div>
                      <div className="flex items-center justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => handleViewDetails(order, e)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => handleDeleteOrder(order.id, e)}
                              className="cursor-pointer text-red-600 focus:text-red-600"
                              disabled={deleteLoading}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {deleteLoading ? "Deleting..." : "Delete"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 sm:py-16">
                <div className="mb-2 text-gray-300">
                  <ShoppingBasket size={56} />
                </div>
                <h3 className="mb-8 text-sm sm:text-lg sm:font-semibold text-gray-900">
                  You don't have any {currentStatus === "all" ? "" : currentStatus} orders
                </h3>
                <div className="w-full max-w-3xl space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Can't find your order?
                  </h4>

                  <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-900">
                        Try signing in with another account
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>

                  <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300">
                    <span className="text-sm text-gray-900">
                      Self-service to find order
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>

                  <Link href="/">
                    <button className="flex w-full items-center justify-between rounded-lg border border-orange-500 bg-orange-50 p-4 text-left transition-colors hover:bg-orange-100">
                      <span className="text-sm text-orange-600 font-medium">
                        Start shopping now
                      </span>
                      <ChevronRight className="h-5 w-5 text-orange-500" />
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {hasMore && filteredOrders.length > 0 && (
              <div className="flex items-center justify-center pt-6">
                <Button
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="text-sm font-bold rounded-full bg-orange-500 hover:bg-orange-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <span>Load More Orders</span>
                      <ChevronDown className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {!hasMore && filteredOrders.length > 0 && (
              <div className="text-center text-xs text-gray-400 pt-6">
                You've reached the end of your orders
              </div>
            )}

            {/* Order count summary */}
            {filteredOrders.length > 0 && (
              <div className="text-center text-xs text-gray-400">
                Showing {filteredOrders.length} of {totalOrders} orders
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:!max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-500" />
              Order Details
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="rounded-lg border border-gray-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Order Number:</span>
                  <span className="font-mono text-sm font-medium">#{selectedOrder.order_no}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge className={`text-xs ${getStatusBadgeStyle(selectedOrder.order_status)}`}>
                    {getStatusLabel(selectedOrder.order_status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Date:</span>
                  <span className="text-sm">{formatDate(selectedOrder.created_at)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Delivery Type:</span>
                  <span className="text-sm px-2 py-1 bg-blue-50 text-blue-700 rounded">
                    {selectedOrder.delivery_type === "DOOR_TO_DOOR" ? "Door-to-Door" : selectedOrder.delivery_type}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Order Items ({selectedOrder.order_details.length})</h3>
                <div className="space-y-3">
                  {selectedOrder.order_details.map((detail) => (
                    <div
                      key={detail.id}
                      className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {detail.product_cover_image ? (
                          <img
                            src={detail.product_cover_image}
                            alt={detail.product_name || "Product"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {detail.product_name || "Product"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {detail.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          ${detail.price.toFixed(2)}
                        </p>
                        {detail.discount > 0 && (
                          <p className="text-xs text-gray-500">
                            -${detail.discount.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Items:</span>
                  <span>{selectedOrder.total_quantity}</span>
                </div>
                {selectedOrder.total_discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-red-600">-${selectedOrder.total_discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-green-600 text-lg">${selectedOrder.total_price.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}