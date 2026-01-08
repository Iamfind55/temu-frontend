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
  featureKeys: string[];
  popular?: boolean;
}

export interface FAQ {
  id: string;
  questionKey: string;
  answerKey: string;
}
