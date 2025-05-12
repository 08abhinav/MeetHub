import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If user is authenticated and trying to access the login page
  if (pathname === '/user-auth' && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user is NOT authenticated and trying to access protected routes (like home)
  if (!token && pathname === '/') {
    return NextResponse.redirect(new URL('/user-auth', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/user-auth'], 
};