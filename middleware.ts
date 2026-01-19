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




export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admins/:path*",
    "/analytics/:path*",
    "/certificates/:path*",
    "/settings/:path*",
    "/uploads/:path*",
  ],
};
