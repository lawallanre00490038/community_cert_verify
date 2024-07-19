// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

// export default withAuth(
//   function middleware(req) {
//     if (!req.nextauth.token) {
//       return NextResponse.redirect("/login")
//     }
//     console.log(req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         if (token?.email === "teju@datasciencenigeria.ai") {
//           return true
//         }
//         return false
//       },
//     },
//   },
// )

// export const config = { matcher: ["/dashboard", "/admins", "/analytics", "/certificates", "/settings", "/uploads"] }






import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get('currentUser')?.value
 
  // if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
  //   console.log('Redirecting to dashboard')
  //   return Response.redirect(new URL('/dashboard', request.url))
  // }
 
  // if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
  //   console.log('Redirecting to login')
  //   return Response.redirect(new URL('/login', request.url))
  // }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}