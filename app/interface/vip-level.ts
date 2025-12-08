export interface VIPLevel {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
  headerTextColor?: string;
  headerSubTextColor?: string;
  headerIconBg?: string;
  isLightHeader?: boolean;
  deposit: string;
  reward: string;
  profitPoint: string;
  dailyTraffic: string;
  features: string[];
  popular?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
