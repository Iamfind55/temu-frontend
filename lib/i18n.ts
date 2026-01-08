import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import enCommon from '@/locales/en/common.json';
import enHeader from '@/locales/en/header.json';
import enFooter from '@/locales/en/footer.json';
import enCart from '@/locales/en/cart.json';
import enProduct from '@/locales/en/product.json';
import enLanding from '@/locales/en/landing.json';
import enCustomerAuth from '@/locales/en/customer-auth.json';
import enAccount from '@/locales/en/account.json';
import enShopLanding from '@/locales/en/shop-landing.json';
import enShopDashboard from '@/locales/en/shop-dashboard.json';

// Thai translations
import thCommon from '@/locales/th/common.json';
import thHeader from '@/locales/th/header.json';
import thFooter from '@/locales/th/footer.json';
import thCart from '@/locales/th/cart.json';
import thProduct from '@/locales/th/product.json';
import thLanding from '@/locales/th/landing.json';
import thCustomerAuth from '@/locales/th/customer-auth.json';
import thAccount from '@/locales/th/account.json';
import thShopLanding from '@/locales/th/shop-landing.json';
import thShopDashboard from '@/locales/th/shop-dashboard.json';

// Chinese translations
import zhCommon from '@/locales/zh/common.json';
import zhHeader from '@/locales/zh/header.json';
import zhFooter from '@/locales/zh/footer.json';
import zhCart from '@/locales/zh/cart.json';
import zhProduct from '@/locales/zh/product.json';
import zhLanding from '@/locales/zh/landing.json';
import zhCustomerAuth from '@/locales/zh/customer-auth.json';
import zhAccount from '@/locales/zh/account.json';
import zhShopLanding from '@/locales/zh/shop-landing.json';
import zhShopDashboard from '@/locales/zh/shop-dashboard.json';

// Vietnamese translations
import viCommon from '@/locales/vi/common.json';
import viHeader from '@/locales/vi/header.json';
import viFooter from '@/locales/vi/footer.json';
import viCart from '@/locales/vi/cart.json';
import viProduct from '@/locales/vi/product.json';
import viLanding from '@/locales/vi/landing.json';
import viCustomerAuth from '@/locales/vi/customer-auth.json';
import viAccount from '@/locales/vi/account.json';
import viShopLanding from '@/locales/vi/shop-landing.json';
import viShopDashboard from '@/locales/vi/shop-dashboard.json';

// Malay translations
import msCommon from '@/locales/ms/common.json';
import msHeader from '@/locales/ms/header.json';
import msFooter from '@/locales/ms/footer.json';
import msCart from '@/locales/ms/cart.json';
import msProduct from '@/locales/ms/product.json';
import msLanding from '@/locales/ms/landing.json';
import msCustomerAuth from '@/locales/ms/customer-auth.json';
import msAccount from '@/locales/ms/account.json';
import msShopLanding from '@/locales/ms/shop-landing.json';
import msShopDashboard from '@/locales/ms/shop-dashboard.json';

export const supportedLanguages = ['en', 'th', 'zh', 'vi', 'ms'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  th: 'ไทย',
  zh: '简体中文',
  vi: 'Tiếng Việt',
  ms: 'Bahasa Melayu',
};

export const languageFlags: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  th: '🇹🇭',
  zh: '🇨🇳',
  vi: '🇻🇳',
  ms: '🇲🇾',
};

const resources = {
  en: {
    common: enCommon,
    header: enHeader,
    footer: enFooter,
    cart: enCart,
    product: enProduct,
    landing: enLanding,
    'customer-auth': enCustomerAuth,
    account: enAccount,
    'shop-landing': enShopLanding,
    'shop-dashboard': enShopDashboard,
  },
  th: {
    common: thCommon,
    header: thHeader,
    footer: thFooter,
    cart: thCart,
    product: thProduct,
    landing: thLanding,
    'customer-auth': thCustomerAuth,
    account: thAccount,
    'shop-landing': thShopLanding,
    'shop-dashboard': thShopDashboard,
  },
  zh: {
    common: zhCommon,
    header: zhHeader,
    footer: zhFooter,
    cart: zhCart,
    product: zhProduct,
    landing: zhLanding,
    'customer-auth': zhCustomerAuth,
    account: zhAccount,
    'shop-landing': zhShopLanding,
    'shop-dashboard': zhShopDashboard,
  },
  vi: {
    common: viCommon,
    header: viHeader,
    footer: viFooter,
    cart: viCart,
    product: viProduct,
    landing: viLanding,
    'customer-auth': viCustomerAuth,
    account: viAccount,
    'shop-landing': viShopLanding,
    'shop-dashboard': viShopDashboard,
  },
  ms: {
    common: msCommon,
    header: msHeader,
    footer: msFooter,
    cart: msCart,
    product: msProduct,
    landing: msLanding,
    'customer-auth': msCustomerAuth,
    account: msAccount,
    'shop-landing': msShopLanding,
    'shop-dashboard': msShopDashboard,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'header', 'footer', 'cart', 'product', 'landing', 'customer-auth', 'account', 'shop-landing', 'shop-dashboard'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
