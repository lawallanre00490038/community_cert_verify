import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token) {
      return NextResponse.redirect("/login")
    }
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token?.email === "teju@datasciencenigeria.ai") {
          return true
        }
        return false
      },
    },
  },
)

export const config = { matcher: ["/dashboard", "/admins", "/analytics", "/certificates", "/settings", "/uploads"] }