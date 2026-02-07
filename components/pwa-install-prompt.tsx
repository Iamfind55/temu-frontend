"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { X, Download, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

// Track if prompt was already shown in this session (persists across page navigations)
const SESSION_KEY = "pwa-prompt-shown-session"

function hasShownThisSession(): boolean {
  if (typeof window === "undefined") return true
  return sessionStorage.getItem(SESSION_KEY) === "true"
}

function markShownThisSession(): void {
  if (typeof window === "undefined") return
  sessionStorage.setItem(SESSION_KEY, "true")
}

export function PWAInstallPrompt() {
  const { t } = useTranslation("common")
  const [isOpen, setIsOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Prevent running multiple times due to React strict mode or re-renders
    if (hasInitialized.current) return
    hasInitialized.current = true

    // Check if already installed (standalone mode)
    const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches
      || (window.navigator as any).standalone === true
    setIsStandalone(isInStandaloneMode)

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // Check if already shown this session
    if (hasShownThisSession()) {
      return
    }

    // Check if prompt was dismissed before (user clicked "Later")
    const dismissedAt = localStorage.getItem("pwa-prompt-dismissed")
    if (dismissedAt) {
      const dismissedDate = new Date(dismissedAt)
      const now = new Date()
      const daysSinceDismissed = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
      // Don't show again for 7 days
      if (daysSinceDismissed < 7) {
        return
      }
    }

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.log("Service Worker registration failed:", error)
      })
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after a short delay (only if not already shown)
      setTimeout(() => {
        if (!isInStandaloneMode && !hasShownThisSession()) {
          markShownThisSession()
          setIsOpen(true)
        }
      }, 2000)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // For iOS, show prompt after delay since there's no beforeinstallprompt event
    if (isIOSDevice && !isInStandaloneMode && !hasShownThisSession()) {
      setTimeout(() => {
        markShownThisSession()
        setIsOpen(true)
      }, 2000)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setDeferredPrompt(null)
      }
      setIsOpen(false)
    }
  }

  const handleDismiss = () => {
    setIsOpen(false)
    localStorage.setItem("pwa-prompt-dismissed", new Date().toISOString())
  }

  // Don't render if already installed
  if (isStandalone) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-orange-500" />
              {t("installTamuApp")}
            </DialogTitle>
            <button
              onClick={handleDismiss}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
              <img
                src="/logo/icon.png"
                alt="Tamu"
                className="h-12 w-12 object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t("tamuShopping")}</h3>
              <p className="text-sm text-gray-500">{t("shopLikeBillionaire")}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-900">{t("whyInstallApp")}</p>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                {t("fasterBrowsing")}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                {t("worksOffline")}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                {t("easyAccess")}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                {t("getNotifications")}
              </li>
            </ul>
          </div>

          {isIOS ? (
            <div className="rounded-lg bg-gray-50 p-4 space-y-2">
              <p className="text-sm font-medium text-gray-900">{t("howToInstallIos")}</p>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. {t("tapShare")}</li>
                <li>2. {t("scrollAddHome")}</li>
                <li>3. {t("tapAddConfirm")}</li>
              </ol>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleDismiss}
                variant="outline"
                className="flex-1"
              >
                {t("maybeLater")}
              </Button>
              <Button
                onClick={handleInstall}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                {t("installNow")}
              </Button>
            </div>
          )}

          {isIOS && (
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="w-full"
            >
              {t("gotIt")}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
