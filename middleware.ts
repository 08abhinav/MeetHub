import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith('/user-auth');
  const protectedRoutes = ['/', '/dashboard', '/meeting']
  const isProtectedRoute = protectedRoutes.some(route=> pathname.startsWith(route))

  // If the user is authenticated and trying to access the login page
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', req.url));  
  }

  // If the user is NOT authenticated and trying to access protected routes (like the home page)
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/user-auth', req.url));  
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/user-auth', '/dashboard/:path*', '/meeting/:path*'],
};
