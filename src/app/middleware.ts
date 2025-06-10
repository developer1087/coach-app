// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyFirebaseToken } from "@/lib/firebase-admin";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("__session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await verifyFirebaseToken(token);
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token in middleware:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// רשימת הנתיבים המוגנים
export const config = {
  matcher: ["/dashboard/:path*"], // אפשר להוסיף עוד נתיבים כאן
};
