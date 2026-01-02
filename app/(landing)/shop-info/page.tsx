"use client"

export default function ShopInfoPage() {
   return (
      <div className="min-h-screen bg-white">
         {/* Breadcrumb */}
         <div>
            <div className="max-w-5xl mx-auto px-4 py-3">
               <div className="flex items-center gap-2 text-xs text-gray-600">
                  <a href="/" className="hover:text-orange-500">Home</a>
                  <span>›</span>
                  <span className="text-gray-900">Temu | Shipping Info</span>
               </div>
            </div>
         </div>

         {/* Title */}
         <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 text-center">Temu | Shipping Info</h1>
         </div>

         {/* Content */}
         <div className="max-w-5xl mx-auto px-4 pb-16">
            <div className="text-xs text-gray-700 space-y-8">
               {/* Section 1: Shipping options */}
               <section>
                  <h2 className="text-sm font-bold text-gray-900 mb-3">Shipping options</h2>
                  <p className="leading-relaxed">
                     You may choose standard shipping depending on the items in your order and your location. As your orders may be handed over to local carriers for the final leg of delivery, tracking may not be available every step of the way.
                  </p>
               </section>

               {/* Section 2: Shipping address */}
               <section>
                  <h2 className="text-sm font-bold text-gray-900 mb-3">Shipping address</h2>
                  <p className="leading-relaxed">
                     Please make sure that you have provided the correct and current address for shipping and delivery. You may use P.O. boxes as your shipping address. But certain items can only be delivered to physical addresses. Large products, valuables, perishables, products with age-based restrictions, or items shipped via private carriers may require a physical mailing address or signature confirmation to be successfully delivered. Merchandise partners may also indicate in the product listings that they are unable to ship products to P.O. boxes. Items cannot be delivered to security-restricted areas such as military bases.
                  </p>
               </section>

               {/* Section 3: Shipping time and cost */}
               <section>
                  <h2 className="text-sm font-bold text-gray-900 mb-3">Shipping time and cost</h2>
                  <div className="space-y-3 leading-relaxed">
                     <p>
                        After an order has been successfully paid and confirmed, you will see the delivery time and cost for shipping on your order confirmation page. You will also receive an order confirmation message that will outline the processing time for your order.
                     </p>
                     <p>
                        It may take 1-3 days to process your order. You will receive a message once your order has been shipped.
                     </p>
                     <p>
                        You'll receive a shipment notification message that will provide you with the delivery time for each package once it is shipped. You will be provided with the tracking number when it is ready. You can view this delivery time under each package in your order history at the same time.
                     </p>
                     <p>
                        In most cases, your order will be delivered within the time of delivery. However, the actual delivery date may be affected by flight arrangements, weather conditions, and other external factors. Please refer to the tracking information for the most up to date delivery date.
                     </p>
                  </div>
               </section>

               {/* Section 4: Issues regarding delivery */}
               <section>
                  <h2 className="text-sm font-bold text-gray-900 mb-3">Issues regarding delivery</h2>
                  <p className="leading-relaxed">
                     If your package has not been delivered or your tracking information shows that your package has been delivered but you have not received it, please contact our customer service immediately and within 90 days of the order date.
                  </p>
               </section>
            </div>
         </div>
      </div>
   )
}
