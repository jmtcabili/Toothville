import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Handle sign-out logic
  if (pathname === '/signout') {
    const response = NextResponse.redirect(new URL('/', request.url)); // Redirect to the sign-in page ('/')
    response.cookies.set('token', '', { path: '/', maxAge: 0 }); // Clear the 'token' cookie
    return response;
  }

  // Protect other routes
  const token = request.cookies.get('token');
  if (!token && pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect unauthenticated users
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/signout', '/home/:path*', '/dashboard/:path*', '/form/:path*'],
};
