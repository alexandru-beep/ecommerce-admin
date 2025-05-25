// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
// publicRoutes: ["/api/:path*"],
// });
export default function authMiddleware() {
  return;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
