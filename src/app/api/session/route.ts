// app/api/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import prisma from "@/lib/prisma";

const app = initializeApp({
  credential: applicationDefault(),
});

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const decoded = await getAuth().verifyIdToken(token);
    const { uid, email, name } = decoded;

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { id: uid },
      update: {},
      create: {
        id: uid,
        email,
        fullName: name ?? "משתמש חדש",
        role: "coach",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
