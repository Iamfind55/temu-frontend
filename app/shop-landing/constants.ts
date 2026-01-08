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
  { icon: TrendingUp, textKey: "featureTrendingPlatform" },
  { icon: Zap, textKey: "featureFastFirstSale" },
  { icon: DollarSign, textKey: "featureCostEfficient" },
  { icon: Headphones, textKey: "featurePersonalizedSupport" },
];

export const whySellFeatures = [
  {
    icon: TrendingUp,
    titleHighlightKey: "whySellTrendingHighlight",
    titleNormalKey: "whySellTrendingNormal",
    highlightFirst: true,
    descriptionKey: "whySellTrendingDesc",
  },
  {
    icon: CreditCard,
    titleHighlightKey: "whySellFirstSaleHighlight",
    titleNormalKey: "whySellFirstSaleNormal",
    highlightFirst: false,
    descriptionKey: "whySellFirstSaleDesc",
    footnote: "2",
  },
  {
    icon: Wallet,
    titleHighlightKey: "whySellCostHighlight",
    titleNormalKey: "whySellCostNormal",
    highlightFirst: true,
    descriptionKey: "whySellCostDesc",
  },
  {
    icon: MessageCircle,
    titleHighlightKey: "whySellSupportHighlight",
    titleNormalKey: "whySellSupportNormal",
    highlightFirst: true,
    descriptionKey: "whySellSupportDesc",
  },
];
