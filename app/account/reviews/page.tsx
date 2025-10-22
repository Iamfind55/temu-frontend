import { Star, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ReviewsPage() {
  return (
    <>
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your reviews</h1>
            <p className="mt-1 text-sm text-gray-600">Manage and view all your product reviews</p>
          </div>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search your reviews" className="pl-10" />
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
            <Star className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">No reviews yet</h2>
          <p className="mb-6 text-center text-gray-600">
            You haven't reviewed any products yet.
            <br />
            Start shopping and share your experience!
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600">Browse Products</Button>
        </div>
      </div>
    </>
  )
}
