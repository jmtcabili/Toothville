import {NextRequest, NextResponse} from 'next/server';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Handle sign-out logic
    if (pathname === '/signout') {
        const response = NextResponse.redirect(new URL('/', request.url)); // Redirect to the sign-in page ('/')
        response.cookies.set('token', '', { path: '/', maxAge: 0 }); // Clear the 'token' cookie
        return response;
    }

    const token = request.cookies.get('token');
    const token_forms = request.cookies.get('token_forms');

    // Routes requiring dentist/secretary authentication
    const dentistRoutes = ['/home', '/dashboard', '/form-qr'];

    // redirect unauthenticated trying to access protected
    const isProtected = dentistRoutes.some((route) => pathname.startsWith(route));
    if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', request.url)); // redirect to sign-in page if not authenticated
    }

    const formRoutes = [
        '/personal-information',
        '/contact-information',
        '/medical-history-1', '/medical-history-2', '/medical-history-3',
        '/concern',
        '/emergency-contact-1', '/emergency-contact-2',
    ];
    const inForms = formRoutes.some((route) => pathname.includes(route));
    if (inForms && !token_forms) {
        return NextResponse.redirect(new URL('/form', request.url)); // redirect to form password page if not authenticated
    }

    return NextResponse.next(); // allow access for authenticated users
}

export const config = {
  matcher: ['/signout', '/home/:path*', '/dashboard/:path*', '/form/:path*'],
};
