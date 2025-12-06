// Shop Types

export interface PaymentMethod {
   id: string
   code: string
   bank_name: string
   bank_account_number: string
   bank_account_name: string
}

export interface IdCardInfo {
   id_card_image_front: string
   id_card_image_back: string
}

export interface ShopImage {
   logo: string
   cover: string
}

export interface ShopData {
   id: string
   fullname: string
   dob: string
   email: string
   phone_number: string
   store_name: string
   status: string
   shop_vip: string
   remark: string
   profit: number
   id_card_info: IdCardInfo | null
   image: ShopImage | null
   totalFollower: number
   totalProduct: number
   username: string
   payment_method: PaymentMethod[] | null
}

export interface ShopLoginData {
   token: string
   data: ShopData
}

export interface ShopLoginError {
   message: string
   code: string
   details: string | null
}

export interface ShopLoginResponse {
   shopLogin: {
      success: boolean
      data: ShopLoginData | null
      error: ShopLoginError | null
   }
}
