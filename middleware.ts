import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authToken = request.cookies.get("auth_token")?.value

  // Define protected routes that require authentication
  const isProtectedRoute = path.startsWith("/account") || path.startsWith("/customer")

  // Define public auth routes (should redirect to account if already logged in)
  const isAuthRoute =
    path.startsWith("/login") ||
    path.startsWith("/register") ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/verify-otp") ||
    path.startsWith("/reset-password")

  // If user is not authenticated and trying to access protected route
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/login", request.url)
    // Add redirect parameter to return to original page after login
    loginUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and trying to access auth routes, redirect to account
  if (isAuthRoute && authToken) {
    return NextResponse.redirect(new URL("/account/orders", request.url))
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