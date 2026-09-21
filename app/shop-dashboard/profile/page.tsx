"use client"

import React from "react";
import { useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { User, Mail, Phone, Calendar, Save, X, Loader, Upload } from "lucide-react"

// API & Interfaces
import { useToast } from "@/lib/toast";
import { ShopData } from "@/types/shop";
import { MUTATION_SHOP_UPDATE_INFORMATION1 } from "@/app/api/shop/profile";

// Store
import { useShopStore } from "@/store/shop-store";
import { formatDateForInput } from "@/utils/function";

// components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CloudinaryResponse {
  secure_url?: string;
}

/**
 * The uploadable images on this page. Each name is also the matching key in
 * formData, so one handler can drive all four.
 */
type ImageField = "logo" | "cover" | "idCardFront" | "idCardBack";

export default function ProfilePage() {
  const { t } = useTranslation('shop-dashboard');
  const { errorMessage, successMessage } = useToast();

  // Shop Store from Zustand:
  const { shop, setShop } = useShopStore();
  const [formData, setFormData] = React.useState({
    dob: "",
    logo: "",
    cover: "",
    email: "",
    remark: "",
    fullname: "",
    username: "",
    storeName: "",
    idCardBack: "",
    idCardFront: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  // Files picked but not yet uploaded, keyed by field.
  const [selectedFiles, setSelectedFiles] = React.useState<Partial<Record<ImageField, File>>>({});

  // Mutation
  const [updateShopInfo] = useMutation(MUTATION_SHOP_UPDATE_INFORMATION1);

  React.useEffect(() => {
    if (shop) {
      setFormData({
        fullname: shop.fullname || "",
        username: shop.username || "",
        email: shop.email || "",
        phoneNumber: shop.phone_number || "",
        dob: formatDateForInput(shop.dob),
        storeName: shop.store_name || "",
        remark: shop.remark || "",
        logo: shop.image?.logo || "",
        cover: shop.image?.cover || "",
        idCardFront: shop.id_card_info?.id_card_image_front || "",
        idCardBack: shop.id_card_info?.id_card_image_back || "",
      });
    }
  }, [shop]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageSelect = (field: ImageField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      // Show the local preview immediately; the Cloudinary upload happens on save.
      setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);
    setSelectedFiles((prev) => ({ ...prev, [field]: file }));

    // Clear the input so picking the same file again still fires onChange.
    e.target.value = "";
  };

  /** The value currently saved on the shop, used when discarding a pick. */
  const savedImage = (field: ImageField): string => {
    switch (field) {
      case "logo":
        return shop?.image?.logo || "";
      case "cover":
        return shop?.image?.cover || "";
      case "idCardFront":
        return shop?.id_card_info?.id_card_image_front || "";
      case "idCardBack":
        return shop?.id_card_info?.id_card_image_back || "";
    }
  };

  const handleRemoveImage = (field: ImageField) => {
    setSelectedFiles((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFormData((prev) => ({ ...prev, [field]: savedImage(field) }));
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""
    );

    const response = await fetch(
      process.env.NEXT_PUBLIC_CLOUDINARY_URL || "",
      {
        method: "POST",
        body: formDataUpload,
      }
    );

    const data = (await response.json()) as CloudinaryResponse;
    // Throw rather than return "": a silent empty string would overwrite the
    // existing image with nothing when the save goes through.
    if (!data.secure_url) {
      throw new Error("Cloudinary upload returned no URL");
    }
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Start from what is already saved, so an untouched field keeps its URL
      // rather than being overwritten with the data: preview string.
      const urls: Record<ImageField, string> = {
        logo: savedImage("logo"),
        cover: savedImage("cover"),
        idCardFront: savedImage("idCardFront"),
        idCardBack: savedImage("idCardBack"),
      };

      const pending = Object.entries(selectedFiles) as [ImageField, File][];
      try {
        const uploaded = await Promise.all(
          pending.map(async ([field, file]) => [field, await uploadToCloudinary(file)] as const)
        );
        uploaded.forEach(([field, url]) => {
          urls[field] = url;
        });
      } catch {
        errorMessage({ message: t('uploadFailed'), duration: 3000 });
        setIsLoading(false);
        return;
      }

      const res: any = await updateShopInfo({
        variables: {
          data: {
            fullname: formData.fullname,
            username: formData.username,
            email: formData.email,
            phone_number: formData.phoneNumber,
            dob: formData.dob,
            store_name: formData.storeName,
            remark: formData.remark,
            image: {
              logo: urls.logo,
              cover: urls.cover,
            },
            id_card_info: {
              id_card_image_front: urls.idCardFront,
              id_card_image_back: urls.idCardBack,
            },
          },
        },
      });

      if (res?.data?.updateShopInformation?.success) {
        // Update Zustand store with the latest shop data
        const updatedShopData = res.data.updateShopInformation.data as ShopData;
        setShop(updatedShopData);
        setSelectedFiles({});

        successMessage({
          message: t('profileUpdatedSuccess'),
          duration: 3000,
        });
      } else {
        errorMessage({
          message: t('profileUpdateFailed'),
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: t('unexpectedError'),
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto space-y-6 mb-6 px-1 sm:px-6">
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle>{t('personalInformation')}</CardTitle>
            <CardDescription>{t('updateAccountDetails')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 sm:space-y-8">
                <div className="flex items-center justify-between gap-6">
                  <div className="w-1/2 flex items-center gap-4 sm:gap-6 mb-4">
                    <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-lg sm:rounded-full bg-orange-100 overflow-hidden border-2 border-orange-200 flex-shrink-0">
                      {formData.logo ? (
                        <img src={formData.logo} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-8 w-8 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <Input
                        id="profile-image"
                        type="file"
                        onChange={handleImageSelect("logo")}
                        className="hidden"
                        accept="image/*"
                        disabled={isLoading}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => document.getElementById('profile-image')?.click()}
                        disabled={isLoading}
                      >
                        {t('change')}
                      </Button>
                      <p className="hidden sm:block mt-2 text-xs text-gray-500">
                        {selectedFiles.logo ? t('selectedFile', { filename: selectedFiles.logo.name }) : t('imageFormatInfo')}
                      </p>
                    </div>
                  </div>

                  <div className="w-1/2">
                    <p className="text-sm font-medium text-gray-700 mb-2">{t('shopCoverImage')}</p>
                    {/* The picker stays reachable once a cover exists - clicking
                        the image itself opens it, so the cover can be replaced. */}
                    <label className="block cursor-pointer">
                      {formData.cover ? (
                        <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden group">
                          <img
                            src={formData.cover}
                            alt="Shop Cover"
                            className="w-full h-30 object-cover"
                          />
                          {/* Touch devices never hover, so on mobile the icon sits
                              in the centre permanently; from sm up it becomes a
                              hover overlay with a label. */}
                          <div className="absolute inset-0 flex items-center justify-center transition-opacity sm:bg-black/40 sm:opacity-0 sm:group-hover:opacity-100">
                            <span className="flex items-center gap-1 rounded-full bg-black/55 p-2 text-white text-sm font-medium sm:rounded-none sm:bg-transparent sm:p-0">
                              <Upload className="w-5 h-5 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">{t('change')}</span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                          <Upload className="w-4 h-4 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">{t('clickToUpload')}</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect("cover")}
                        disabled={isLoading}
                      />
                    </label>
                    {selectedFiles.cover && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage("cover")}
                        className="mt-2 text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> {selectedFiles.cover.name}
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">{t('fullName')} <span className="text-rose-500">*</span></Label>
                    <Input
                      id="fullname"
                      placeholder={t('enterFullName')}
                      value={formData.fullname}
                      onChange={handleChange("fullname")}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">{t('username')} <span className="text-rose-500">*</span></Label>
                    <Input
                      id="username"
                      placeholder={t('enterUsername')}
                      value={formData.username}
                      onChange={handleChange("username")}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('emailAddress')} <span className="text-rose-500">*</span></Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange("email")}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('phoneNumber')} <span className="text-rose-500">*</span></Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t('phonePlaceholder')}
                        className="pl-10"
                        value={formData.phoneNumber}
                        onChange={handleChange("phoneNumber")}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">{t('storeName')} <span className="text-rose-500">*</span></Label>
                    <Input
                      id="storeName"
                      placeholder={t('enterStoreName')}
                      value={formData.storeName}
                      onChange={handleChange("storeName")}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthday">{t('birthday')} <span className="text-rose-500">*</span></Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="birthday"
                        type="date"
                        className="pl-10"
                        value={formData.dob}
                        onChange={handleChange("dob")}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remark">{t('remark')}</Label>
                  <Textarea
                    id="remark"
                    placeholder={t('enterRemark')}
                    value={formData.remark}
                    onChange={handleChange("remark")}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <div className="mb-8">
                  <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                    {t('idCard')}
                  </Label>
                  <p className="text-sm text-gray-500 mb-4">
                    {t('idCardReadOnly')}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {([
                      { field: "idCardFront" as ImageField, label: t('frontSide'), alt: "ID Front" },
                      { field: "idCardBack" as ImageField, label: t('backSide'), alt: "ID Back" },
                    ]).map(({ field, label, alt }) => (
                      <div key={field}>
                        <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
                        <label className="block cursor-pointer">
                          {formData[field] ? (
                            <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden group">
                              <img
                                src={formData[field]}
                                alt={alt}
                                className="w-full h-40 object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center transition-opacity sm:bg-black/40 sm:opacity-0 sm:group-hover:opacity-100">
                                <span className="flex items-center gap-1 rounded-full bg-black/55 p-2 text-white text-sm font-medium sm:rounded-none sm:bg-transparent sm:p-0">
                                  <Upload className="w-5 h-5 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">{t('change')}</span>
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-orange-500 hover:bg-orange-50 transition-colors">
                              <Upload className="w-8 h-8 text-gray-300 mb-2" />
                              <span className="text-sm text-gray-500">{t('clickToUpload')}</span>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageSelect(field)}
                            disabled={isLoading}
                          />
                        </label>
                        {selectedFiles[field] && (
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(field)}
                            className="mt-2 text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
                          >
                            <X className="w-3 h-3" /> {selectedFiles[field]?.name}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                  {isLoading ? t('saving') : t('saveChanges')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
