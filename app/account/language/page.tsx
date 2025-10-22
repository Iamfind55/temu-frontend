import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function LanguagePage() {
  return (
    <>
      <div className="border-b bg-white px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Country/Region & Language</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your location and language preferences</p>
      </div>

      <div className="p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Country/Region</CardTitle>
              <CardDescription>Select your country or region for localized content</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="us">
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="us" id="us" />
                  <Label htmlFor="us" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇺🇸</span>
                      <span className="font-medium">United States</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="uk" id="uk" />
                  <Label htmlFor="uk" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇬🇧</span>
                      <span className="font-medium">United Kingdom</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="ca" id="ca" />
                  <Label htmlFor="ca" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇨🇦</span>
                      <span className="font-medium">Canada</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
              <CardDescription>Choose your preferred language</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="en">
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en" className="flex-1 cursor-pointer font-medium">
                    English
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="es" id="es" />
                  <Label htmlFor="es" className="flex-1 cursor-pointer font-medium">
                    Español
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="fr" id="fr" />
                  <Label htmlFor="fr" className="flex-1 cursor-pointer font-medium">
                    Français
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
          </div>
        </div>
      </div>
    </>
  )
}
