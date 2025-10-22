import { Clock, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HistoryPage() {
  return (
    <>
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Browsing history</h1>
            <p className="mt-1 text-sm text-gray-600">View products you've recently browsed</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search history" className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
            <Clock className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">No browsing history</h2>
          <p className="mb-6 text-center text-gray-600">
            Your browsing history is empty.
            <br />
            Start exploring products to see them here!
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600">Start Shopping</Button>
        </div>
      </div>
    </>
  )
}
