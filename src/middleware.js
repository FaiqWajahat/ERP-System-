import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  // 1. Get the token from the cookie
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // 2. Define protected routes (Add more here if needed)
  // This matches /Dashboard and any sub-routes like /Dashboard/settings
  const isProtectedRoute = pathname.startsWith("/Dashboard");
  
  // 3. Define public routes (Login page is "/")
  const isPublicRoute = pathname === "/";

  // Case 1: Attempting to access protected route without a token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Case 2: Verify token if it exists
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      // If token is valid and user is on the Login page, redirect to Dashboard
      if (isPublicRoute) {
        return NextResponse.redirect(new URL("/Dashboard", request.url));
      }

    } catch (error) {
      console.error("Middleware: Invalid token", error);
      // Token is invalid or expired
      if (isProtectedRoute) {
        const response = NextResponse.redirect(new URL("/", request.url));
        // Optional: clear the cookie if it's bad
        response.cookies.delete("auth_token");
        return response;
      }
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configuration to prevent middleware from running on static files/images
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder images (add specific extensions if needed)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};