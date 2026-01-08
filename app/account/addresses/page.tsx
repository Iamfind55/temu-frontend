"use client"

import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MapPin, Plus, Save, X, MoreVertical, Edit2, Trash2, CheckCircle, Loader, Loader2 } from "lucide-react"

import { useToast } from "@/lib/toast";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GetCityResponse, GetCountryResponse, GetCustomerAddressesResponse, GetStateResponse } from "@/app/interface/address";
import { MUTATION_CREATE_CUSTOMER_ADDRESS, MUTATION_DELETE_CUSTOMER_ADDRESS, MUTATION_SET_DEFAULT_ADDRESS, MUTATION_UPDATE_CUSTOMER_ADDRESS, QUERY_CITIES, QUERY_COUNTRIES, QUERY_CUSTOMER_ADDRESS, QUERY_STATES } from "@/app/api/address";

// components:
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddressesPage() {
  const { t } = useTranslation('account');
  const { errorMessage, successMessage } = useToast();
  const [cityId, setCityId] = React.useState<string>("");
  const [cityName, setCityName] = React.useState<string>("");
  const [stateId, setStateId] = React.useState<string>("");
  const [stateName, setStateName] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [countryId, setCountryId] = React.useState<string>("");
  const [countryName, setCountryName] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState<string>("");
  const [editingAddressId, setEditingAddressId] = React.useState<string>("");
  const [isSettingDefault, setIsSettingDefault] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { customer } = useSelector((state: any) => state.customerAuth);

  // Form fields
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");

  // Apollo queries
  const [getAddresses, { data: addressesData, loading: addressesLoading, refetch }] =
    useLazyQuery<GetCustomerAddressesResponse>(QUERY_CUSTOMER_ADDRESS, {
      fetchPolicy: "no-cache",
    });

  const [getCities, { data: cityData }] = useLazyQuery<GetCityResponse>(QUERY_CITIES, { fetchPolicy: "no-cache" });
  const [getStates, { data: stateData }] = useLazyQuery<GetStateResponse>(QUERY_STATES, { fetchPolicy: "no-cache" });
  const [getCountries, { data: countryData }] = useLazyQuery<GetCountryResponse>(QUERY_COUNTRIES, { fetchPolicy: "no-cache" });

  const [createAddress] = useMutation(MUTATION_CREATE_CUSTOMER_ADDRESS);
  const [updateAddress] = useMutation(MUTATION_UPDATE_CUSTOMER_ADDRESS);
  const [deleteAddress] = useMutation(MUTATION_DELETE_CUSTOMER_ADDRESS);
  const [setDefaultAddress] = useMutation(MUTATION_SET_DEFAULT_ADDRESS);

  React.useEffect(() => {
    getAddresses({
      variables: {
        where: { status: "ACTIVE", customer_id: customer.id },
      },
    });
  }, [getAddresses]);

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

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu-dropdown')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleEdit = async (row: any) => {
    setEditingAddressId(row.id);
    setAddress(row.address);
    setPostalCode(row.postal_code);
    setEmail(row.email);
    setTelephone(row.phone_number);

    // Set country
    setCountryName(row.country.country);
    const country = countries.find(c => c.label === row.country.country);
    if (country) {
      setCountryId(country.value);
    }

    // Set state
    setStateName(row?.state?.state ?? "");
    if (row?.state?.state) {
      const state = states.find(s => s.label === row.state.state);
      if (state) {
        setStateId(state.value);
      }
    }

    // Set city - since city value is the city name itself, set it directly
    setCityName(row.city.city);
    setCityId(row.city.city); // City value is the city name, not an ID

    setIsUpdate(true);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleSetDefaultAddress = async (id: string) => {
    setIsSettingDefault(true);
    try {
      const res: any = await setDefaultAddress({
        variables: {
          setCustomerAddressDefaultToUseId: id,
        },
      });

      if (res?.data?.setCustomerAddressDefaultToUse?.success) {
        await refetch();
        successMessage({
          message: t('defaultAddressSuccess'),
          duration: 3000,
        });
      } else {
        errorMessage({
          message: t('defaultAddressFailed'),
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: t('defaultAddressFailed'),
        duration: 3000,
      });
    } finally {
      setIsSettingDefault(false);
      setOpenMenuId(null);
    }
  };

  const handleDeleteAddress = async () => {
    setIsDeleting(true);
    try {
      const res: any = await deleteAddress({
        variables: {
          deleteCustomerAddressId: deleteTargetId,
        },
      });

      if (res?.data?.deleteCustomerAddress?.success) {
        await refetch();
        successMessage({
          message: t('deleteAddressSuccess'),
          duration: 3000,
        });
        setIsDeleteModalOpen(false);
        setDeleteTargetId("");
      } else {
        errorMessage({
          message: t('deleteAddressFailed'),
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: t('deleteAddressFailed'),
        duration: 3000,
      });
    } finally {
      setIsDeleting(false);
      setOpenMenuId(null);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    if (!countryName && !cityName) {
      errorMessage({
        message: t('selectCountryOrCity'),
        duration: 3000,
      });
    }
    try {
      if (isUpdate) {
        const res: any = await updateAddress({
          variables: {
            data: {
              id: editingAddressId,
              country: {
                country: countryName,
              },
              state: {
                state: stateName,
              },
              city: {
                city: cityName,
              },
              address: address,
              postal_code: postalCode,
              email: email,
              phone_number: telephone,
            },
          },
        });

        if (res?.data?.updateCustomerAddress?.success) {
          await refetch();
          successMessage({
            message: t('updateAddressSuccess'),
            duration: 3000,
          });
        } else {
          errorMessage({
            message: t('updateAddressFailed'),
            duration: 3000,
          });
          setIsLoading(false);
          return;
        }
      } else {
        const res: any = await createAddress({
          variables: {
            data: {
              country: {
                country: countryName,
              },
              state: {
                state: stateName,
              },
              city: {
                city: cityName,
              },
              address: address,
              postal_code: postalCode,
              email: email,
              phone_number: telephone,
            },
          },
        });

        if (res?.data?.createCustomerAddress?.success) {
          await refetch();
          successMessage({
            message: t('createAddressSuccess'),
            duration: 3000,
          });
        } else {
          errorMessage({
            message: t('createAddressFailed'),
            duration: 3000,
          });
          setIsLoading(false);
          return;
        }
      }
    } catch (error) {
      errorMessage({
        message: t('unexpectedError'),
        duration: 3000,
      });
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setIsUpdate(false);
      setEditingAddressId("");
      setAddress("");
      setPostalCode("");
      setEmail("");
      setTelephone("");
      setCountryId("");
      setCountryName("");
      setStateId("");
      setStateName("");
      setCityId("");
      setCityName("");
    }
  };



  return (
    <>
      <div className="bg-white px-0 sm:px-8 py-2 sm:py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{t('addresses')}</h1>
            <p className="hidden sm:block mt-1 text-sm text-gray-600">{t('manageAddresses')}</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => {
            setIsUpdate(false);
            setEditingAddressId("");
            setIsModalOpen(true);
          }}>
            <Plus className="h-4 w-4" />
            {t('addNew')}
          </Button>
        </div>
      </div>

      {addressesLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="h-8 w-8 animate-spin text-orange-500 mb-4" />
          <p className="text-gray-600">{t('loadingAddresses')}</p>
        </div>
      ) : addressesData?.getCustomerAddresses?.data.length ?? 0 > 0 ?
        <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 pb-16 px-0 sm:px-8">
          {addressesData?.getCustomerAddresses?.data?.map((row) => (
            <div
              key={row.id}
              className={`relative border rounded ${row.is_used && "bg-orange-100 border-orange-400"
                } p-4 pr-10 flex flex-col gap-1 text-gray-400`}
            >
              <div className="absolute top-3 right-3 menu-dropdown">
                <button
                  onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                  className="p-1 bg-orange-500 text-white rounded-full cursor-pointer"
                >
                  <MoreVertical size={18} />
                </button>
                {openMenuId === row.id && (
                  <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleSetDefaultAddress(row.id)}
                      disabled={isSettingDefault}
                      className="w-full text-sm flex items-center justify-start gap-2 text-gray-700 hover:bg-gray-100 py-2 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle size={16} />
                      {isSettingDefault ? t('setting') : t('setAsDefault')}
                    </button>
                    <button
                      onClick={() => handleEdit(row)}
                      disabled={isSettingDefault}
                      className="w-full text-sm flex items-center justify-start gap-2 text-gray-700 hover:bg-gray-100 py-2 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Edit2 size={16} />
                      {t('edit')}
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTargetId(row.id);
                        setIsDeleteModalOpen(true);
                        setOpenMenuId(null);
                      }}
                      disabled={isSettingDefault}
                      className="w-full text-sm flex items-center justify-start gap-2 text-red-600 hover:bg-red-50 py-2 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={16} />
                      {t('delete')}
                    </button>
                  </div>
                )}
              </div>
              {/* Address Details */}
              <p className="text-xs text-gray-500 flex items-start justify-start gap-1">
                {t('address')}:&nbsp;
                <strong className="text-black font-bold">
                  {row.address}
                </strong>
              </p>
              <p className="text-xs text-gray-500">
                {t('postalCode')}:&nbsp;
                <strong className="text-black font-bold">
                  {row.postal_code}
                </strong>
              </p>
              <p className="text-xs text-gray-500">
                {t('province')}:&nbsp;
                <strong className="text-black font-bold">
                  {row.city.city}
                </strong>
              </p>
              <p className="text-xs text-gray-500">
                {t('states')}:&nbsp;
                <strong className="text-black font-bold">
                  {row?.state?.state ?? ""}
                </strong>
              </p>
              <p className="text-xs text-gray-500">
                {t('country')}:&nbsp;
                <strong className="text-black font-bold">
                  {row.country.country}
                </strong>
              </p>
              <p className="text-xs text-black mt-2">
                {t('contactPerson')}
              </p>
              <p className="text-xs text-gray-500">
                {t('telephone')}:&nbsp;
                <strong className="text-black font-bold">
                  {row.phone_number}
                </strong>
              </p>
              <p className="text-xs text-gray-500">
                {t('email')}:&nbsp;
                <strong className="text-black font-bold">{row.email}</strong>
              </p>
            </div>
          ))}
        </div>
        :
        <div className="p-8 pb-16">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">{t('noSavedAddresses')}</h2>
            <p className="mb-6 text-center text-gray-600">
              {t('noAddressesDescription')}
              <br />
              {t('addAddressCheckout')}
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => {
              setIsUpdate(false);
              setEditingAddressId("");
              setIsModalOpen(true);
            }}>
              <Plus className=" h-4 w-4" />
              {t('addFirstAddress')}
            </Button>
          </div>
        </div>
      }

      {/* Create/Edit Address Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => {
        setIsModalOpen(open);
        if (!open) {
          // Reset form when modal closes
          setIsUpdate(false);
          setEditingAddressId("");
          setAddress("");
          setPostalCode("");
          setEmail("");
          setTelephone("");
          setCountryId("");
          setCountryName("");
          setStateId("");
          setStateName("");
          setCityId("");
          setCityName("");
        }
      }}>
        <DialogContent className="w-sm sm:w-4xl max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-700">
              {isUpdate ? t('editAddress') : t('createNewAddress')}
            </DialogTitle>
          </DialogHeader>
          <form
            className="space-y-6"
            onSubmit={handleSubmitForm}
          >
            <div>
              <Label className="mb-1 block font-medium text-gray-700">
                {t('address')} <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder={t('enterAddress')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block font-medium text-gray-700">
                  {t('country')} <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={countryId}
                  onValueChange={val => {
                    setCountryId(val);
                    setCountryName(countries.find(c => c.value === val)?.label || "");
                    setStateId("");
                    setCityId("");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={t('selectCountry')}
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
                <Label className="mb-1 block font-medium text-gray-700">{t('province')}</Label>
                <Select
                  value={stateId}
                  onValueChange={val => {
                    setStateId(val);
                    setStateName(states.find(s => s.value === val)?.label || "");
                    setCityId("");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={t('selectProvince')}
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
                  {t('city')} <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={cityId}
                  onValueChange={val => {
                    setCityId(val)
                    setCityName(cities.find(c => c.value === val)?.label || "")
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={t('selectCity')}
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
                  {t('postalCode')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  placeholder={t('enterPostalCode')}
                />
              </div>
            </div>
            <div>
              <Label className="mb-1 block font-medium text-gray-700">
                {t('email')} <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('enterEmail')}
              />
            </div>
            <div>
              <Label className="mb-1 block font-medium text-gray-700">
                {t('telephone')} <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
                placeholder={t('enterTelephone')}
              />
            </div>
            <div className="flex justify-end pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                <X size={14} />
                {t('close')}
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
                disabled={isLoading}
              >
                {isLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                {isLoading ? t('saving') : t('save')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="w-sm sm:w-md max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-700">{t('deleteAddress')}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">
              {t('deleteAddressConfirm')}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteTargetId("");
              }}
              disabled={isDeleting}
            >
              {t('cancel')}
            </Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDeleteAddress}
              disabled={isDeleting}
            >
              {isLoading ? <Loader size={14} className="animate-spin" /> : ""}
              {isDeleting ? t('deleting') : t('delete')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
