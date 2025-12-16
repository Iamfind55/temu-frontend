"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/lib/toast"
import { uploadToCloudinary } from "@/lib/cloudinary-upload"
import { ChevronDown, ChevronUp, Info, Upload, X, CheckCircle, Clock, Loader } from "lucide-react"

// components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useMutation } from "@apollo/client/react"
import { businessTypes, faqItems, steps } from "./constants"
import { MUTATION_SHOP_UPDATE_INFORMATION } from "@/app/api/shop/auth"

export default function ApplicationPage() {
   const { successMessage, errorMessage } = useToast()
   const [updateShopInfo] = useMutation(MUTATION_SHOP_UPDATE_INFORMATION)

   const [remark, setRemark] = useState("")
   const [fullName, setFullName] = useState("")
   const [username, setUsername] = useState("")
   const [storeName, setStoreName] = useState("")
   const [currentStep, setCurrentStep] = useState(1)
   const [dateOfBirth, setDateOfBirth] = useState("")
   const [phoneNumber, setPhoneNumber] = useState("")
   const [businessType, setBusinessType] = useState("")
   const [idFrontImage, setIdFrontImage] = useState<File | null>(null)
   const [idBackImage, setIdBackImage] = useState<File | null>(null)
   const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null)
   const [idBackPreview, setIdBackPreview] = useState<string | null>(null)

   const [isSubmitting, setIsSubmitting] = useState(false)
   const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

   const handleNext = () => {
      if (currentStep < 3) {
         setCurrentStep(currentStep + 1)
      }
   }

   const handleBack = () => {
      if (currentStep > 1) {
         setCurrentStep(currentStep - 1)
      }
   }

   const handleImageUpload = (type: "front" | "back", file: File) => {
      const reader = new FileReader()
      reader.onloadend = () => {
         if (type === "front") {
            setIdFrontImage(file)
            setIdFrontPreview(reader.result as string)
         } else {
            setIdBackImage(file)
            setIdBackPreview(reader.result as string)
         }
      }
      reader.readAsDataURL(file)
   }

   const handleRemoveImage = (type: "front" | "back") => {
      if (type === "front") {
         setIdFrontImage(null)
         setIdFrontPreview(null)
      } else {
         setIdBackImage(null)
         setIdBackPreview(null)
      }
   }

   const handleSubmit = async () => {
      if (!idFrontImage || !idBackImage) {
         errorMessage({ message: "Please upload both front and back ID card images" })
         return
      }

      setIsSubmitting(true)

      try {
         // Upload ID card images to Cloudinary
         const [frontUpload, backUpload] = await Promise.all([
            uploadToCloudinary(idFrontImage, "id-cards"),
            uploadToCloudinary(idBackImage, "id-cards"),
         ])

         if (!frontUpload.success || !backUpload.success) {
            errorMessage({ message: "Failed to upload ID card images. Please try again." })
            setIsSubmitting(false)
            return
         }

         // Call mutation to update shop information (Apollo client handles auth via cookie)
         const response = await updateShopInfo({
            variables: {
               data: {
                  fullname: fullName,
                  username: username,
                  store_name: storeName,
                  phone_number: phoneNumber,
                  dob: dateOfBirth,
                  remark: remark || "",
                  id_card_info: {
                     id_card_image_front: frontUpload.url,
                     id_card_image_back: backUpload.url,
                  },
               },
            },
         })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const result = response.data as any
         if (result?.updateShopInformation?.success) {
            successMessage({ message: "Application submitted successfully!" })
            setCurrentStep(3)
         } else {
            const error = result?.updateShopInformation?.error
            errorMessage({ message: error?.message || "Failed to submit application. Please try again." })
         }
      } catch (error) {
         console.error("Application submission error:", error)
         errorMessage({ message: "An error occurred. Please try again." })
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-6">
               <div className="flex items-center justify-center gap-4 md:gap-8">
                  {steps.map((step, index) => (
                     <div key={step.number} className="flex items-center">
                        <div className="flex items-center gap-2">
                           <div
                              className={cn(
                                 "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                                 currentStep >= step.number
                                    ? "bg-orange-500 text-white"
                                    : "bg-gray-200 text-gray-500"
                              )}
                           >
                              {currentStep > step.number ? (
                                 <CheckCircle className="w-5 h-5" />
                              ) : (
                                 step.number
                              )}
                           </div>
                           <span
                              className={cn(
                                 "text-sm font-medium hidden sm:inline",
                                 currentStep >= step.number ? "text-gray-900" : "text-gray-500"
                              )}
                           >
                              {step.label}
                           </span>
                        </div>
                        {index < steps.length - 1 && (
                           <div
                              className={cn(
                                 "w-16 md:w-32 h-0.5 mx-2 md:mx-4",
                                 currentStep > step.number ? "bg-orange-500" : "bg-gray-200"
                              )}
                           />
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
               <div className="flex-1">
                  {currentStep === 1 && (
                     <div className="bg-white rounded-lg p-4 md:p-8 shadow-sm">
                        <h1 className="text-md sm:text-xl font-bold text-gray-900 mb-2">Business information</h1>
                        <p className="text-gray-600 mb-8">Welcome! Let us know about your business.</p>
                        <div className="mb-8">
                           <Label className="text-sm font-semibold text-gray-900 mb-1 block">
                              Business type
                           </Label>
                           <p className="text-sm text-gray-500 mb-3 flex items-start gap-1">
                              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>
                                 You can check on some related documents to select the appropriate business type.
                                 Please note that you can only select "Corporation" if the company name ends with
                                 INC, Corp or corporation and if it is a limited liability company, you cannot
                                 select "Individual".{" "}
                                 <Link href="#" className="text-orange-500 hover:underline">
                                    See example &gt;
                                 </Link>
                              </span>
                           </p>

                           <div className="space-y-3">
                              {businessTypes.map((type) => (
                                 <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setBusinessType(type.id)}
                                    className={cn(
                                       "w-full p-4 border rounded-lg text-left transition-colors",
                                       businessType === type.id
                                          ? "border-orange-500 bg-orange-50"
                                          : "border-gray-200 hover:border-gray-300"
                                    )}
                                 >
                                    <div className="flex items-start gap-3">
                                       <div
                                          className={cn(
                                             "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0",
                                             businessType === type.id
                                                ? "border-orange-500"
                                                : "border-gray-300"
                                          )}
                                       >
                                          {businessType === type.id && (
                                             <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                                          )}
                                       </div>
                                       <div>
                                          <p className="font-semibold text-gray-900">{type.name}</p>
                                          <p className="text-sm text-gray-500">{type.description}</p>
                                       </div>
                                    </div>
                                 </button>
                              ))}
                           </div>
                        </div>

                        <div className="flex justify-center">
                           <Button
                              onClick={handleNext}
                              disabled={!businessType}
                              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-16 py-4 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                              Next
                           </Button>
                        </div>
                     </div>
                  )}

                  {currentStep === 2 && (
                     <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                        <h1 className="text-md sm:text-2xl font-bold text-gray-900 mb-2">Seller information</h1>
                        <p className="text-gray-600 mb-8">Please provide your personal details.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 Full name <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 type="text"
                                 value={fullName}
                                 onChange={(e) => setFullName(e.target.value)}
                                 placeholder="Enter your full name"
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                           </div>

                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 Username <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 type="text"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 placeholder="Enter your username"
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                           </div>

                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 Store name <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 type="text"
                                 value={storeName}
                                 onChange={(e) => setStoreName(e.target.value)}
                                 placeholder="Enter your store name"
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                           </div>
                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 Phone number <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 type="tel"
                                 value={phoneNumber}
                                 onChange={(e) => setPhoneNumber(e.target.value)}
                                 placeholder="Enter your phone number"
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                           </div>

                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 Date of birth <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 type="date"
                                 value={dateOfBirth}
                                 onChange={(e) => setDateOfBirth(e.target.value)}
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                           </div>
                        </div>
                        <div className="mb-8">
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              Remark
                           </Label>
                           <textarea
                              value={remark}
                              onChange={(e) => setRemark(e.target.value)}
                              placeholder="Any additional information (optional)"
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                           />
                        </div>
                        <div className="mb-8">
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              ID Card <span className="text-red-500">*</span>
                           </Label>
                           <p className="text-sm text-gray-500 mb-4">
                              Please upload clear photos of your ID card (front and back).
                           </p>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                 <p className="text-sm font-medium text-gray-700 mb-2">Front side</p>
                                 {idFrontPreview ? (
                                    <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
                                       <img
                                          src={idFrontPreview}
                                          alt="ID Front"
                                          className="w-full h-40 object-cover"
                                       />
                                       <button
                                          type="button"
                                          onClick={() => handleRemoveImage("front")}
                                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                       >
                                          <X className="w-4 h-4" />
                                       </button>
                                    </div>
                                 ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                                       <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                       <span className="text-sm text-gray-500">Click to upload</span>
                                       <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => {
                                             const file = e.target.files?.[0]
                                             if (file) handleImageUpload("front", file)
                                          }}
                                       />
                                    </label>
                                 )}
                              </div>

                              {/* Back Side */}
                              <div>
                                 <p className="text-sm font-medium text-gray-700 mb-2">Back side</p>
                                 {idBackPreview ? (
                                    <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
                                       <img
                                          src={idBackPreview}
                                          alt="ID Back"
                                          className="w-full h-40 object-cover"
                                       />
                                       <button
                                          type="button"
                                          onClick={() => handleRemoveImage("back")}
                                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                       >
                                          <X className="w-4 h-4" />
                                       </button>
                                    </div>
                                 ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                                       <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                       <span className="text-sm text-gray-500">Click to upload</span>
                                       <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => {
                                             const file = e.target.files?.[0]
                                             if (file) handleImageUpload("back", file)
                                          }}
                                       />
                                    </label>
                                 )}
                              </div>
                           </div>
                        </div>

                        <div className="flex justify-center gap-2 sm:gap-4">
                           <Button
                              onClick={handleBack}
                              variant="outline"
                              disabled={isSubmitting}
                              className="px-12 py-4 rounded-lg text-md"
                           >
                              Back
                           </Button>
                           <Button
                              onClick={handleSubmit}
                              disabled={!fullName || !username || !storeName || !phoneNumber || !dateOfBirth || !idFrontImage || !idBackImage || isSubmitting}
                              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-4 rounded-lg text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                              {isSubmitting ? (
                                 <>
                                    <Loader className="h-5 w-5 animate-spin" />
                                    Submitting...
                                 </>
                              ) : (
                                 "Submit"
                              )}
                           </Button>
                        </div>
                     </div>
                  )}


                  {currentStep === 3 && (
                     <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm text-center">
                        <div className="flex justify-center mb-6">
                           <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                              <Clock className="w-8 h-8 text-orange-500" />
                           </div>
                        </div>

                        <h1 className="text-md md:text-xl font-bold text-gray-900 mb-4">
                           Application Submitted Successfully!
                        </h1>
                        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                           Thank you for applying to become a Temu seller. Your application is currently
                           under review by our team. We'll notify you via email once it's approved.
                        </p>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
                           <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                                 <Clock className="w-5 h-5 text-white" />
                              </div>
                              <div className="text-left">
                                 <p className="font-semibold text-gray-900">Review in Progress</p>
                                 <p className="text-sm text-gray-500">Usually takes 1-2 business days</p>
                              </div>
                           </div>
                           <div className="w-full bg-orange-200 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full w-1/3 animate-pulse" />
                           </div>
                        </div>

                        <div className="space-y-4 text-left max-w-md mx-auto mb-8">
                           <h3 className="font-semibold text-gray-900">What happens next?</h3>
                           <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                 1
                              </div>
                              <p className="text-sm text-gray-600">
                                 Our team will review your application and verify your documents.
                              </p>
                           </div>
                           <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                 2
                              </div>
                              <p className="text-sm text-gray-600">
                                 You'll receive an email notification about your application status.
                              </p>
                           </div>
                           <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                 3
                              </div>
                              <p className="text-sm text-gray-600">
                                 Once approved, you can start setting up your shop and listing products!
                              </p>
                           </div>
                        </div>

                        <Link href="/shop-landing">
                           <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-5 rounded-lg text-sm transition-colors">
                              Back to Home
                           </Button>
                        </Link>
                     </div>
                  )}
               </div>

               {currentStep !== 3 && (
                  <div className="lg:w-80 flex-shrink-0">
                     <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                        <div className="flex items-center justify-between mb-4">
                           <h2 className="font-bold text-gray-900">FAQ</h2>
                           <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                              </svg>
                           </button>
                        </div>

                        <div className="space-y-2">
                           {faqItems.map((item, index) => (
                              <div key={index} className="border-b border-gray-100 last:border-0">
                                 <button
                                    type="button"
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    className="w-full py-3 flex items-center justify-between text-left"
                                 >
                                    <span className="text-sm font-medium text-gray-900 pr-2">
                                       {item.question}
                                    </span>
                                    {expandedFaq === index ? (
                                       <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    ) : (
                                       <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    )}
                                 </button>
                                 {expandedFaq === index && (
                                    <p className="text-sm text-gray-500 pb-3">{item.answer}</p>
                                 )}
                              </div>
                           ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                           <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center">
                                 <span className="text-white text-xs font-bold">T</span>
                              </div>
                              <div>
                                 <p className="text-sm font-semibold text-gray-900">Temu</p>
                                 <p className="text-xs text-gray-500">Seller service</p>
                              </div>
                           </div>
                           <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 text-right mb-2">9:36 am</p>
                              <div className="bg-white rounded-lg p-3 shadow-sm">
                                 <p className="text-sm text-gray-700">
                                    Welcome to the Temu seller registration process! Need help completing
                                    this step? Talk to a real person in seconds.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
