// Cloudinary Upload Utility

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL || ""
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""

interface UploadResult {
   success: boolean
   url?: string
   error?: string
}

interface CloudinaryResponse {
   secure_url?: string
   error?: {
      message: string
   }
}

/**
 * Upload a file to Cloudinary
 */
export async function uploadToCloudinary(
   file: File,
   folder: string = "id-cards"
): Promise<UploadResult> {
   if (!CLOUDINARY_URL || !UPLOAD_PRESET) {
      console.error("Cloudinary configuration missing")
      return {
         success: false,
         error: "Cloudinary configuration missing",
      }
   }

   try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", UPLOAD_PRESET)
      formData.append("folder", folder)

      const response = await fetch(CLOUDINARY_URL, {
         method: "POST",
         body: formData,
      })

      const data = (await response.json()) as CloudinaryResponse

      if (data.secure_url) {
         return {
            success: true,
            url: data.secure_url,
         }
      } else {
         return {
            success: false,
            error: data.error?.message || "Upload failed",
         }
      }
   } catch (error) {
      console.error("Cloudinary upload error:", error)
      return {
         success: false,
         error: error instanceof Error ? error.message : "Upload failed",
      }
   }
}

/**
 * Upload multiple files to Cloudinary
 */
export async function uploadMultipleToCloudinary(
   files: File[],
   folder: string = "id-cards"
): Promise<UploadResult[]> {
   const results = await Promise.all(
      files.map((file) => uploadToCloudinary(file, folder))
   )
   return results
}
