import { NextRequest, NextResponse } from 'next/server';
import { getSession } from "@/lib/session";

// 1. Specify protected and public routes
const protectedRoutes = ['/compte'];

export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // Decrypt the session from the cookie
  const session = await getSession();
  const token = session?.token;

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/connexion', req.nextUrl));
  }

  // Redirect to the home page  if the user is authenticated and tries to login
  if (path === '/connexion' && token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
