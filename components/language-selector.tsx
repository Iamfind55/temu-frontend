"use client"

import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import { useState } from "react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "zh", name: "简体中文", flag: "🇨🇳" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
]

export function LanguageSelector({ className }: { className?: string }) {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage)

  console.log("AAPPKK::", className);

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className={cn("flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-red-700 cursor-pointer hover:text-white", className)}>
        <Globe className="h-6 sm:h-4 w-6 sm:w-4" />
        <span className="hidden sm:block text-sm font-medium">{currentLanguage?.name}</span>
      </button>
      {
        isOpen && (
          <div className="absolute right-0 top-full mt-0 w-72 rounded-lg bg-white shadow-xl">
            <div className="p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Language</h3>
              <div className="space-y-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-muted cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-border">
                        {selectedLanguage === language.code && <div className="h-3 w-3 rounded-full bg-primary" />}
                      </div>
                      <span className="text-sm text-foreground">{language.name}</span>
                    </div>
                    <span className="text-lg">{language.flag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}
