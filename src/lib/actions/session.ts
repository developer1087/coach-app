"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SessionStatus, SessionType } from "@prisma/client";

export async function createSession(data: {
  date: Date;
  type: SessionType;
  traineeId: number;
  trainerId: number;
}) {
  const session = await prisma.session.create({
    data: {
      date: data.date,
      type: data.type,
      traineeId: data.traineeId,
      trainerId: data.trainerId,
      status: "SCHEDULED",
    },
  });

  revalidatePath("/dashboard/sessions");
  return session;
}

export async function updateSessionStatus(id: number, status: SessionStatus) {
  await prisma.session.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/dashboard/sessions");
}

export async function deleteSession(id: number) {
  await prisma.session.delete({
    where: { id },
  });

  revalidatePath("/dashboard/sessions");
} 