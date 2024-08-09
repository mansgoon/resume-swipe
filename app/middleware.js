import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If the user is authenticated and trying to access the login or register page,
  // redirect them to their profile page
  if (token && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    const username = token.username || token.name;
    if (username) {
      return NextResponse.redirect(new URL(`/user/${username}`, request.url));
    } else {
      // If no username is available, redirect to the settings page
      return NextResponse.redirect(new URL('/settings', request.url));
    }
  }

  // If the user is not authenticated and trying to access a protected route,
  // redirect them to the login page
  if (!token && request.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/user/:path*', '/settings'],
};