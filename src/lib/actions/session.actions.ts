"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// כל האימונים של מאמן
export const getSessionsByTrainer = async (trainerId: number) => {
  return await prisma.session.findMany({
    where: { trainerId },
    include: {
      trainee: true,
      purchaseItems: {
        include: {
          purchase: true,
        },
      },
    },
    orderBy: { date: "desc" },
  });
};

// אימון לפי מזהה
export const getSessionById = async (id: number) => {
  return await prisma.session.findUnique({
    where: { id },
    include: {
      trainee: true,
      trainer: true,
      purchaseItems: true,
    },
  });
};

// יצירת אימון
export const createSession = async (data: {
  trainerId: number;
  traineeId: number;
  date: Date;
  type: "PERSONAL" | "PAIR" | "GROUP";
  status?: "SCHEDULED" | "COMPLETED" | "CANCELLED";
}) => {
  const session = await prisma.session.create({
    data: {
      ...data,
      isCompleted: data.status === "COMPLETED",
    },
  });

  revalidatePath("/dashboard/sessions");
  return session;
};

// עדכון אימון
export const updateSession = async (id: number, data: Partial<{
  date: Date;
  type: "PERSONAL" | "PAIR" | "GROUP";
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
}>) => {
  await prisma.session.update({
    where: { id },
    data: {
      ...data,
      isCompleted: data.status === "COMPLETED",
    },
  });

  revalidatePath("/dashboard/sessions");
};

// מחיקת אימון
export const deleteSession = async (id: number) => {
  await prisma.session.delete({
    where: { id },
  });

  revalidatePath("/dashboard/sessions");
};
