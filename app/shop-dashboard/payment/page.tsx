"use client"

import React from "react";
import { Loader, Save } from "lucide-react";
import { useMutation } from "@apollo/client/react";

// API & Types
import { useToast } from "@/lib/toast";
import { ShopData } from "@/types/shop";
import { MUTATION_SHOP_UPDATE_INFORMATION1 } from "@/app/api/shop/profile";

// Store
import { useShopStore } from "@/store/shop-store";

// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";

export default function PaymentMethodPage() {
   const { errorMessage, successMessage } = useToast();

   // Shop Store from Zustand
   const { shop, setShop } = useShopStore();

   console.log("Shop data::", shop);

   // Form State
   const [formData, setFormData] = React.useState({
      bankName: "",
      walletAddress: "",
      bankAccountName: "",
      bankAccountNumber: "",
   });
   const [isLoading, setIsLoading] = React.useState(false);

   // Mutation
   const [updateShopInfo] = useMutation(MUTATION_SHOP_UPDATE_INFORMATION1);

   React.useEffect(() => {
      if (shop?.payment_method) {
         const payment = shop.payment_method;
         setFormData({
            bankName: payment.bank_name || "",
            walletAddress: payment.code || "", // code == wallet address
            bankAccountName: payment.bank_account_name || "",
            bankAccountNumber: payment.bank_account_number || "",
         });
      }
   }, [shop]);

   const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         const res: any = await updateShopInfo({
            variables: {
               data: {
                  payment_method: {
                     bank_name: formData.bankName,
                     code: formData.walletAddress,
                     bank_account_name: formData.bankAccountName,
                     bank_account_number: formData.bankAccountNumber,
                  },
               },
            },
         });

         if (res?.data?.updateShopInformation?.success) {
            // Update Zustand store with the latest shop data
            const updatedShopData = res.data.updateShopInformation.data as ShopData;
            setShop(updatedShopData);

            successMessage({
               message: "Payment method updated successfully!",
               duration: 3000,
            });
         } else {
            errorMessage({
               message: "Failed to update payment method. Try again later!",
               duration: 3000,
            });
         }
      } catch (error) {
         errorMessage({
            message: "Unexpected error. Try again later!",
            duration: 3000,
         });
      } finally {
         setIsLoading(false);
      }
   };
   return (
      <div className="w-full p-2 sm:p-8">
         <form onSubmit={handleSubmit} className="border space-y-8 p-4 rounded-sm">
            <div className="space-y-2">
               <CardTitle>Payment setting</CardTitle>
               <CardDescription>Update your payment address for receive funds from Temushop</CardDescription>
            </div>
            <div className="space-y-6 sm:space-y-8">
               <div className="space-y-2">
                  <Label htmlFor="wallet_address">Wallet address (USDT) <span className="text-rose-500">*</span></Label>
                  <Input
                     id="wallet_address"
                     placeholder="Enter wallet address"
                     value={formData.walletAddress}
                     onChange={handleChange("walletAddress")}
                     disabled={isLoading}
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="bank_name">Bank Name <span className="text-rose-500">*</span></Label>
                  <Input
                     id="bank_name"
                     placeholder="Enter bank name"
                     value={formData.bankName}
                     onChange={handleChange("bankName")}
                     disabled={isLoading}
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="bank_account_name">Bank Account Name <span className="text-rose-500">*</span></Label>
                  <Input
                     id="bank_account_name"
                     placeholder="Enter bank account name"
                     value={formData.bankAccountName}
                     onChange={handleChange("bankAccountName")}
                     disabled={isLoading}
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="bank_account_number">Bank account number <span className="text-rose-500">*</span></Label>
                  <Input
                     id="bank_account_number"
                     placeholder="Enter bank account number"
                     value={formData.bankAccountNumber}
                     onChange={handleChange("bankAccountNumber")}
                     disabled={isLoading}
                  />
               </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
               <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={isLoading}
               >
                  {isLoading ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                  {isLoading ? "Saving..." : "Save Changes"}
               </Button>
            </div>
         </form>
      </div>
   )
}
