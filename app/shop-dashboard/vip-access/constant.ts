import { FAQ, VIPLevel } from "@/app/interface/vip-level";

export const vipLevels: VIPLevel[] = [
  {
    id: "vip1",
    name: "VIP 1",
    color: "bg-white border-b",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-900",
    iconColor: "text-gray-700",
    headerTextColor: "text-gray-900",
    headerSubTextColor: "text-gray-500",
    headerIconBg: "bg-gray-100",
    isLightHeader: true,
    deposit: "15,000 USDT",
    reward: "1,500 USDT",
    profitPoint: "25%",
    dailyTraffic: "3,000-5,000",
    features: [
      "VIP store function can be opened",
      "Fixed national international stations can be opened",
      "Basic priority listing",
      "Standard customer support",
    ],
  },
  {
    id: "vip2",
    name: "VIP 2",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    iconColor: "text-purple-500",
    deposit: "30,000 USDT",
    reward: "3,000 USDT",
    profitPoint: "30%",
    dailyTraffic: "5,000-8,000",
    features: [
      "VIP business post function activated",
      "National international service station can be opened",
      "Enhanced product visibility",
      "Priority customer support",
    ],
    popular: true,
  },
  {
    id: "vip3",
    name: "VIP 3",
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    iconColor: "text-orange-500",
    deposit: "45,000 USDT",
    reward: "4,500 USDT",
    profitPoint: "35%",
    dailyTraffic: "8,000-11,000",
    features: [
      "Full VIP store function access",
      "National international service station can be opened",
      "Maximum product exposure",
      "Dedicated account manager",
      "Exclusive promotional events",
    ],
  },
];

export const faqs: FAQ[] = [
  {
    id: "offer",
    question: "ABOUT THE OFFER",
    answer:
      "VIP membership grants access to a range of exclusive benefits, including increased profit margins and enhanced traffic exposure. Higher VIP levels unlock even greater advantages, helping merchants achieve better visibility and improved sales performance compared to non-VIP members.",
  },
  {
    id: "sales",
    question: "ABOUT SALES",
    answer:
      "As a VIP member, you gain access to priority product placement, increased daily traffic allowances, and higher profit percentages. VIP3 members can achieve up to 35% profit points with daily traffic reaching 8,000-11,000 potential customers.",
  },
  {
    id: "delivery",
    question: "ABOUT DELIVERY",
    answer:
      "VIP members enjoy expedited shipping options and priority order processing. Your products will be featured in faster delivery categories, improving customer satisfaction and increasing repeat purchases.",
  },
  {
    id: "product",
    question: "ABOUT THE PRODUCT",
    answer:
      "VIP membership allows you to list more products, access premium product categories, and receive enhanced product visibility in search results. Higher VIP tiers unlock exclusive category access and promotional opportunities.",
  },
  {
    id: "upgrade",
    question: "HOW TO UPGRADE TO A VIP LEVEL",
    answer:
      "To upgrade your VIP level, navigate to the Apply VIP section and select your desired tier. Meet the cumulative deposit requirement for your chosen level, and your account will be upgraded automatically. Benefits are activated immediately upon successful upgrade.",
  },
];
