import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ShopData } from "@/types/shop"

interface ShopState {
   shop: ShopData | null
   isAuthenticated: boolean
   setShop: (shop: ShopData) => void
   clearShop: () => void
}

export const useShopStore = create<ShopState>()(
   persist(
      (set) => ({
         shop: null,
         isAuthenticated: false,
         setShop: (shop: ShopData) =>
            set({
               shop,
               isAuthenticated: true,
            }),
         clearShop: () =>
            set({
               shop: null,
               isAuthenticated: false,
            }),
      }),
      {
         name: "shop-storage",
      }
   )
)
