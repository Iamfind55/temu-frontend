import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Get separate tokens for customer and shop
  const customerAuthToken = request.cookies.get("auth_token")?.value
  const shopAuthToken = request.cookies.get("shop_auth_token")?.value

  // Define protected routes for customers
  const isCustomerProtectedRoute = path.startsWith("/account") || path.startsWith("/customer")

  // Define protected routes for shops
  const isShopProtectedRoute = path.startsWith("/shop-dashboard")

  // Define public customer auth routes (should redirect to account if already logged in)
  const isCustomerAuthRoute =
    path.startsWith("/login") ||
    path.startsWith("/register") ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/verify-otp") ||
    path.startsWith("/reset-password")

  // If customer is not authenticated and trying to access customer protected route
  if (isCustomerProtectedRoute && !customerAuthToken) {
    const loginUrl = new URL("/login", request.url)
    // Add redirect parameter to return to original page after login
    loginUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(loginUrl)
  }

  // If customer is authenticated and trying to access customer auth routes, redirect to account
  if (isCustomerAuthRoute && customerAuthToken) {
    return NextResponse.redirect(new URL("/account/orders", request.url))
  }

  // If shop is not authenticated and trying to access shop dashboard
  if (isShopProtectedRoute && !shopAuthToken) {
    return NextResponse.redirect(new URL("/shop-landing", request.url))
  }

  return NextResponse.next()
}

// Configure which routes should trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}