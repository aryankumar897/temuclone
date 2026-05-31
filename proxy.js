import { withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    "/dashboard/user/:path*",
    "/dashboard/admin/:path*",
    "/dashboard/vendor/:path*",
  ],
};

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    console.log("pathname in midleware", pathname);
    const token = await getToken({ req });
    console.log("token in  middleware", token);
    const role = token?.user?.user_type;
    console.log("role in  middleware", role);

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/dashboard/vendor") && role !== "vendor") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/dashboard/user") && role !== "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // return NextResponse.next();
  },

  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  },
);
//uudemy626_db_user
//BQaZ5WUftwLxnPBZ

//mongodb+srv://uudemy626_db_user:BQaZ5WUftwLxnPBZ@cluster0.wekkumu.mongodb.net/

//temu
//vAPUlnIRd9rRZXLX
//mongodb+srv://uudemy626_db_user:vAPUlnIRd9rRZXLX@cluster0.wtfohvy.mongodb.net/
//mongodb+srv://uudemy626_db_user:<db_password>@cluster0.wtfohvy.mongodb.net/?appName=Cluster0
