import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        // Match all paths except:
        // - starts with /_next (Next.js internals)
        // - starts with /api (API routes)
        // - static files like favicon.ico, .css, .js, etc.
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:css|js|png|jpg|jpeg|svg|webp|ico)).*)",
    ],
};


export default async function middleware(request: NextRequest) {

    const NO_AUTH_ROUTES = [
        "/login",
        "/register"
    ];

    const { pathname } = request.nextUrl;

    const session = request.cookies.get("session")?.value

    if (NO_AUTH_ROUTES.includes(pathname)) {
        if (session) {
            request.nextUrl.pathname = "/messages";
            return NextResponse.redirect(request.nextUrl)
        }
    }
    else {
        if (!session) {
            request.nextUrl.pathname = "/login"
            return NextResponse.redirect(request.nextUrl)
        }
    }

    return NextResponse.next()

}