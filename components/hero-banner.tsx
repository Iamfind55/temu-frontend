import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('/images/banner-bg.gif')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent z-0" />

      <div className="container relative z-10 mx-auto px-4 py-4">
        <div className="flex items-center justify-around gap-8">
          <div className="h-50 w-120">
            <img src="/images/banner-bg02.png" alt="" />
          </div>

          <div className="hidden lg:flex gap-4 relative z-20">
            <Card className="overflow-hidden bg-white p-0 w-48 shadow-lg space-y-1 h-auto">
              <div className="aspect-square bg-muted rounded-lg">
                <img
                  src="/eagle-hoodie.jpg"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-xl font-bold text-center -mt-4">$14.20</p>
            </Card>
            <Card className="overflow-hidden bg-white p-0 w-48 shadow-lg">
              <div className="aspect-square bg-muted rounded-lg">
                <img
                  src="/classic-dress-shoes.png"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-xl font-bold text-center -mt-4">$24.72</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
