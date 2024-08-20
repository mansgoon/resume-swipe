import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // if the user is authenticated
  if (token) {
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
      // redirect to home page or user profile
      return NextResponse.redirect(new URL('/', request.url));
    }
    // for logged in users
    if (request.nextUrl.pathname === '/settings') {
      return NextResponse.next();
    }
  } 
  // if user is not authenticated
  else {
    if (request.nextUrl.pathname.startsWith('/user') || request.nextUrl.pathname === '/settings') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/user/:path*', '/settings'],
};