import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart-drawer"
import { ToastContainer } from "react-toastify"
import { ApolloWrapper } from "@/lib/apollo-provider"
import { ReduxProvider } from "@/lib/redux-provider"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { I18nProvider } from "@/lib/i18n-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Tamu - Shop Like a Billionaire",
  description: "Discover amazing deals on millions of products",
  generator: 'v0.app',
  manifest: '/manifest.json',
  themeColor: '#f97316',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Tamu',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Tamu',
    title: 'Tamu - Shop Like a Billionaire',
    description: 'Discover amazing deals on millions of products',
  },
  icons: {
    icon: '/logo/icon.png',
    apple: '/logo/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ReduxProvider>
          <I18nProvider>
            <ApolloWrapper>
              <AuthProvider>
                <CartProvider>
                  {children}
                  <CartDrawer />
                  <PWAInstallPrompt />
                </CartProvider>
              </AuthProvider>

              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </ApolloWrapper>
          </I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
