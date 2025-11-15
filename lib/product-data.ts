export interface ProductVariant {
  id: string;
  name: string;
  image: string;
  available: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  soldCount: string;
  images: string[];
  variants: ProductVariant[];
  category: string;
  badges: string[];
  brand?: string;
  shipping: {
    isFree: boolean;
    deliveryDays: number;
    credit: number;
  };
  promotion: {
    text: string;
    discount: number;
    endTime: string;
  };
}

export const products: Product[] = [
  {
    id: "1",
    title:
      "Sports Smart Watch, 1.83'' Full Touch Screen Display with Message, Answer Make Call Smartwatch, Monitoring, Sports Pedometer, Information Alerts, for iPhone Android Phones, Smartbands Fitness Watch for Women Men Friend Gift, Birthday Gift",
    description:
      "Advanced sports smartwatch with full touch screen, call functionality, and comprehensive health monitoring features.",
    price: 10.93,
    originalPrice: 32.0,
    discount: 65,
    rating: 4.6,
    reviewCount: 26282,
    soldCount: "550k+",
    images: [
      "/black-sports-smartwatch-front-view.jpg",
      "/black-sports-smartwatch-side-view.jpg",
      "/smartwatch-color-options-display.jpg",
      "/smartwatch-features-demonstration.jpg",
      "/smartwatch-app-interface.jpg",
      "/smartwatch-packaging.jpg",
      "/smartwatch-in-use-lifestyle.jpg",
      "/smartwatch-specifications.jpg",
    ],
    variants: [
      {
        id: "turquoise",
        name: "Turquoise",
        image: "/turquoise-smartwatch.jpg",
        available: true,
      },
      {
        id: "lavender",
        name: "Lavender Pink",
        image: "/lavender-pink-smartwatch.jpg",
        available: true,
      },
      {
        id: "black",
        name: "Black",
        image: "/black-smartwatch.jpg",
        available: true,
      },
      {
        id: "white",
        name: "White",
        image: "/white-smartwatch.jpg",
        available: true,
      },
      {
        id: "pink",
        name: "pink",
        image: "/pink-smartwatch.jpg",
        available: true,
      },
      {
        id: "silver-black",
        name: "Silver&Black",
        image: "/silver-black-smartwatch.jpg",
        available: true,
      },
      {
        id: "golden-black",
        name: "Golden&Black",
        image: "/golden-black-smartwatch.jpg",
        available: true,
      },
      {
        id: "starlight",
        name: "Starlight",
        image: "/starlight-smartwatch.jpg",
        available: true,
      },
    ],
    category: "Smartwatch & Accessories",
    badges: ["Star store", "#2 TOP RATED"],
    shipping: {
      isFree: true,
      deliveryDays: 5,
      credit: 5.0,
    },
    promotion: {
      text: "Get 2nd for 45% off",
      discount: 45,
      endTime: "2025-10-23T09:19:53",
    },
  },
  {
    id: "2",
    title: "USB Socket and 3-Color Adjustable Light",
    description:
      "Elegant vanity desk with built-in lighting and USB charging ports.",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    rating: 4.8,
    reviewCount: 1543,
    soldCount: "12k+",
    images: ["/pink-vanity-desk-with-lights.jpg"],
    variants: [],
    category: "Home & Garden",
    badges: [],
    shipping: { isFree: true, deliveryDays: 7, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 20% off",
      discount: 20,
      endTime: "2025-10-25T23:59:59",
    },
  },
  {
    id: "3",
    title: "30-Day Chair Yoga Guide for Seniors Over 60",
    description:
      "Complete yoga guide designed specifically for seniors with easy-to-follow exercises.",
    price: 12.99,
    originalPrice: 24.99,
    discount: 48,
    rating: 4.7,
    reviewCount: 892,
    soldCount: "5k+",
    images: ["/yoga-book-for-seniors.jpg"],
    variants: [],
    category: "Books & Media",
    badges: [],
    shipping: { isFree: true, deliveryDays: 10, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 30% off",
      discount: 30,
      endTime: "2025-10-24T23:59:59",
    },
  },
  {
    id: "4",
    title: "Portable Mini Projector - Compatible with Phone",
    description:
      "Compact projector with smartphone connectivity for entertainment anywhere.",
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    rating: 4.5,
    reviewCount: 3421,
    soldCount: "25k+",
    images: ["/mini-projector-with-phone.jpg"],
    variants: [],
    category: "Electronics",
    badges: ["Best-Selling"],
    shipping: { isFree: true, deliveryDays: 5, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 25% off",
      discount: 25,
      endTime: "2025-10-26T23:59:59",
    },
  },
  {
    id: "5",
    title: "1pc Customizable Metal Sign, Personalized",
    description: "Custom metal sign perfect for gifts and home decoration.",
    price: 24.99,
    originalPrice: 49.99,
    discount: 50,
    rating: 4.9,
    reviewCount: 2156,
    soldCount: "18k+",
    images: ["/custom-metal-sign-shirt.jpg"],
    variants: [],
    category: "Home Decor",
    badges: [],
    shipping: { isFree: true, deliveryDays: 8, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 40% off",
      discount: 40,
      endTime: "2025-10-27T23:59:59",
    },
  },
  {
    id: "6",
    title: "40-inch Smartphone Selfie Stick Tripod",
    description:
      "Versatile selfie stick with tripod functionality for perfect photos.",
    price: 19.99,
    originalPrice: 39.99,
    discount: 50,
    rating: 4.6,
    reviewCount: 4532,
    soldCount: "35k+",
    images: ["/selfie-stick-tripod.jpg"],
    variants: [],
    category: "Phone Accessories",
    badges: [],
    shipping: { isFree: true, deliveryDays: 6, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 35% off",
      discount: 35,
      endTime: "2025-10-25T23:59:59",
    },
  },
  {
    id: "7",
    title: "Wireless Bluetooth Earbuds with Charging Case",
    description:
      "High-quality wireless earbuds with long battery life and premium sound.",
    price: 34.99,
    originalPrice: 79.99,
    discount: 56,
    rating: 4.7,
    reviewCount: 8921,
    soldCount: "65k+",
    images: ["/wireless-earbuds.png"],
    variants: [],
    category: "Audio",
    badges: ["Best-Selling"],
    shipping: { isFree: true, deliveryDays: 5, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 45% off",
      discount: 45,
      endTime: "2025-10-24T23:59:59",
    },
  },
  {
    id: "8",
    title: "Smart Watch Fitness Tracker",
    description:
      "Comprehensive fitness tracking with heart rate monitoring and GPS.",
    price: 49.99,
    originalPrice: 129.99,
    discount: 62,
    rating: 4.8,
    reviewCount: 12453,
    soldCount: "95k+",
    images: ["/smart-watch-fitness.png"],
    variants: [],
    category: "Wearables",
    badges: ["Star store", "#1 TOP RATED"],
    shipping: { isFree: true, deliveryDays: 5, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 50% off",
      discount: 50,
      endTime: "2025-10-23T23:59:59",
    },
  },
  {
    id: "1",
    title:
      "Sports Smart Watch, 1.83'' Full Touch Screen Display with Message, Answer Make Call Smartwatch, Monitoring, Sports Pedometer, Information Alerts, for iPhone Android Phones, Smartbands Fitness Watch for Women Men Friend Gift, Birthday Gift",
    description:
      "Advanced sports smartwatch with full touch screen, call functionality, and comprehensive health monitoring features.",
    price: 10.93,
    originalPrice: 32.0,
    discount: 65,
    rating: 4.6,
    reviewCount: 26282,
    soldCount: "550k+",
    images: [
      "/black-sports-smartwatch-front-view.jpg",
      "/black-sports-smartwatch-side-view.jpg",
      "/smartwatch-color-options-display.jpg",
      "/smartwatch-features-demonstration.jpg",
      "/smartwatch-app-interface.jpg",
      "/smartwatch-packaging.jpg",
      "/smartwatch-in-use-lifestyle.jpg",
      "/smartwatch-specifications.jpg",
    ],
    variants: [
      {
        id: "turquoise",
        name: "Turquoise",
        image: "/turquoise-smartwatch.jpg",
        available: true,
      },
      {
        id: "lavender",
        name: "Lavender Pink",
        image: "/lavender-pink-smartwatch.jpg",
        available: true,
      },
      {
        id: "black",
        name: "Black",
        image: "/black-smartwatch.jpg",
        available: true,
      },
      {
        id: "white",
        name: "White",
        image: "/white-smartwatch.jpg",
        available: true,
      },
      {
        id: "pink",
        name: "pink",
        image: "/pink-smartwatch.jpg",
        available: true,
      },
      {
        id: "silver-black",
        name: "Silver&Black",
        image: "/silver-black-smartwatch.jpg",
        available: true,
      },
      {
        id: "golden-black",
        name: "Golden&Black",
        image: "/golden-black-smartwatch.jpg",
        available: true,
      },
      {
        id: "starlight",
        name: "Starlight",
        image: "/starlight-smartwatch.jpg",
        available: true,
      },
    ],
    category: "Smartwatch & Accessories",
    badges: ["Star store", "#2 TOP RATED"],
    shipping: {
      isFree: true,
      deliveryDays: 5,
      credit: 5.0,
    },
    promotion: {
      text: "Get 2nd for 45% off",
      discount: 45,
      endTime: "2025-10-23T09:19:53",
    },
  },
  {
    id: "2",
    title: "USB Socket and 3-Color Adjustable Light",
    description:
      "Elegant vanity desk with built-in lighting and USB charging ports.",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    rating: 4.8,
    reviewCount: 1543,
    soldCount: "12k+",
    images: ["/pink-vanity-desk-with-lights.jpg"],
    variants: [],
    category: "Home & Garden",
    badges: [],
    shipping: { isFree: true, deliveryDays: 7, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 20% off",
      discount: 20,
      endTime: "2025-10-25T23:59:59",
    },
  },
  {
    id: "3",
    title: "30-Day Chair Yoga Guide for Seniors Over 60",
    description:
      "Complete yoga guide designed specifically for seniors with easy-to-follow exercises.",
    price: 12.99,
    originalPrice: 24.99,
    discount: 48,
    rating: 4.7,
    reviewCount: 892,
    soldCount: "5k+",
    images: ["/yoga-book-for-seniors.jpg"],
    variants: [],
    category: "Books & Media",
    badges: [],
    shipping: { isFree: true, deliveryDays: 10, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 30% off",
      discount: 30,
      endTime: "2025-10-24T23:59:59",
    },
  },
  {
    id: "4",
    title: "Portable Mini Projector - Compatible with Phone",
    description:
      "Compact projector with smartphone connectivity for entertainment anywhere.",
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    rating: 4.5,
    reviewCount: 3421,
    soldCount: "25k+",
    images: ["/mini-projector-with-phone.jpg"],
    variants: [],
    category: "Electronics",
    badges: ["Best-Selling"],
    shipping: { isFree: true, deliveryDays: 5, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 25% off",
      discount: 25,
      endTime: "2025-10-26T23:59:59",
    },
  },
  {
    id: "5",
    title: "1pc Customizable Metal Sign, Personalized",
    description: "Custom metal sign perfect for gifts and home decoration.",
    price: 24.99,
    originalPrice: 49.99,
    discount: 50,
    rating: 4.9,
    reviewCount: 2156,
    soldCount: "18k+",
    images: ["/custom-metal-sign-shirt.jpg"],
    variants: [],
    category: "Home Decor",
    badges: [],
    shipping: { isFree: true, deliveryDays: 8, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 40% off",
      discount: 40,
      endTime: "2025-10-27T23:59:59",
    },
  },
  {
    id: "6",
    title: "40-inch Smartphone Selfie Stick Tripod",
    description:
      "Versatile selfie stick with tripod functionality for perfect photos.",
    price: 19.99,
    originalPrice: 39.99,
    discount: 50,
    rating: 4.6,
    reviewCount: 4532,
    soldCount: "35k+",
    images: ["/selfie-stick-tripod.jpg"],
    variants: [],
    category: "Phone Accessories",
    badges: [],
    shipping: { isFree: true, deliveryDays: 6, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 35% off",
      discount: 35,
      endTime: "2025-10-25T23:59:59",
    },
  },
  {
    id: "7",
    title: "Wireless Bluetooth Earbuds with Charging Case",
    description:
      "High-quality wireless earbuds with long battery life and premium sound.",
    price: 34.99,
    originalPrice: 79.99,
    discount: 56,
    rating: 4.7,
    reviewCount: 8921,
    soldCount: "65k+",
    images: ["/wireless-earbuds.png"],
    variants: [],
    category: "Audio",
    badges: ["Best-Selling"],
    shipping: { isFree: true, deliveryDays: 5, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 45% off",
      discount: 45,
      endTime: "2025-10-24T23:59:59",
    },
  },
  {
    id: "8",
    title: "Smart Watch Fitness Tracker",
    description:
      "Comprehensive fitness tracking with heart rate monitoring and GPS.",
    price: 49.99,
    originalPrice: 129.99,
    discount: 62,
    rating: 4.8,
    reviewCount: 12453,
    soldCount: "95k+",
    images: ["/smart-watch-fitness.png"],
    variants: [],
    category: "Wearables",
    badges: ["Star store", "#1 TOP RATED"],
    shipping: { isFree: true, deliveryDays: 5, credit: 5.0 },
    promotion: {
      text: "Get 2nd for 50% off",
      discount: 50,
      endTime: "2025-10-23T23:59:59",
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(productId: string, limit = 10): Product[] {
  return products.filter((p) => p.id !== productId).slice(0, limit);
}
