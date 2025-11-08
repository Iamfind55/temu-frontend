export const initialState = {
  user: {
    id: "",
    fullname: "",
    username: "",
    email: "",
    dob: "",
    remark: "",
    phone_number: "",
    image: {
      logo: "",
      cover: "",
    },
    payment_method: {
      id: "",
      bank_name: "",
      code: "",
      bank_account_name: "",
      bank_account_number: "",
    },
    id_card_info: {
      id_card_number: "",
      id_card_image_front: "",
      id_card_image_back: "",
      id_card_image: "",
    },
    store_name: "",
    shop_address: "",
    status: "",
    shop_vip: 0,
    created_at: "",
  },
};

export const initialCustomerState = {
  customer: {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone_number: "",
    dob: "",
    image: "",
    status: "",
    created_at: "",
  },
};
