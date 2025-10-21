"use client";

import { useEffect, useState } from "react";
import { X, Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Show install banner after 3 seconds
      setTimeout(() => {
        const hasSeenBanner = localStorage.getItem('pwa-install-banner-seen');
        if (!hasSeenBanner) {
          setShowInstallBanner(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully');
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleCloseBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-banner-seen', 'true');
  };

  // Don't show anything if app is already installed
  if (isInstalled || !showInstallBanner) {
    return null;
  }

  return (
    <>
      {/* Mobile Install Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-2 border-temu-orange shadow-2xl animate-slide-up md:hidden">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-temu-orange to-temu-orange-dark rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-black text-2xl">T</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-black text-lg">Install Temu App</h3>
                <p className="text-sm text-gray-600">Shop faster with our mobile app!</p>
              </div>
              <button
                onClick={handleCloseBanner}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Benefits */}
            <div className="flex gap-4 text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-temu-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Offline access</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-temu-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Fast loading</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-temu-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Push deals</span>
              </div>
            </div>

            {/* Install Button */}
            <Button
              onClick={handleInstallClick}
              size="lg"
              className="w-full"
            >
              <Download className="w-5 h-5 mr-2" />
              Install App
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Install Prompt (Top Bar) */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-temu-orange to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Smartphone className="w-6 h-6" />
            <div>
              <span className="font-bold">Install Temu App for a better experience!</span>
              <span className="text-sm text-white/90 ml-2">
                Offline access, faster loading, and push notifications
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleInstallClick}
              variant="outline"
              size="sm"
              className="bg-white text-temu-orange border-white hover:bg-white/90"
            >
              <Download className="w-4 h-4 mr-2" />
              Install
            </Button>
            <button
              onClick={handleCloseBanner}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
