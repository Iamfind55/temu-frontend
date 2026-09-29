"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useToast } from "@/lib/toast"
import { useTranslation } from "react-i18next"
import { uploadToCloudinary } from "@/lib/cloudinary-upload"
import { ChevronDown, ChevronUp, Info, Upload, X, CheckCircle, Clock, Loader } from "lucide-react"

// components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useMutation } from "@apollo/client/react"
import { businessTypes, faqItems, steps } from "./constants"
import { MUTATION_SHOP_UPDATE_INFORMATION } from "@/app/api/shop/auth"
import { useShopStore } from "@/store/shop-store"

export default function ApplicationPage() {
   const router = useRouter()
   const { t } = useTranslation('shop-landing')
   const { successMessage, errorMessage } = useToast()
   const [updateShopInfo] = useMutation(MUTATION_SHOP_UPDATE_INFORMATION)
   const { shop, setShop } = useShopStore()

   const [remark, setRemark] = useState("")
   const [fullName, setFullName] = useState("")
   const [username, setUsername] = useState("")
   const [storeName, setStoreName] = useState("")
   const [currentStep, setCurrentStep] = useState(1)

   // Check shop status on load and redirect accordingly
   useEffect(() => {
      if (shop?.status === "ACTIVE") {
         // ACTIVE users should go to dashboard
         router.replace("/shop-dashboard")
      } else if (shop?.status === "APPROVED") {
         // APPROVED users see step 3 (under review)
         setCurrentStep(3)
      }
   }, [shop?.status, router])

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
         errorMessage({ message: t('uploadBothIdImages') })
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
            errorMessage({ message: t('uploadFailed') })
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
            // Update shop data in store with new status and submitted data
            if (shop) {
               setShop({
                  ...shop,
                  status: "APPROVED",
                  fullname: fullName,
                  username: username,
                  store_name: storeName,
                  phone_number: phoneNumber,
                  dob: dateOfBirth,
                  remark: remark || "",
                  id_card_info: {
                     id_card_image_front: frontUpload.url || "",
                     id_card_image_back: backUpload.url || "",
                  },
               })
            }
            successMessage({ message: t('applicationSubmitted') })
            setCurrentStep(3)
         } else {
            const error = result?.updateShopInformation?.error
            errorMessage({ message: error?.message || t('applicationFailed') })
         }
      } catch (error) {
         console.error("Application submission error:", error)
         errorMessage({ message: t('applicationError') })
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
                              {t(step.labelKey)}
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
                        <h1 className="text-md sm:text-xl font-bold text-gray-900 mb-2">{t('businessInformation')}</h1>
                        <p className="text-gray-600 mb-8">{t('welcomeBusinessInfo')}</p>
                        <div className="mb-8">
                           <Label className="text-sm font-semibold text-gray-900 mb-1 block">
                              {t('businessType')}
                           </Label>
                           <p className="text-sm text-gray-500 mb-3 flex items-start gap-1">
                              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>
                                 {t('businessTypeHint')}{" "}
                                 <Link href="#" className="text-orange-500 hover:underline">
                                    {t('seeExample')}
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
                                          <p className="font-semibold text-gray-900">{t(type.nameKey)}</p>
                                          <p className="text-sm text-gray-500">{t(type.descriptionKey)}</p>
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
                              {t('next')}
                           </Button>
                        </div>
                     </div>
                  )}

                  {currentStep === 2 && (
                     <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                        <h1 className="text-md sm:text-2xl font-bold text-gray-900 mb-2">{t('sellerInformation')}</h1>
                        <p className="text-gray-600 mb-8">{t('providePersonalDetails')}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 {t('fullName')} <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 type="text"
                                 value={fullName}
                                 onChange={(e) => setFullName(e.target.value)}
                                 placeholder={t('enterFullName')}
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                           </div>

                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 {t('username')} <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 type="text"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 placeholder={t('enterUsername')}
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                           </div>

                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 {t('storeName')} <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 type="text"
                                 value={storeName}
                                 onChange={(e) => setStoreName(e.target.value)}
                                 placeholder={t('enterStoreName')}
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                           </div>
                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 {t('phoneNumber')} <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 type="tel"
                                 value={phoneNumber}
                                 onChange={(e) => setPhoneNumber(e.target.value)}
                                 placeholder={t('enterPhoneNumber')}
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                           </div>

                           <div>
                              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                                 {t('dateOfBirth')} <span className="text-red-500">*</span>
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
                              {t('remark')}
                           </Label>
                           <textarea
                              value={remark}
                              onChange={(e) => setRemark(e.target.value)}
                              placeholder={t('remarkPlaceholder')}
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                           />
                        </div>
                        <div className="mb-8">
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              {t('idCard')} <span className="text-red-500">*</span>
                           </Label>
                           <p className="text-sm text-gray-500 mb-4">
                              {t('idCardHint')}
                           </p>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                 <p className="text-sm font-medium text-gray-700 mb-2">{t('frontSide')}</p>
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
                                       <span className="text-sm text-gray-500">{t('clickToUpload')}</span>
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
                                 <p className="text-sm font-medium text-gray-700 mb-2">{t('backSide')}</p>
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
                                       <span className="text-sm text-gray-500">{t('clickToUpload')}</span>
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
                              {t('back')}
                           </Button>
                           <Button
                              onClick={handleSubmit}
                              disabled={!fullName || !username || !storeName || !phoneNumber || !dateOfBirth || !idFrontImage || !idBackImage || isSubmitting}
                              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-4 rounded-lg text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                              {isSubmitting ? (
                                 <>
                                    <Loader className="h-5 w-5 animate-spin" />
                                    {t('submitting')}
                                 </>
                              ) : (
                                 t('submit')
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
                           {t('applicationSubmittedTitle')}
                        </h1>
                        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                           {t('applicationSubmittedDesc')}
                        </p>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
                           <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                                 <Clock className="w-5 h-5 text-white" />
                              </div>
                              <div className="text-left">
                                 <p className="font-semibold text-gray-900">{t('reviewInProgress')}</p>
                                 <p className="text-sm text-gray-500">{t('reviewTime')}</p>
                              </div>
                           </div>
                           <div className="w-full bg-orange-200 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full w-1/3 animate-pulse" />
                           </div>
                        </div>

                        <div className="space-y-4 text-left max-w-md mx-auto mb-8">
                           <h3 className="font-semibold text-gray-900">{t('whatHappensNext')}</h3>
                           <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                 1
                              </div>
                              <p className="text-sm text-gray-600">
                                 {t('nextStep1')}
                              </p>
                           </div>
                           <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                 2
                              </div>
                              <p className="text-sm text-gray-600">
                                 {t('nextStep2')}
                              </p>
                           </div>
                           <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                 3
                              </div>
                              <p className="text-sm text-gray-600">
                                 {t('nextStep3')}
                              </p>
                           </div>
                        </div>

                        <Link href="/shop-landing">
                           <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-5 rounded-lg text-sm transition-colors">
                              {t('backToHome')}
                           </Button>
                        </Link>
                     </div>
                  )}
               </div>

               {currentStep !== 3 && (
                  <div className="lg:w-80 flex-shrink-0">
                     <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                        <div className="flex items-center justify-between mb-4">
                           <h2 className="font-bold text-gray-900">{t('faqTitle')}</h2>
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
                                       {t(item.questionKey)}
                                    </span>
                                    {expandedFaq === index ? (
                                       <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    ) : (
                                       <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    )}
                                 </button>
                                 {expandedFaq === index && (
                                    <p className="text-sm text-gray-500 pb-3">{t(item.answerKey)}</p>
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
                                 <p className="text-xs text-gray-500">{t('sellerService')}</p>
                              </div>
                           </div>
                           <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 text-right mb-2">9:36 am</p>
                              <div className="bg-white rounded-lg p-3 shadow-sm">
                                 <p className="text-sm text-gray-700">
                                    {t('welcomeMessage')}
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
