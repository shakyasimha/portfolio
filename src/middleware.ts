import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const host = request.headers.get('host');
    const url = request.nextUrl.clone();

    if(host.startsWith('cubing.')) {
        url.pathname = `/cubing${url.pathname == '/' ? '' : url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}