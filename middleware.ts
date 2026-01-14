import { withAuth } from "next-auth/middleware"
import { NextResponse, NextRequest } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    
    // Check for token and redirect if not present
    if (!token) {
      return NextResponse.redirect("/login");
    }
    
    // Token is present, continue to next response
    return NextResponse.next();
  },
);

// export const config = { matcher: ["/dashboard", "/admins", "/analytics", "/certificates", "/settings", "/uploads"] };



export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - card (your images folder)
     */
    '/((?!api|_next/static|_next/image|card|favicon.ico).*)',
  ],
};