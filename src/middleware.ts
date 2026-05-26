import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const host = request.headers.get('host');
    const url = request.nextUrl.clone();

    // 🛡️ Extra Safety: If host is missing entirely, skip processing to avoid crashing
    if (!host) {
        return NextResponse.next();
    }

    // Double check with safe optional chaining or standard truthy checks
    if (host && host.startsWith('cubing.')) {
        url.pathname = `/cubing${url.pathname == '/' ? '' : url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

// 🚫 The absolute exclusion pattern for files in the public folder
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - static assets with extensions like .png, .jpg, .jpeg, .gif, .svg
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico)).*)',
    ],
};