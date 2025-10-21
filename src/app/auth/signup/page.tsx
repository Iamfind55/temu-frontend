"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Chrome, Facebook, Apple, Smartphone } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link href="/" className="w-10 h-10 bg-temu-orange rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-sm">temu</span>
          </Link>
          <div className="flex items-center gap-2 text-temu-green text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">All data will be encrypted</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-3">Create Account</h1>
          <div className="flex items-center gap-2 text-temu-green text-sm mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Join millions of happy shoppers</span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange focus:border-transparent"
            />
            <p className="text-xs text-gray-600 mt-1">Must be at least 8 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange focus:border-transparent"
            />
          </div>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-temu-orange focus:ring-temu-orange"
            />
            <span className="text-sm text-gray-700">
              I agree to receive promotional emails and updates from Temu
            </span>
          </label>

          <Button type="submit" className="w-full h-12" size="lg">
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        {/* Social Sign Up */}
        <div className="space-y-3 mb-6">
          <Button
            variant="outline"
            className="w-full h-12 justify-center gap-3 border-gray-300 hover:bg-gray-50"
          >
            <Chrome className="w-5 h-5" />
            <span>Continue with Google</span>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 justify-center gap-3 border-gray-300 hover:bg-gray-50"
          >
            <Facebook className="w-5 h-5" />
            <span>Continue with Facebook</span>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 justify-center gap-3 border-gray-300 hover:bg-gray-50"
          >
            <Apple className="w-5 h-5" />
            <span>Continue with Apple</span>
          </Button>
        </div>

        {/* Sign In Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/auth/signin" className="text-temu-orange hover:underline font-medium">
            Sign in
          </Link>
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
