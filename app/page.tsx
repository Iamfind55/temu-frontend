import { SiteHeader } from "@/components/site-header"
import { HeroBanner } from "@/components/hero-banner"
import { TrustBar } from "@/components/trust-bar"
import { ProductGrid } from "@/components/product-grid"
import { SiteFooter } from "@/components/site-footer"
import { LightningDeals } from "@/components/lightning-deals"

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="space-y-6">
        <HeroBanner />
        <TrustBar />
        <LightningDeals />
        <ProductGrid />
      </main>
      <SiteFooter />
    </div>
  )
}
