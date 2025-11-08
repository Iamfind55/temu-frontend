"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { Loader, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useMutation } from "@apollo/client/react"

import { useToast } from "@/lib/toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"

// API and TYPES:
import { MUTATION_CUSTOMER_LOGIN } from "@/app/api/auth"
import { signIn } from "@/app/redux/slice/customerAuthSlice"
import { ICustomerLoginCredentials, ICustomerLoginResponse } from "@/app/interface/customer"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { successMessage, errorMessage } = useToast()
  const [customerLogin] = useMutation<ICustomerLoginResponse>(MUTATION_CUSTOMER_LOGIN)
  const [loginData, setLoginData] = useState<ICustomerLoginCredentials>({
    username: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form fields
    if (!loginData.username) {
      errorMessage({ message: "Email is required!", duration: 2000 })
      setIsLoading(false)
      return
    }

    if (!loginData.password) {
      errorMessage({ message: "Password is required!", duration: 2000 })
      setIsLoading(false)
      return
    }

    try {
      const { data } = await customerLogin({
        variables: {
          where: {
            username: loginData.username,
            password: loginData.password,
          },
        },
      })

      if (data?.customerLogin?.success && data.customerLogin.data) {
        const res = data.customerLogin.data

        dispatch(
          signIn({
            id: res.data.id,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            username: res.data.username,
            email: res.data.email,
            phone_number: res.data.phone_number,
            dob: res.data.dob,
            image: res.data.image,
            status: res.data.status,
            created_at: res.data.created_at,
          })
        )

        document.cookie = `auth_token=${res.token}; path=/; max-age=3600`

        successMessage({
          message: "Login successful!",
          duration: 3000,
        })

        router.push("/account/orders")
      } else {
        errorMessage({
          message: data?.customerLogin?.error?.message || "Login failed",
          duration: 3000,
        })
      }
    } catch (error) {
      errorMessage({
        message: "An unexpected error occurred during login.",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white">
        <div className="container mx-auto flex items-center gap-2 px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-400 font-bold text-white">
              <span className="text-xs">Temu</span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm text-green-600">
            <Lock className="h-4 w-4" />
            <span>All data will be encrypted</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-1 sm:px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold">Sign in</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-green-700">
              <Lock className="h-4 w-4" />
              <span className="font-bold">All data is safeguarded</span>
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 bg-green-50 rounded-md">
              <div className="flex items-center gap-3 rounded-lg p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-sm">
                  <div className="text-lg font-semibold text-green-700">Price adjustment</div>
                  <div className="text-green-700">Within 30 days</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                  <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-sm">
                  <div className="text-lg font-semibold text-green-700">Free shipping</div>
                  <div className="text-green-700">excludes local items</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                  <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="9 22 9 12 15 12 15 22"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-sm">
                  <div className="text-lg font-semibold text-green-700">Free returns</div>
                  <div className="text-green-700">Up to 90 days</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                  <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 11l3 3L22 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-sm">
                  <div className="text-lg font-semibold text-green-700">Delivery guarantee</div>
                  <div className="text-green-700">Refund for any issue</div>
                </div>
              </div>
            </div>
          </div>

          {/* Login forms */}
          <div className="w-full flex items-center justify-center p-2 sm:p-3">
            <div className="w-full sm:w-1/2 rounded-lg border bg-white p-4 sm:p-8">
              <h2 className="mb-6 text-md font-semibold">Sign in with a previously used account</h2>

              <div className="mb-6 flex flex-col items-center">
                <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <svg
                    className="h-10 w-10 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="7" r="4" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              <form onSubmit={handleSubmitForm}>
                <div className="mb-4">
                  <label htmlFor="username" className="text-sm font-medium">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    id="username"
                    name="username"
                    className="h-12 mt-2"
                    placeholder="Please enter your email"
                    value={loginData.username}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    required
                    name="password"
                    type="password"
                    className="h-12 mt-2"
                    placeholder="Please enter your password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mb-3 h-12 w-full bg-orange-500 text-sm font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <button type="button" className="hover:text-foreground">
                    Remove account
                  </button>
                  <span>|</span>
                  <button type="button" className="hover:text-foreground">
                    Trouble signing in?
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            By signing in or continuing, you agree to our{" "}
            <Link href="#" className="text-blue-600 font-bold hover:underline cursor-pointer">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-600 font-bold hover:underline cursor-pointer">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <SiteFooter />
      </div>
    </div>
  )
}
