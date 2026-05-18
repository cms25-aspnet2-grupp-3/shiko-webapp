export { auth as proxy } from "./auth";

export const config = {
  matcher: [
    "/",
    "/signin",
    "/dashboard/:path*",
    "/courses/:path*",
    "/help/:path*",
    "/admin/:path*",
    "/student/:path*",
  ],
};
