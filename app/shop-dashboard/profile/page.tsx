"use client"

import React from "react";
import { useMutation } from "@apollo/client/react";
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

export default function ProfilePage() {
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
  const [selectedLogo, setSelectedLogo] = React.useState<File | null>(null);
  const [selectedCover, setSelectedCover] = React.useState<File | null>(null);

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

  const handleImageSelect = (type: "logo" | "cover") => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === "logo") {
          setSelectedLogo(file);
          setFormData((prev) => ({ ...prev, logo: result }));
        } else {
          setSelectedCover(file);
          setFormData((prev) => ({ ...prev, cover: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (type: "logo" | "cover") => {
    if (type === "logo") {
      setSelectedLogo(null);
      setFormData((prev) => ({ ...prev, logo: shop?.image?.logo || "" }));
    } else {
      setSelectedCover(null);
      setFormData((prev) => ({ ...prev, cover: shop?.image?.cover || "" }));
    }
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
    return data.secure_url || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let logoUrl = formData.logo;
      let coverUrl = formData.cover;

      // Upload images if new ones are selected
      if (selectedLogo) {
        logoUrl = await uploadToCloudinary(selectedLogo);
        setSelectedLogo(null);
      }
      if (selectedCover) {
        coverUrl = await uploadToCloudinary(selectedCover);
        setSelectedCover(null);
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
              logo: logoUrl,
              cover: coverUrl,
            },
          },
        },
      });

      if (res?.data?.updateShopInformation?.success) {
        // Update Zustand store with the latest shop data
        const updatedShopData = res.data.updateShopInformation.data as ShopData;
        setShop(updatedShopData);

        successMessage({
          message: "Profile updated successfully!",
          duration: 3000,
        });
      } else {
        errorMessage({
          message: "Failed to update profile. Try again later!",
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected error. Try again later!",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto space-y-6 mb-6 px-6">
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your account details and personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-6">
                  <div className="w-1/2 flex items-center gap-6 mb-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 overflow-hidden">
                      {formData.logo ? (
                        <img src={formData.logo} alt="Profile" className="h-full w-full rounded-full object-cover" />
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
                        Change Photo
                      </Button>
                      <p className="mt-2 text-xs text-gray-500">
                        {selectedLogo ? `Selected: ${selectedLogo.name}` : 'JPG, PNG or GIF. Max size 2MB'}
                      </p>
                    </div>
                  </div>

                  <div className="w-1/2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Shop cover image</p>
                    {formData.cover ? (
                      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={formData.cover}
                          alt="Shop Cover"
                          className="w-full h-30 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage("cover")}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                        <Upload className="w-4 h-4 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Click to upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageSelect("cover")}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name <span className="text-rose-500">*</span></Label>
                    <Input
                      id="fullname"
                      placeholder="Enter full name"
                      value={formData.fullname}
                      onChange={handleChange("fullname")}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username <span className="text-rose-500">*</span></Label>
                    <Input
                      id="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange("username")}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-rose-500">*</span></Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange("email")}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number <span className="text-rose-500">*</span></Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
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
                    <Label htmlFor="storeName">Store Name <span className="text-rose-500">*</span></Label>
                    <Input
                      id="storeName"
                      placeholder="Enter store name"
                      value={formData.storeName}
                      onChange={handleChange("storeName")}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthday">Birthday <span className="text-rose-500">*</span></Label>
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
                  <Label htmlFor="remark">Remark</Label>
                  <Textarea
                    id="remark"
                    placeholder="Enter remark"
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
                    ID Card
                  </Label>
                  <p className="text-sm text-gray-500 mb-4">
                    Your verified ID card images (read-only).
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Front side</p>
                      {formData.idCardFront ? (
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={formData.idCardFront}
                            alt="ID Front"
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-lg bg-gray-50">
                          <User className="w-8 h-8 text-gray-300 mb-2" />
                          <span className="text-sm text-gray-400">No image</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Back side</p>
                      {formData.idCardBack ? (
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={formData.idCardBack}
                            alt="ID Back"
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-lg bg-gray-50">
                          <User className="w-8 h-8 text-gray-300 mb-2" />
                          <span className="text-sm text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
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
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
