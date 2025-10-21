import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { TrustBadges } from "@/components/TrustBadges";
import { LightningDeals } from "@/components/LightningDeals";
import { PromoBanners } from "@/components/PromoBanners";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { QuickNav } from "@/components/QuickNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroBanner />
      <TrustBadges />
      <LightningDeals />
      <PromoBanners />
      <ProductGrid />
      <Footer />
      <QuickNav />
    </div>
  );
}
