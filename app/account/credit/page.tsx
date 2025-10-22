import { CreditCard, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreditPage() {
  return (
    <>
      <div className="border-b bg-white px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Credit balance</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your account credit and transaction history</p>
      </div>

      <div className="p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Credit</p>
                  <p className="mt-2 text-4xl font-bold text-gray-900">$0.00</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
              </div>
              <Button className="mt-6 bg-orange-500 hover:bg-orange-600">Add Credit</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all your credit transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <TrendingUp className="mb-4 h-12 w-12 text-gray-400" />
                <p className="text-gray-600">No transactions yet</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
