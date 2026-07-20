import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("accessToken")?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isSignupPage = request.nextUrl.pathname === "/signup";
  const isRootPage = request.nextUrl.pathname === "/";
  const isAuthPage = isLoginPage || isSignupPage;

  // 로그인하지 않은 사용자의 접근 제어
  if (!cookie && !isAuthPage && !isRootPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 이미 로그인된 사용자가 로그인 페이지나 회원가입 페이지에 접근하지 못하도록 막기
  if (cookie && isAuthPage) {
    return NextResponse.redirect(new URL("/mydashboard", request.url));
  }

  return NextResponse.next();
}

// 정적 파일이나 API 요청에서는 Proxy가 불필요하게 실행되지 않도록 설정
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
