"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLazyQuery, useMutation, useApolloClient } from "@apollo/client/react"
import { ShoppingBasket, Package, Truck, Loader, ChevronDown, MoreVertical, Eye, X } from "lucide-react"

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
import { QUERY_SHOP_ORDERS, QUERY_SHOP_ORDER_DETAILS, MUTATION_SHOP_CONFIRM_ORDER, MUTATION_SHOP_CANCEL_ORDER } from "@/app/api/shop/order"

// Types
import { ShopOrder, ShopOrderDetail, ShopGetOrdersResponse, ShopGetOrderDetailsResponse, ShopConfirmOrderResponse, ShopCancelOrderResponse } from "@/types/shopOrder"
import { formatDate, formatDateTime, getStatusBadgeStyle, getStatusLabel } from "./functions"

export default function ShopOrdersPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const client = useApolloClient()
  const { errorMessage, successMessage } = useToast()

  const currentStatus = searchParams.get("status") || "no_pickup"
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [allOrders, setAllOrders] = useState<ShopOrder[]>([])
  const [selectedOrder, setSelectedOrder] = useState<ShopOrder | null>(null)
  const [orderDetails, setOrderDetails] = useState<ShopOrderDetail[]>([])
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDetailsLoading, setIsDetailsLoading] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isConfirmLoading, setIsConfirmLoading] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isCancelLoading, setIsCancelLoading] = useState(false)
  const [tabCounts, setTabCounts] = useState<Record<string, number>>({})
  const limit = 20

  // Get orders query
  const [getOrders, { data, loading, error }] = useLazyQuery<ShopGetOrdersResponse>(
    QUERY_SHOP_ORDERS,
    { fetchPolicy: "network-only" }
  )

  // Get order details query
  const [getOrderDetails] = useLazyQuery<ShopGetOrderDetailsResponse>(
    QUERY_SHOP_ORDER_DETAILS,
    { fetchPolicy: "network-only" }
  )

  // Confirm order mutation
  const [confirmOrder] = useMutation<ShopConfirmOrderResponse>(MUTATION_SHOP_CONFIRM_ORDER)

  // Cancel order mutation
  const [cancelOrder] = useMutation<ShopCancelOrderResponse>(MUTATION_SHOP_CANCEL_ORDER)

  // Get status filter based on current tab
  const getStatusFilter = () => {
    const tab = orderTabs.find(t => t.value === currentStatus)
    return tab?.statusFilter || null
  }

  // Function to fetch tab counts
  const fetchTabCounts = async () => {
    const counts: Record<string, number> = {}

    const promises = orderTabs.map(async (tab) => {
      try {
        const result = await client.query<ShopGetOrdersResponse>({
          query: QUERY_SHOP_ORDERS,
          variables: {
            page: 1,
            limit: 1,
            where: tab.statusFilter ? { order_status: tab.statusFilter } : null,
          },
          fetchPolicy: "network-only",
        })

        if (result.data?.shopGetOrders?.success) {
          counts[tab.value] = result.data.shopGetOrders.total
        }
      } catch (err) {
        console.error(`Error fetching count for ${tab.value}:`, err)
      }
    })

    await Promise.all(promises)
    setTabCounts(counts)
  }

  // Fetch tab counts on mount
  useEffect(() => {
    fetchTabCounts()
  }, [])

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
    if (data?.shopGetOrders?.success && data.shopGetOrders.data) {
      if (page === 1) {
        setAllOrders(data.shopGetOrders.data)
      }
    }
  }, [data, page])

  const handleTabClick = (value: string) => {
    const newUrl =
      value === "no_pickup"
        ? "/shop-dashboard/orders"
        : `/shop-dashboard/orders?status=${value}`

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

      if (result.data?.shopGetOrders?.success && result.data.shopGetOrders.data) {
        setAllOrders((prev) => [...prev, ...result.data!.shopGetOrders.data])
        setPage(nextPage)
      }
    } catch (err) {
      console.error("Error loading more orders:", err)
    }
  }

  const handleViewDetails = async (order: ShopOrder, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedOrder(order)
    setOrderDetails([])
    setIsDetailModalOpen(true)
    setIsDetailsLoading(true)

    try {
      const result = await getOrderDetails({
        variables: {
          where: { order_no: order.order_no },
          page: 1,
          limit: 100,
          sortedBy: "created_at_DESC",
        },
      })

      if (result.data?.shopGetOrderDetails?.success) {
        setOrderDetails(result.data.shopGetOrderDetails.data)
      } else {
        errorMessage({
          message: result.data?.shopGetOrderDetails?.error?.details || "Failed to load order details",
          duration: 3000,
        })
      }
    } catch (err) {
      console.error("Error fetching order details:", err)
      errorMessage({
        message: "Failed to load order details",
        duration: 3000,
      })
    } finally {
      setIsDetailsLoading(false)
    }
  }

  const handleOpenConfirmModal = (order: ShopOrder, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedOrder(order)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmShipping = async () => {
    if (!selectedOrder) return

    setIsConfirmLoading(true)
    try {
      const result = await confirmOrder({
        variables: {
          shopConfirmOrderId: selectedOrder.id,
        },
      })

      if (result.data?.shopConfirmOrder?.success) {
        successMessage({
          message: result.data.shopConfirmOrder.message || "Order confirmed successfully",
          duration: 3000,
        })
        setIsConfirmModalOpen(false)

        // Refresh orders list and tab counts
        const statusFilter = getStatusFilter()
        getOrders({
          variables: {
            page: 1,
            limit: limit,
            sortedBy: "created_at_DESC",
            where: statusFilter ? { order_status: statusFilter } : null,
          },
        })
        fetchTabCounts()
      } else {
        errorMessage({
          message: result.data?.shopConfirmOrder?.error?.details || "Failed to confirm order",
          duration: 3000,
        })
      }
    } catch (err) {
      console.error("Error confirming order:", err)
      errorMessage({
        message: "Failed to confirm order",
        duration: 3000,
      })
    } finally {
      setIsConfirmLoading(false)
    }
  }

  const handleOpenCancelModal = (order: ShopOrder, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedOrder(order)
    setIsCancelModalOpen(true)
  }

  const handleCancelOrder = async () => {
    if (!selectedOrder) return

    setIsCancelLoading(true)
    try {
      const result = await cancelOrder({
        variables: {
          shopCancelOrderId: selectedOrder.id,
        },
      })

      if (result.data?.shopCancelOrder?.success) {
        successMessage({
          message: result.data.shopCancelOrder.message || "Order cancelled successfully",
          duration: 3000,
        })
        setIsCancelModalOpen(false)

        // Refresh orders list and tab counts
        const statusFilter = getStatusFilter()
        getOrders({
          variables: {
            page: 1,
            limit: limit,
            sortedBy: "created_at_DESC",
            where: statusFilter ? { order_status: statusFilter } : null,
          },
        })
        fetchTabCounts()
      } else {
        errorMessage({
          message: result.data?.shopCancelOrder?.error?.details || "Failed to cancel order",
          duration: 3000,
        })
      }
    } catch (err) {
      console.error("Error cancelling order:", err)
      errorMessage({
        message: "Failed to cancel order",
        duration: 3000,
      })
    } finally {
      setIsCancelLoading(false)
    }
  }

  // Filter orders by search query
  const filteredOrders = allOrders.filter(order => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return order.order_no.toLowerCase().includes(query)
  })

  const totalOrders = data?.shopGetOrders?.total || 0
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
                    {tabCounts[tab.value] > 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-semibold rounded-full bg-orange-400 text-white">
                        {tabCounts[tab.value]}
                      </span>
                    ) : (
                      tab.value !== "all" && <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    )}
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
                                <Eye className="h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {order.order_status === "NO_PICKUP" && (
                                <DropdownMenuItem
                                  onClick={(e) => handleOpenConfirmModal(order, e)}
                                  className="cursor-pointer text-green-500"
                                >
                                  <Truck className="h-4 w-4 text-green-500" />
                                  Confirm & shipping
                                </DropdownMenuItem>
                              )}
                              {order.order_status === "NO_PICKUP" && (
                                <DropdownMenuItem
                                  onClick={(e) => handleOpenCancelModal(order, e)}
                                  className="cursor-pointer text-red-500"
                                >
                                  <X className="h-4 w-4 text-red-500" />
                                  Cancel order
                                </DropdownMenuItem>
                              )}
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
                        <Eye className="h-4 w-4" />
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
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {order.order_status === "NO_PICKUP" && (
                              <DropdownMenuItem
                                onClick={(e) => handleOpenConfirmModal(order, e)}
                                className="cursor-pointer text-green-500"
                              >
                                <Truck className="h-4 w-4 text-green-500" />
                                Confirm & shipping
                              </DropdownMenuItem>
                            )}
                            {order.order_status === "NO_PICKUP" && (
                              <DropdownMenuItem
                                onClick={(e) => handleOpenCancelModal(order, e)}
                                className="cursor-pointer text-red-500"
                              >
                                <X className="h-4 w-4 text-red-500" />
                                Cancel order
                              </DropdownMenuItem>
                            )}
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
                      <Loader className="h-4 w-4 animate-spin" />
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

            {filteredOrders.length > 0 && (
              <div className="text-center text-xs text-gray-400">
                Showing {filteredOrders.length} of {totalOrders} orders
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:!max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-500" />
              Order Details
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between text-sm text-gray-500 border-b pb-3">
                <span>Order #{selectedOrder.order_no}</span>
                <span>{formatDateTime(selectedOrder.created_at)}</span>
              </div>

              {isDetailsLoading ? (
                <div className="py-8 text-center flex flex-col items-center justify-center gap-2">
                  <Loader className="h-6 w-6 animate-spin text-orange-500" />
                  <p className="text-sm text-gray-600">Loading order details...</p>
                </div>
              ) : orderDetails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {orderDetails.map((item) => {
                    const profitRatio = item.profit / 100
                    const orderPayment = item.price * item.quantity
                    const commodityPayment = orderPayment * (1 - profitRatio)
                    const expectedRevenue = orderPayment * profitRatio

                    return (
                      <div key={item.id} className="rounded-lg border border-gray-200 p-4 space-y-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {item.product_cover_image ? (
                              <img
                                src={item.product_cover_image}
                                alt={item.product_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 line-clamp-3">
                              {item.product_name}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Payment Status:</span>
                            <Badge className={`text-xs ${item.payment_status === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                              }`}>
                              <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${item.payment_status === "COMPLETED" ? "bg-green-500" : "bg-yellow-500"
                                }`}></span>
                              {item.payment_status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Order Status:</span>
                            <Badge className={`text-xs ${item.order_status === "SUCCESS"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                              }`}>
                              <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${item.order_status === "SUCCESS" ? "bg-green-500" : "bg-red-500"
                                }`}></span>
                              {item.order_status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Sign in Status:</span>
                            <Badge className={`text-xs ${item.sign_in_status === "DELIVERED"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                              }`}>
                              <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${item.sign_in_status === "DELIVERED" ? "bg-green-500" : "bg-red-500"
                                }`}></span>
                              {item.sign_in_status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Order Quantity:</span>
                            <span className="font-medium">{item.quantity}</span>
                          </div>

                          {item.discount > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Discount:</span>
                              <span className="font-medium text-red-600">{item.discount}%</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Commodity Payment:</span>
                            <span className="font-medium text-green-600">${commodityPayment.toFixed(2)}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Order Payment:</span>
                            <span className="font-medium text-green-600">${orderPayment.toFixed(2)}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Profit ratio:</span>
                            <span className="font-medium text-green-600">{item.profit}%</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Expected revenue:</span>
                            <span className="font-bold text-green-600">+ {expectedRevenue.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-gray-500">No items found for this order</p>
                </div>
              )}

              <div className="rounded-lg bg-gray-50 p-4 space-y-2 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Products:</span>
                  <span>{selectedOrder.total_products}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Quantity:</span>
                  <span>{selectedOrder.total_quantity}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold pt-2 border-t">
                  <span>Total Payment:</span>
                  <span className="text-green-600 text-lg">${selectedOrder.total_price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4">
                <Button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="w-auto bg-gray-500 hover:bg-gray-600"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:!max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-500" />
              Confirm & Shipping
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4 py-2">
              <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Order No:</span>
                  <span className="font-mono font-medium">#{selectedOrder.order_no}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-medium">${selectedOrder.total_price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Quantity:</span>
                  <span className="font-medium">{selectedOrder.total_quantity}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Discount:</span>
                  <span className="font-medium text-red-600">{selectedOrder.total_discount}%</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold pt-2 border-t">
                  <span>Total Paid:</span>
                  <span className="text-green-600 text-lg">${selectedOrder.total_price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsConfirmModalOpen(false)}
                  disabled={isConfirmLoading}
                >
                  Close
                </Button>
                <Button
                  onClick={handleConfirmShipping}
                  disabled={isConfirmLoading}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isConfirmLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4" />
                      Confirm & Shipping
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="sm:!max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <X className="h-5 w-5 text-red-500" />
              Cancel Order
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4 py-2">
              <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                <p className="text-sm text-gray-700">
                  Are you sure you want to cancel order <span className="font-mono font-bold">#{selectedOrder.order_no}</span>?
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCancelModalOpen(false)}
                  disabled={isCancelLoading}
                >
                  Close
                </Button>
                <Button
                  onClick={handleCancelOrder}
                  disabled={isCancelLoading}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {isCancelLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4" />
                      Cancel
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}