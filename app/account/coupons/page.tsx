import { Ticket, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CouponsPage() {
  return (
    <>
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Coupons & offers</h1>
            <p className="mt-1 text-sm text-gray-600">View and manage your available coupons</p>
          </div>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search coupons" className="pl-10" />
          </div>
        </div>
      </div>

      <div className="p-8">
        <Tabs defaultValue="available" className="w-full">
          <TabsList>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="used">Used</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="mt-6">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-orange-100">
                <Ticket className="h-16 w-16 text-orange-500" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900">No coupons available</h2>
              <p className="mb-6 text-center text-gray-600">
                You don't have any coupons at the moment.
                <br />
                Check back later for exclusive offers!
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600">Browse Deals</Button>
            </div>
          </TabsContent>
          <TabsContent value="used" className="mt-6">
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-gray-600">No used coupons</p>
            </div>
          </TabsContent>
          <TabsContent value="expired" className="mt-6">
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-gray-600">No expired coupons</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
