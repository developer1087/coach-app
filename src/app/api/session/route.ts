// app/api/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const { uid, email, name } = decoded;
    const session = await adminAuth.createSessionCookie(token, { expiresIn: 60 * 60 * 24 * 5 * 1000 });

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { id: uid },
      update: {
        session,
      },
      create: {
        id: uid,
        email,
        fullName: name ?? "משתמש חדש",
        role: "coach",
        session,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);
    const user = await prisma.user.findUnique({
      where: { id: decoded.uid },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
