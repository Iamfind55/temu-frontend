"use client"

import { useEffect, useRef } from "react"

export function PWAInstallPrompt() {
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.log("Service Worker registration failed:", error)
      })
    }

    // Suppress Chrome's automatic install banner. The site stays installable
    // via the browser menu ("Install app") — we just don't proactively prompt.
    const suppressInstallPrompt = (e: Event) => {
      e.preventDefault()
    }
    window.addEventListener("beforeinstallprompt", suppressInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", suppressInstallPrompt)
    }
  }, [])

  return null
}
