"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Chrome, Facebook, Apple, Smartphone } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="w-10 h-10 bg-temu-orange rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-sm">temu</span>
          </div>
          <div className="flex items-center gap-2 text-temu-green text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">All data will be encrypted</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-3">Sign in / Register</h1>
          <div className="flex items-center gap-2 text-temu-green text-sm mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">All data is safeguarded</span>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center text-temu-green">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-temu-green font-bold">Price adjustment</div>
                <div className="text-temu-green text-sm">Within 30 days</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center text-temu-green">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <div>
                <div className="text-temu-green font-bold">Free shipping</div>
                <div className="text-temu-green text-sm">excludes local items</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center text-temu-green">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-temu-green font-bold">Free returns</div>
                <div className="text-temu-green text-sm">Up to 90 days</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center text-temu-green">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-temu-green font-bold">Delivery guarantee</div>
                <div className="text-temu-green text-sm">Refund for any issue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-12">
          {/* Left Side - Email Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Please enter your email address
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange focus:border-transparent"
                />
              </div>
              <Button type="submit" className="w-full h-12" size="lg">
                Continue
              </Button>
            </form>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-px h-full bg-gray-200"></div>
              </div>
              <div className="relative bg-white px-4 text-gray-500 text-sm">OR</div>
            </div>
          </div>

          {/* Right Side - Social Login */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 justify-start gap-3 border-gray-300 hover:bg-gray-50"
            >
              <Chrome className="w-5 h-5" />
              <span>Continue with Google</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 justify-start gap-3 border-gray-300 hover:bg-gray-50"
            >
              <Facebook className="w-5 h-5" />
              <span>Continue with Facebook</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 justify-start gap-3 border-gray-300 hover:bg-gray-50"
            >
              <Apple className="w-5 h-5" />
              <span>Continue with Apple</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 justify-start gap-3 border-gray-300 hover:bg-gray-50"
            >
              <Smartphone className="w-5 h-5" />
              <span>Continue with phone number</span>
            </Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <button className="text-gray-600 hover:text-temu-orange transition-colors text-sm">
            Trouble signing in?
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-600">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-temu-orange hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-temu-orange hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
