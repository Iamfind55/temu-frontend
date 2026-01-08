"use client"

import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/lib/toast"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { useLazyQuery, useQuery, useMutation } from "@apollo/client/react"
import { Trash2, Info, ChevronRight, ShieldCheck, LockKeyhole, Check, Truck, BaggageClaim, ShoppingCart, MapPin, Plus, Wallet, X, CheckCircle2 } from "lucide-react"

// components:
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/product-data"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductCard } from "@/components/product-card"
import { SkeletonImage } from "@/components/ui/skeleton-image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// APIs and Interfaces
import { MUTATION_CREATE_ORDERS } from "@/app/api/order"
import { QUERY_GET_CUSTOMER_CREDIT_BALANCE } from "@/app/api/credit"
import { GetCustomerAddressesResponse, GetCountryResponse, GetStateResponse, GetCityResponse } from "@/app/interface/address"
import { QUERY_CUSTOMER_ADDRESS, QUERY_COUNTRIES, QUERY_STATES, QUERY_CITIES, MUTATION_CREATE_CUSTOMER_ADDRESS } from "@/app/api/address"

export default function CartPage() {
   const { t } = useTranslation('cart')
   const { t: tCommon } = useTranslation('common')
   const router = useRouter()
   const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
   const { successMessage, errorMessage } = useToast()
   const { customer } = useSelector((state: any) => state.customerAuth)

   const [selectedItems, setSelectedItems] = useState<string[]>(items.map((item) => item.id))

   // Checkout modal states
   const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
   const [checkoutStep, setCheckoutStep] = useState(1)
   const [selectedAddressId, setSelectedAddressId] = useState<string>("")
   const [isCreatingAddress, setIsCreatingAddress] = useState(false)
   const [isProcessingPayment, setIsProcessingPayment] = useState(false)

   // Address form states
   const [email, setEmail] = useState("")
   const [address, setAddress] = useState("")
   const [telephone, setTelephone] = useState("")
   const [postalCode, setPostalCode] = useState("")
   const [countryId, setCountryId] = useState("")
   const [countryName, setCountryName] = useState("")
   const [stateId, setStateId] = useState("")
   const [stateName, setStateName] = useState("")
   const [cityName, setCityName] = useState("")

   // Queries
   const [getAddresses, { data: addressesData, refetch: refetchAddresses }] = useLazyQuery<GetCustomerAddressesResponse>(
      QUERY_CUSTOMER_ADDRESS,
      { fetchPolicy: "no-cache" }
   )

   const { data: walletData } = useQuery(QUERY_GET_CUSTOMER_CREDIT_BALANCE)
   const [getCountries, { data: countryData }] = useLazyQuery<GetCountryResponse>(QUERY_COUNTRIES)
   const [getStates, { data: stateData }] = useLazyQuery<GetStateResponse>(QUERY_STATES)
   const [getCities, { data: cityData }] = useLazyQuery<GetCityResponse>(QUERY_CITIES)
   const [createAddress] = useMutation(MUTATION_CREATE_CUSTOMER_ADDRESS)
   const [createOrder] = useMutation(MUTATION_CREATE_ORDERS)

   const toggleSelectAll = () => {
      if (selectedItems.length === items.length) {
         setSelectedItems([])
      } else {
         setSelectedItems(items.map((item) => item.id))
      }
   }

   const toggleSelectItem = (id: string) => {
      setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
   }

   const selectedSubtotal = items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0)

   const selectedOriginalTotal = items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0)

   const discount = selectedOriginalTotal - selectedSubtotal

   const recommendedProducts = products.filter((p) => !items.some((item) => item.id === p.id)).slice(0, 8)

   // Helpers
   const walletBalance = (walletData as any)?.getCustomerWallet?.data?.total_balance || 0
   const addresses = addressesData?.getCustomerAddresses?.data || []
   const countries = countryData?.getCountries?.data?.map((c) => ({ label: c.country, value: String(c.id) })) || []
   const states = stateData?.getStates?.data?.map((s) => ({ label: s.state, value: String(s.id) })) || []
   const cities = cityData?.getCities?.data?.map((c) => ({ label: c.city, value: c.city })) || []

   // Handlers
   const handleCheckoutClick = () => {
      if (selectedItems.length === 0) {
         errorMessage({ message: t('selectItemsToCheckout'), duration: 3000 })
         return
      }

      // Check if user is authenticated
      if (!customer?.id) {
         router.push("/login?redirect=/cart")
         return
      }

      setIsCheckoutModalOpen(true)
      setCheckoutStep(1)
      getAddresses({ variables: { where: { status: "ACTIVE", customer_id: customer?.id } } })
      getCountries()
   }

   const handleCreateAddress = async () => {
      if (!email || !address || !telephone || !postalCode || !countryName || !cityName) {
         errorMessage({ message: t('fillRequiredFields'), duration: 3000 })
         return
      }

      setIsCreatingAddress(true)
      try {
         const res: any = await createAddress({
            variables: {
               data: {
                  country: { country: countryName },
                  state: { state: stateName },
                  city: { city: cityName },
                  address: address,
                  postal_code: postalCode,
                  email: email,
                  phone_number: telephone,
               },
            },
         })

         if (res?.data?.createCustomerAddress?.success) {
            successMessage({ message: t('addressCreated'), duration: 3000 })
            await refetchAddresses()
            setEmail("")
            setAddress("")
            setTelephone("")
            setPostalCode("")
            setCountryId("")
            setCountryName("")
            setStateId("")
            setStateName("")
            setCityName("")
         }
      } catch (error) {
         errorMessage({ message: t('errorOccurred'), duration: 3000 })
      } finally {
         setIsCreatingAddress(false)
      }
   }

   const handleProceedToPayment = () => {
      if (!selectedAddressId && addresses.length > 0) {
         errorMessage({ message: t('selectDeliveryAddress'), duration: 3000 })
         return
      }
      if (addresses.length === 0) {
         errorMessage({ message: t('createAddressFirst'), duration: 3000 })
         return
      }
      setCheckoutStep(2)
   }

   const handlePayment = async () => {
      if (walletBalance < selectedSubtotal) {
         errorMessage({ message: t('insufficientBalance'), duration: 3000 })
         return
      }

      setIsProcessingPayment(true)
      try {
         // Get selected cart items
         const selectedCartItems = items.filter((item) => selectedItems.includes(item.id))

         // Calculate order totals
         const total_quantity = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0)
         const total_price = selectedSubtotal
         const total_discount = discount

         // Build order_details array
         const order_details = selectedCartItems.map((item) => ({
            product_id: item.id,
            price: item.price,
            quantity: item.quantity,
            discount: item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0,
         }))

         // Create order
         const res: any = await createOrder({
            variables: {
               data: {
                  total_quantity,
                  total_price,
                  total_discount,
                  address_id: selectedAddressId,
                  delivery_type: "DOOR_TO_DOOR",
                  order_details,
               },
            },
         })

         if (res?.data?.createOrder?.success) {
            // Clear cart only on successful order creation
            clearCart()
            setCheckoutStep(3)
            successMessage({ message: t('paymentSuccessful'), duration: 3000 })
         } else {
            const errorMsg = res?.data?.createOrder?.error?.message || t('failedToCreateOrder')
            errorMessage({ message: errorMsg, duration: 3000 })
         }
      } catch (error) {
         console.error("Order creation error:", error)
         errorMessage({ message: t('orderProcessingError'), duration: 3000 })
      } finally {
         setIsProcessingPayment(false)
      }
   }

   const handleCompleteCheckout = () => {
      setIsCheckoutModalOpen(false)
      setCheckoutStep(1)
      router.push("/account/orders")
   }

   return (
      <div className="min-h-screen bg-background mt-4">
         <div className="hidden sm:block container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Link href="/" className="hover:text-foreground">
                  {tCommon('home')}
               </Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-foreground">{t('cart')}</span>
            </div>
         </div>

         <div className="container mx-auto px-4 pb-36 sm:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-2">
                  <div className="p-2 bg-green-50 border-green-200 rounded-md">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                           </svg>
                           <span className="font-medium text-green-800">
                              {t('freeShippingOnAllItems')}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="p-2 bg-green-50 border-green-200 rounded-md">
                     <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                           <path d="M20 7h-9M14 3v4M6 21V10a2 2 0 012-2h2" strokeWidth="2" strokeLinecap="round" />
                           <path d="M6 13H4a2 2 0 00-2 2v4a2 2 0 002 2h2" strokeWidth="2" />
                        </svg>
                        <span className="text-sm text-green-800">
                           {t('noImportCharges')}
                        </span>
                     </div>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                     <div className="flex items-center gap-3">
                        <Checkbox
                           checked={selectedItems.length === items.length && items.length > 0}
                           onCheckedChange={toggleSelectAll}
                        />
                        <span className="font-medium">{t('selectAll')} ({items.length})</span>
                     </div>
                  </div>

                  <hr />

                  {items.length === 0 ? (
                     <div className="flex items-center justify-center flex-col my-8 sm:my-16">
                        <div className="flex items-center gap-2">
                           <ShoppingCart size={36} className="text-gray-300" />
                           <div className="text-start">
                              <h4 className="text-black font-bold">{t('emptyCartTitle')}</h4>
                              <p className="text-sm text-gray-500">{t('emptyCartDesc')}</p>
                           </div>
                        </div>
                        <Link href="/">
                           <Button className="mt-4 bg-orange-500 hover:bg-orange-600 px-8 rounded-full">{t('seeTrendingItems')}</Button>
                        </Link>
                     </div>
                  ) : (
                     <div className="space-y-4 mt-4">
                        <div className="flex items-center gap-2 text-md font-medium text-green-700 font-bold">
                           <Check size={22} className="text-green-700" />
                           {t('freeShippingFromShopHub')}
                        </div>

                        {items.map((item) => (
                           <div key={item.id} className="p-4">
                              <div className="flex gap-4">
                                 <Checkbox
                                    checked={selectedItems.includes(item.id)}
                                    onCheckedChange={() => toggleSelectItem(item.id)}
                                 />
                                 <SkeletonImage
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    containerClassName="h-24 w-24"
                                    className="h-24 w-24 object-cover rounded"
                                 />
                                 <div className="flex-1 border-b pb-4">
                                    <div className="flex items-start justify-between">
                                       <div className="flex-1">
                                          {item.name.includes("Princess") && (
                                             <Badge className="bg-orange-500 text-white text-xs mb-2">🔥 LIGHTNING DEAL</Badge>
                                          )}
                                          <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                                          <div className="text-xs text-muted-foreground mt-1">
                                             {item.color && <span>{item.color}</span>}
                                          </div>
                                       </div>
                                       <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => removeItem(item.id)}
                                          className="text-muted-foreground hover:text-destructive"
                                       >
                                          <Trash2 className="h-4 w-4" />
                                       </Button>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                       <div>
                                          {item.name.includes("Princess") && (
                                             <Badge className="bg-gray-800 text-white text-xs mb-2">ALMOST SOLD OUT</Badge>
                                          )}
                                          {item.name.includes("Hello Kitty") && (
                                             <Badge className="bg-gray-800 text-white text-xs mb-2">ALMOST SOLD OUT</Badge>
                                          )}
                                          <div className="flex items-baseline gap-2">
                                             {item.originalPrice && (
                                                <span className="text-xs text-muted-foreground line-through">
                                                   ${item.originalPrice.toFixed(2)}
                                                </span>
                                             )}
                                             <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                                             {item.originalPrice && (
                                                <span className="text-xs text-green-600 font-medium">
                                                   -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                                </span>
                                             )}
                                          </div>
                                          {item.name.includes("Hello Kitty") && (
                                             <div className="text-xs text-muted-foreground mt-1">
                                                Add $4.03+ for $0.98 off on eligible items →
                                             </div>
                                          )}
                                       </div>

                                       <select
                                          value={item.quantity}
                                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                                          className="w-full border rounded px-3 py-1.5 text-sm"
                                       >
                                          Qty
                                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                             <option key={num} value={num}>
                                                {num}
                                             </option>
                                          ))}
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}

                  <div className="mt-8">
                     <h2 className="text-lg font-bold mb-4">{t('itemsYouMayWant')}</h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {recommendedProducts.map((product, index) => (
                           <ProductCard key={product.id + index} product={product} />
                        ))}
                     </div>
                  </div>
               </div>

               <div className="hidden sm:block lg:col-span-1">
                  <div className="sticky top-4">
                     <div className="space-y-2">
                        <h2 className="text-lg font-bold">{t('orderSummary')}</h2>
                        <div className="space-y-2 text-sm">
                           <div className="flex justify-between">
                              <span>{t('itemsTotal')}:</span>
                              <span className="line-through ">${selectedOriginalTotal.toFixed(2)}</span>
                           </div>
                           <div className="flex justify-between">
                              <span>{t('itemsDiscount')}:</span>
                              <span className="text-destructive font-medium">-${discount.toFixed(2)}</span>
                           </div>
                           <hr />
                           <div className="flex justify-between">
                              <span className="text-md font-bold text-green-600">{t('shipping')}:</span>
                              <span className="text-xl text-green-600 font-bold">{t('free')}</span>
                           </div>
                           <div className="pt-2 flex justify-between text-base">
                              <span className="font-bold text-sm">{t('estimatedTotal')}</span>
                              <span className="text-xl font-bold text-green-600">${selectedSubtotal.toFixed(2)}</span>
                           </div>
                        </div>

                        <div className="border border-green-500 rounded-md p-2 text-sm">
                           <div className="flex items-start gap-2">
                              <div className="text-green-600 font-bold">
                                 <span className="font-bold">{t('priceMatchGuarantee')}</span> {t('proceedToCheckoutNow')}
                              </div>
                           </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                           {t('referToFinalPayment')}
                        </div>

                        <hr />

                        <Button
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 text-sm"
                           size="sm"
                           onClick={handleCheckoutClick}
                        >
                           {t('checkout')} ({selectedItems.length})
                        </Button>

                        <div className="text-xs text-muted-foreground flex items-start gap-2">
                           <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                           <span>{t('itemAvailabilityNote')}</span>
                        </div>

                        <div className="rounded-lg space-y-4">
                           <div className="flex items-start gap-2 text-sm">
                              <LockKeyhole size={24} className="fill-green-800 text-white" />
                              <span className="text-sm text-foreground">
                                 {t('notChargedUntilReview')}
                              </span>
                           </div>

                           <div className="flex flex-col items-start">
                              <div className="flex items-center justify-start font-medium text-foreground gap-2">
                                 <ShieldCheck size={22} className="fill-green-800 text-white" />
                                 <span>{t('safePaymentOptions')}</span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                 {t('paymentProtectionDesc')}
                              </div>
                           </div>

                           <div className="flex flex-col items-start">
                              <div className="flex items-center justify-start font-medium text-foreground gap-2">
                                 <BaggageClaim size={22} className="fill-green-800 text-white" />
                                 <span>{t('purchaseProtection')}</span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                 {t('purchaseProtectionDesc')}
                              </div>
                           </div>

                           <div className="space-y-3">
                              <div className="flex items-center justfy-start gap-2">
                                 <div className="rounded-lg space-y-2">
                                    <div className="flex items-center justify-start font-medium text-foreground gap-2">
                                       <Truck size={22} className="fill-green-800 text-white" />
                                       <span>{t('deliveryGuarantee')}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 space-y-1 text-sm text-muted-foreground">
                                       <div>
                                          <div className="flex items-center gap-2">
                                             <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                             <span>{t('creditForDelay')}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                             <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                             <span>{t('noUpdateRefund')}</span>
                                          </div>
                                       </div>
                                       <div>
                                          <div className="flex items-center gap-2">
                                             <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                             <span>{t('returnIfDamaged')}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                             <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                             <span>{t('noDeliveryRefund')}</span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <button className="cursor-pointer flex items-center gap-2 text-green-700 font-semibold transition-colors group w-full hover:underline">
                              <div className="flex items-center justify-center w-6 h-6 bg-green-700 text-white rounded font-bold">
                                 <span className="text-[7px]">Plant</span>
                              </div>
                              <span className="text-black">{t('treePlantingProgram')}</span>
                              <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Mobile Fixed Checkout Bar */}
         {selectedItems.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 sm:hidden z-40">
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                     <Checkbox
                        checked={selectedItems.length === items.length && items.length > 0}
                        onCheckedChange={toggleSelectAll}
                     />
                     <span className="text-sm">{t('selectAll')}</span>
                  </div>
                  <div className="text-right">
                     <p className="text-xs text-muted-foreground">{t('total')}</p>
                     <p className="text-lg font-bold text-orange-600">${selectedSubtotal.toFixed(2)}</p>
                  </div>
               </div>
               <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6"
                  onClick={handleCheckoutClick}
               >
                  {t('checkout')} ({selectedItems.length})
               </Button>
            </div>
         )}

         {/* Checkout Modal */}
         <Dialog open={isCheckoutModalOpen} onOpenChange={setIsCheckoutModalOpen}>
            <DialogContent className="sm:!max-w-[50vw] max-h-[90vh] overflow-y-auto space-y-6">
               <DialogHeader className="mb-6">
                  <DialogTitle className="text-sm">
                     {checkoutStep === 1 && t('step1DeliveryAddress')}
                     {checkoutStep === 2 && t('step2Payment')}
                     {checkoutStep === 3 && t('orderSuccessful')}
                  </DialogTitle>
               </DialogHeader>

               {checkoutStep === 1 && (
                  <div className="space-y-6">
                     {/* Step Progress */}
                     <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">1</div>
                           <span className="text-sm font-medium">{t('address')}</span>
                        </div>
                        <div className="w-12 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">2</div>
                           <span className="text-sm text-gray-500">{t('payment')}</span>
                        </div>
                        <div className="w-12 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">3</div>
                           <span className="text-sm text-gray-500">{t('complete')}</span>
                        </div>
                     </div>

                     {addresses.length > 0 ? (
                        <div className="space-y-4">
                           <h3 className="font-semibold text-lg">{t('selectDeliveryAddressTitle')}</h3>
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-70 overflow-y-auto">
                              {addresses.map((addr: any) => (
                                 <div
                                    key={addr.id}
                                    onClick={() => setSelectedAddressId(addr.id)}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedAddressId === addr.id
                                       ? "border-orange-500 bg-orange-50"
                                       : "border-gray-200 hover:border-orange-300"
                                       }`}
                                 >
                                    <div className="flex items-start justify-between">
                                       <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-2">
                                             <MapPin size={16} className="text-orange-500" />
                                             <span className="font-medium">{addr.address}</span>
                                             {addr.is_default && (
                                                <Badge className="bg-green-500 text-white text-xs">{t('default')}</Badge>
                                             )}
                                          </div>
                                          <p className="text-sm text-gray-600">
                                             {addr.city?.city}, {addr.state?.state} {addr.postal_code}
                                          </p>
                                          <p className="text-sm text-gray-600">{addr.country?.country}</p>
                                          <p className="text-sm text-gray-600">{t('phone')}: {addr.phone_number}</p>
                                       </div>
                                       {selectedAddressId === addr.id && (
                                          <CheckCircle2 className="text-orange-500" size={24} />
                                       )}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ) : (
                        <div className="space-y-4">
                           <h3 className="font-semibold text-lg">{t('createDeliveryAddress')}</h3>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                 <Label>{t('email')} <span className="text-rose-500">*</span></Label>
                                 <Input value={email} onChange={(e) => setEmail(e.target.value)} required />
                              </div>
                              <div className="space-y-1.5">
                                 <Label>{t('phoneNumber')} <span className="text-rose-500">*</span></Label>
                                 <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
                              </div>
                              <div className="space-y-1.5 col-span-2">
                                 <Label>{t('address')} <span className="text-rose-500">*</span></Label>
                                 <Input value={address} onChange={(e) => setAddress(e.target.value)} required />
                              </div>
                              <div className="space-y-1.5">
                                 <Label>{t('country')} <span className="text-rose-500">*</span></Label>
                                 <Select value={countryId} onValueChange={(val) => {
                                    const selected = countries.find((c) => c.value === val)
                                    setCountryId(val)
                                    setCountryName(selected?.label || "")
                                    setStateId("")
                                    setStateName("")
                                    setCityName("")
                                    getStates({ variables: { countryId: val } })
                                 }}>
                                    <SelectTrigger className="w-full"><SelectValue placeholder={t('selectCountry')} /></SelectTrigger>
                                    <SelectContent>
                                       {countries.map((c) => (
                                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>
                              <div className="space-y-1.5">
                                 <Label>{t('state')}</Label>
                                 <Select value={stateId} onValueChange={(val) => {
                                    const selected = states.find((s) => s.value === val)
                                    setStateId(val)
                                    setStateName(selected?.label || "")
                                    setCityName("")
                                    getCities({ variables: { countryId, stateId: val } })
                                 }}>
                                    <SelectTrigger className="w-full"><SelectValue placeholder={t('selectState')} /></SelectTrigger>
                                    <SelectContent>
                                       {states.map((s) => (
                                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>
                              <div className="space-y-1.5">
                                 <Label>{t('city')} <span className="text-rose-500">*</span></Label>
                                 <Select value={cityName} onValueChange={setCityName}>
                                    <SelectTrigger className="w-full"><SelectValue placeholder={t('selectCity')} /></SelectTrigger>
                                    <SelectContent>
                                       {cities.map((c) => (
                                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>
                              <div className="space-y-1.5">
                                 <Label>{t('postalCode')} <span className="text-rose-500">*</span></Label>
                                 <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                              </div>
                           </div>
                           <Button onClick={handleCreateAddress} disabled={isCreatingAddress} className="w-auto bg-orange-500 hover:bg-orange-600">
                              <Plus className="" size={16} />
                              {isCreatingAddress ? t('creating') : t('createAddress')}
                           </Button>
                        </div>
                     )}

                     {/* Delivery Type */}
                     <div className="mt-6 p-4 border border-orange-200 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-3">
                           <Truck className="text-orange-600" size={24} />
                           <div>
                              <h4 className="font-semibold text-orange-900">{t('doorToDoorDelivery')}</h4>
                              <p className="text-sm text-orange-700">{t('freeShippingEstimatedDelivery')}</p>
                           </div>
                        </div>
                     </div>

                     <Button onClick={handleProceedToPayment} className="w-full bg-orange-500 hover:bg-orange-600 py-6">
                        {t('proceedToPayment')}
                     </Button>
                  </div>
               )}

               {checkoutStep === 2 && (
                  <div className="space-y-6">
                     {/* Step Progress */}
                     <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                              <Check size={16} />
                           </div>
                           <span className="text-sm font-medium">{t('address')}</span>
                        </div>
                        <div className="w-12 h-0.5 bg-orange-500"></div>
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">2</div>
                           <span className="text-sm font-medium">{t('payment')}</span>
                        </div>
                        <div className="w-12 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">3</div>
                           <span className="text-sm text-gray-500">{t('complete')}</span>
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        {/* Left: Wallet Info */}
                        <div className="space-y-4">
                           <h3 className="text-md">{t('walletBalance')}</h3>
                           <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                              <div className="flex items-center gap-2 mb-2">
                                 <Wallet size={20} />
                                 <span className="text-sm opacity-90">{t('availableBalance')}</span>
                              </div>
                              <p className="text-xl font-bold">${walletBalance.toFixed(2)}</p>
                           </div>

                           {walletBalance < selectedSubtotal && (
                              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                 <p className="text-sm text-red-600 font-medium">
                                    {t('insufficientBalance')}
                                 </p>
                              </div>
                           )}

                           <div className="flex gap-2">
                              <Button variant="outline" className="flex-1 border border-orange-500" onClick={() => router.push("/account/credit")}>
                                 <Plus size={16} />
                                 {t('topUp')}
                              </Button>
                              <Button
                                 className="flex-1 bg-green-600 hover:bg-green-700"
                                 onClick={handlePayment}
                                 disabled={isProcessingPayment || walletBalance < selectedSubtotal}
                              >
                                 {isProcessingPayment ? t('processing') : t('payNow')}
                              </Button>
                           </div>

                        </div>

                        {/* Right: Order Summary */}
                        <div className="space-y-4">
                           <h3 className="text-md">{t('orderSummary')}</h3>
                           <div className="border rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
                              {items.filter((item) => selectedItems.includes(item.id)).map((item) => (
                                 <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                                    <SkeletonImage
                                       src={item.image || "/placeholder.svg"}
                                       alt={item.name}
                                       containerClassName="w-16 h-16"
                                       className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                       <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                                       <p className="text-xs text-gray-500">{t('qty')}: {item.quantity}</p>
                                       <p className="text-sm font-bold text-orange-600">${item.price.toFixed(2)}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>

                           <div className="border-t pt-3 space-y-2">
                              <div className="flex justify-between text-sm">
                                 <span>{t('subtotal')}:</span>
                                 <span>${selectedSubtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                 <span>{t('shipping')}:</span>
                                 <span className="text-green-600 font-medium">{t('free')}</span>
                              </div>
                              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                 <span>{t('total')}:</span>
                                 <span className="text-orange-600">${selectedSubtotal.toFixed(2)}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {checkoutStep === 3 && (
                  <div className="space-y-6 py-8">
                     <div className="flex flex-col items-center text-center space-y-2">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                           <CheckCircle2 className="text-green-600" size={48} />
                        </div>
                        <h2 className="text-lg font-bold text-green-700">{t('orderPlacedSuccessfully')}</h2>
                        <p className="text-sm text-gray-600 max-w-md">
                           {t('orderConfirmedDesc')}
                        </p>
                        <Button onClick={handleCompleteCheckout} className="w-full max-w-md bg-orange-500 hover:bg-orange-600 py-4 text-sm mt-6">
                           {t('viewMyOrders')}
                        </Button>
                     </div>
                  </div>
               )}
            </DialogContent>
         </Dialog>

      </div>
   )
}
