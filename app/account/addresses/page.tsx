"use client"

import React from "react";
import { MapPin, Plus, Save, X } from "lucide-react"
import { useLazyQuery } from "@apollo/client/react";
import { QUERY_CITIES, QUERY_COUNTRIES, QUERY_STATES } from "@/app/api/address";
import { GetCityResponse, GetCountryResponse, GetStateResponse } from "@/app/interface/address";

// components:
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddressesPage() {
  const [countryId, setCountryId] = React.useState<string>("");
  const [stateId, setStateId] = React.useState<string>("");
  const [cityId, setCityId] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Form fields
  const [address, setAddress] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telephone, setTelephone] = React.useState("");

  // Apollo queries
  const [getCountries, { data: countryData }] = useLazyQuery<GetCountryResponse>(QUERY_COUNTRIES, { fetchPolicy: "no-cache" });
  const [getStates, { data: stateData }] = useLazyQuery<GetStateResponse>(QUERY_STATES, { fetchPolicy: "no-cache" });
  const [getCities, { data: cityData }] = useLazyQuery<GetCityResponse>(QUERY_CITIES, { fetchPolicy: "no-cache" });

  React.useEffect(() => {
    getCountries();
  }, [getCountries]);

  React.useEffect(() => {
    getStates({
      variables: {
        countryId: countryId,
      },
    });
  }, [countryId]);

  React.useEffect(() => {
    getCities({
      variables: {
        countryId: countryId,
        stateId: stateId,
      },
    });
  }, [countryId, stateId]);

  const countries =
    countryData?.getCountries?.data?.map((country) => ({
      label: country.country,
      value: String(country.id), // Ensure value is a string
    })) || [];

  const states =
    stateData?.getStates?.data?.map((state) => ({
      label: state.state,
      value: String(state.id), // Ensure value is a string
    })) || [];

  const cities =
    cityData?.getCities?.data?.map((city) => ({
      label: city.city,
      value: String(city.city), // Ensure value is a string
    })) || [];

  return (
    <>
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Addresses</h1>
            <p className="mt-1 text-sm text-gray-600">Manage your shipping and billing addresses</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setIsModalOpen(true)}>
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
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Address
          </Button>
        </div>
      </div>

      {/* Create Address Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-700">Create new address</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault();
              // TODO: handle submit
              setIsModalOpen(false);
            }}
          >
            <div>
              <Label className="mb-1 block font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter address...."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={countryId}
                  onValueChange={val => {
                    setCountryId(val);
                    setStateId("");
                    setCityId("");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Select country"
                      className={countryId ? "text-black font-semibold" : "text-gray-400"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block font-medium text-gray-700">Province</Label>
                <Select
                  value={stateId}
                  onValueChange={val => {
                    setStateId(val);
                    setCityId("");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Select province"
                      className={stateId ? "text-black font-semibold" : "text-gray-400"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={cityId}
                  onValueChange={val => setCityId(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Select city"
                      className={cityId ? "text-black font-semibold" : "text-gray-400"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block font-medium text-gray-700">
                  Postal code <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  placeholder="Enter postal code...."
                />
              </div>
            </div>
            <div>
              <Label className="mb-1 block font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email...."
              />
            </div>
            <div>
              <Label className="mb-1 block font-medium text-gray-700">
                Telephone <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
                placeholder="Enter telephone...."
              />
            </div>
            <div className="flex justify-end pt-4 gap-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                <X size={14} />
                Close
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                <Save size={14} />
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
