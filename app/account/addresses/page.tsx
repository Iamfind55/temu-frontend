import { MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AddressesPage() {
  return (
    <>
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Addresses</h1>
            <p className="mt-1 text-sm text-gray-600">Manage your shipping and billing addresses</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
            <MapPin className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">No saved addresses</h2>
          <p className="mb-6 text-center text-gray-600">
            You haven't added any addresses yet.
            <br />
            Add an address to make checkout faster!
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Address
          </Button>
        </div>
      </div>
    </>
  )
}
