"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import { supportedLanguages, languageNames, languageFlags, type SupportedLanguage } from "@/lib/i18n"

export function LanguageSelector({ className }: { className?: string }) {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = i18n.language as SupportedLanguage

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className={cn("hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-red-700 cursor-pointer hover:text-white", className)}>
        <Globe className="h-6 sm:h-4 w-6 sm:w-4" />
        <span className="text-sm font-medium">{languageNames[currentLanguage] || languageNames.en}</span>
      </button>
      <Globe className="block sm:hidden h-5 w-5" />
      {
        isOpen && (
          <div className="absolute right-0 top-full mt-0 w-72 rounded-lg bg-white shadow-xl z-50">
            <div className="p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Language</h3>
              <div className="space-y-1">
                {supportedLanguages.map((langCode) => (
                  <button
                    key={langCode}
                    onClick={() => handleLanguageChange(langCode)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-muted cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-border">
                        {currentLanguage === langCode && <div className="h-3 w-3 rounded-full bg-primary" />}
                      </div>
                      <span className="text-sm text-foreground">{languageNames[langCode]}</span>
                    </div>
                    <span className="text-lg">{languageFlags[langCode]}</span>
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
