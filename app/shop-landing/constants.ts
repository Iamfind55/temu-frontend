import {
  CreditCard,
  DollarSign,
  Headphones,
  MessageCircle,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

export const features = [
  { icon: TrendingUp, text: "Trending Platform" },
  { icon: Zap, text: "Fast First Sale" },
  { icon: DollarSign, text: "Cost-efficient from the Start" },
  { icon: Headphones, text: "Personalized Seller Support" },
];

export const whySellFeatures = [
  {
    icon: TrendingUp,
    titleHighlight: "Trending",
    titleNormal: "Platform",
    highlightFirst: true,
    description:
      "Thanks to Temu's global popularity and influence, you'll be able to easily promote your products to more potential customers.",
  },
  {
    icon: CreditCard,
    titleHighlight: "First Sale",
    titleNormal: "Fast",
    highlightFirst: false,
    description:
      "With Temu's high traffic, 50% of new sellers make their first sale within 20 days.",
    footnote: "2",
  },
  {
    icon: Wallet,
    titleHighlight: "Cost-efficient",
    titleNormal: "from the Start",
    highlightFirst: true,
    description:
      "Benefit from cost-efficiency in store setup, selling, operation and marketing",
  },
  {
    icon: MessageCircle,
    titleHighlight: "Personalized",
    titleNormal: "Seller Support",
    highlightFirst: true,
    description:
      "Our dedicated team of specialists is here to support your success. From onboarding to boosting product competitiveness, our experienced team provides the guidance you need every step.",
  },
];
