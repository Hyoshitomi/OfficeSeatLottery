import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("middleware is running!", req.nextUrl.pathname);
    
    // 認証されていない場合、/loginにリダイレクト
    if (!req.nextauth.token) {
      const loginUrl = new URL("/login", req.url);
      const response = NextResponse.redirect(loginUrl);
      response.headers.set('x-middleware-cache', 'no-cache');
      return response;
    }
    // 認証済みの場合はそのまま
    const response = NextResponse.next();
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }
);

// パブリックパスを除外するmatcher
export const config = {
  matcher: [
    "/((?!login|api/auth|_next/image|favicon.ico).*)",
  ],
};
