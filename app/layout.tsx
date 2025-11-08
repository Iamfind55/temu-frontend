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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Temu - Shop Like a Billionaire",
  description: "Discover amazing deals on millions of products",
  generator: 'v0.app'
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
          <ApolloWrapper>
            <AuthProvider>
              <CartProvider>
                {children}
                <CartDrawer />
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
        </ReduxProvider>
      </body>
    </html>
  )
}
