import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(0.15_0_0)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div>
            <h3 className="font-semibold mb-4">Company info</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  About ShopHub
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  ShopHub – Shop Like a Billionaire
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Affiliate & Influencer Program: Join to Earn
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Contact us
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  ShopHub's Tree Planting Program
                </a>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-semibold mb-4">Customer service</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Return and refund policy
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Intellectual property policy
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Shipping info
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Your Recalls and Product Safety Alerts
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Report suspicious activity
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  Support center & FAQ
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  ShopHub purchase protection
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  How to order
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="#" className="hover:text-white">
                  How to track
                </a>
              </li>
            </ul>
          </div>

          {/* App download */}
          <div className="space-y-8">
            <div
              className="flex items-center gap-4 border-2 border-white/50 px-8 py-2 rounded-md bg-cover bg-center bg-no-repeat hover:border-white/80 cursor-pointer"
              style={{
                backgroundImage:
                  "url('https://commimg.kwcdn.com/upload_commimg/support/4c86e9a0-1dee-4013-b53c-4b224cf595f8.png')",
              }}
            >
              <div>
                <h3 className="font-semibold mb-2">Start Selling to Millions of Buyers on ShopHub</h3>
                <Button
                  size="sm"
                  className="text-xs font-bold rounded-full bg-orange-400"
                >
                  <span>Start a Selling Account</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Download the Temu</h3>

              <ul className="space-y-2 text-sm text-white/80 mb-4">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Price-drop alerts
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Track orders any time
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Faster & more secure checkout
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Low stock items alerts
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Exclusive offers
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Coupons & offers alerts
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start justify-start">
              <h4 className="font-semibold mb-3 text-center">Connect with Temu</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Logo and social */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start flex-col justify-center gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600 font-bold">
                <span className="text-sm">Temu</span>
              </div>
              <div className="flex flex-wrap items-start justify-center gap-4 flex-col">
                <span className="text-sm text-white font-bold">Security certification</span>
                <div className="flex flex-wrap gap-3">
                  {["Visa", "Mastercard", "Amex", "Discover"].map((method) => (
                    <div key={method} className="bg-white rounded px-3 py-1 text-xs font-semibold text-foreground">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-start justify-center gap-4 flex-col">
              <span className="text-sm text-white font-bold">We accept</span>
              <div className="flex flex-wrap gap-3">
                {["Visa", "Mastercard", "Amex", "Discover", "PayPal", "Apple Pay", "Google Pay"].map((method) => (
                  <div key={method} className="bg-white rounded px-3 py-1 text-xs font-semibold text-foreground">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mt-8 border-t border-white/20 pt-8">
            <div className="text-center text-sm text-white/60">
              © 2022 – 2025 ShopHub Inc. ·{" "}
              <a href="#" className="hover:text-white">
                Terms of use
              </a>{" "}
              ·{" "}
              <a href="#" className="hover:text-white">
                Privacy policy
              </a>{" "}
              ·{" "}
              <a href="#" className="hover:text-white">
                Consumer health data privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
