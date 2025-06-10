import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { prisma } from "@/lib/prisma";
import { adminApp } from "@/lib/firebase-admin"; // האתחול של Firebase Admin SDK

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName, role } = await req.json();

    // 1. צור משתמש ב-Firebase Admin
    const userRecord = await getAuth(adminApp).createUser({
      email,
      password,
      displayName: fullName,
    });

    const uid = userRecord.uid;

    // 2. צור משתמש בפריזמה
    const user = await prisma.user.create({
      data: {
        id: uid,
        email,
        fullName,
        role, // חשוב לוודא שה-role תקין (coach/trainee)
      },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
