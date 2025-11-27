"use client"

import React from "react";
import { User, Mail, Phone, Calendar, Save, X, Loader } from "lucide-react"
import { useMutation, useQuery } from "@apollo/client/react";

// API & Interfaces
import { useToast } from "@/lib/toast";
import { MUTATION_UPDATE_CUSTOMER_INFORMATION, QUERY_CUSTOMER_INFORMATION } from "@/app/api/customer";
import { IUpdateCustomerInformationResponse, IGetCustomerInformationResponse } from "@/app/interface/customer";

// components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CloudinaryResponse {
  secure_url?: string;
}

export default function ProfilePage() {
  const { errorMessage, successMessage } = useToast();

  // Form State
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    dob: "",
    image: "",
    walletAddress: "",
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
  });

  // Loading State
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  // Query customer information
  const { data: customerData, loading: queryLoading } = useQuery<IGetCustomerInformationResponse>(
    QUERY_CUSTOMER_INFORMATION
  );

  // Mutation
  const [updateCustomerInfo] = useMutation<IUpdateCustomerInformationResponse>(
    MUTATION_UPDATE_CUSTOMER_INFORMATION
  );

  // Helper function to format date for input[type="date"]
  const formatDateForInput = (dateString: string | null | undefined): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      // Format as YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  // Load customer data on mount from query
  React.useEffect(() => {
    const customerInfo = customerData?.getCustomerInformation?.data;
    if (customerInfo) {
      setFormData({
        firstName: customerInfo.firstName || "",
        lastName: customerInfo.lastName || "",
        email: customerInfo.email || "",
        phoneNumber: customerInfo.phone_number || "",
        username: customerInfo.username || "",
        dob: formatDateForInput(customerInfo.dob),
        image: customerInfo.image || "",
        walletAddress: customerInfo.payment_method?.code || "",
        bankName: customerInfo.payment_method?.bank_name || "",
        bankAccountName: customerInfo.payment_method?.bank_account_name || "",
        bankAccountNumber: customerInfo.payment_method?.bank_account_number || "",
      });
    }
  }, [customerData]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""
    );

    const response = await fetch(
      process.env.NEXT_PUBLIC_CLOUDINARY_URL || "",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = (await response.json()) as CloudinaryResponse;
    return data.secure_url || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const customerInfo = customerData?.getCustomerInformation?.data;
    let imageUrl = formData.image;

    try {
      // Upload image to Cloudinary if a new image is selected
      if (selectedImage) {
        try {
          imageUrl = await uploadToCloudinary(selectedImage);
          setSelectedImage(null);
        } catch (error) {
          errorMessage({
            message: "Failed to upload image. Try again!",
            duration: 3000,
          });
          setIsLoading(false);
          return;
        }
      }

      const res: any = await updateCustomerInfo({
        variables: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            username: formData.username,
            dob: formData.dob,
            image: imageUrl,
            payment_method:
            {
              id: customerInfo?.payment_method?.id || null,
              code: formData.walletAddress || null,
              bank_name: formData.bankName || null,
              bank_account_name: formData.bankAccountName || null,
              bank_account_number: formData.bankAccountNumber || null,
            },
          },
        },
      });

      if (res?.data?.updateCustomerInformation?.success) {
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

  const handleCancel = () => {
    // Reset to original values
    const customerInfo = customerData?.getCustomerInformation?.data;
    if (customerInfo) {
      setFormData({
        firstName: customerInfo.firstName || "",
        lastName: customerInfo.lastName || "",
        email: customerInfo.email || "",
        phoneNumber: customerInfo.phone_number || "",
        username: customerInfo.username || "",
        dob: formatDateForInput(customerInfo.dob),
        image: customerInfo.image || "",
        walletAddress: customerInfo.payment_method?.code || "",
        bankName: customerInfo.payment_method?.bank_name || "",
        bankAccountName: customerInfo.payment_method?.bank_account_name || "",
        bankAccountNumber: customerInfo.payment_method?.bank_account_number || "",
      });
    }
  };

  if (queryLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 mb-6">
        <Card className="rounded-sm shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Loading your profile information...</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-3xl space-y-6 mb-6">
        <Card className="rounded-sm shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your account details and personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
                    {formData.image ? (
                      <img src={formData.image} alt="Profile" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <User className="h-12 w-12 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <Input
                      id="profile-image"
                      type="file"
                      onChange={handleImageSelect}
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
                      {selectedImage ? `Selected: ${selectedImage.name}` : 'JPG, PNG or GIF. Max size 2MB'}
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name <span className="text-rose-500">*</span></Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name <span className="text-rose-500">*</span></Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
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
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                <div className="space-y-2">
                  <CardTitle>Payment setting</CardTitle>
                  <CardDescription>Update your payment address for refund case.</CardDescription>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wallet_address">Wallet address (USDT)</Label>
                    <Input
                      id="wallet_address"
                      placeholder="Enter wallet address"
                      value={formData.walletAddress}
                      onChange={handleChange("walletAddress")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank_name">Bank Name</Label>
                    <Input
                      id="bank_name"
                      placeholder="Enter bank name"
                      value={formData.bankName}
                      onChange={handleChange("bankName")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank_account_name">Bank Account Name</Label>
                    <Input
                      id="bank_account_name"
                      placeholder="Enter bank account name"
                      value={formData.bankAccountName}
                      onChange={handleChange("bankAccountName")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank_account_number">Bank account number</Label>
                    <Input
                      id="bank_account_number"
                      placeholder="Enter bank account number"
                      value={formData.bankAccountNumber}
                      onChange={handleChange("bankAccountNumber")}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X size={16} />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader size={16} /> : <Save size={16} />}
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
