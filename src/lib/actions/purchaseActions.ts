// lib/purchase.actions.ts

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// יצירת חוב (רכישה)
export const createPurchase = async (data: {
  trainerId: string;
  traineeId: string;
  sessionId?: string;
  type: "PERSONAL" | "PAIR" | "GROUP";
  date: Date;
  amount: number;
  notes?: string;
}) => {
  await prisma.purchase.create({
    data,
  });

  revalidatePath("/purchases");
};

// עדכון רכישה
export const updatePurchase = async (
  id: string,
  data: {
    type?: "PERSONAL" | "PAIR" | "GROUP";
    amount?: number;
    date?: Date;
    notes?: string;
  }
) => {
  await prisma.purchase.update({
    where: { id },
    data,
  });

  revalidatePath("/purchases");
};

// מחיקת רכישה
export const deletePurchase = async (id: string) => {
  await prisma.purchase.delete({
    where: { id },
  });

  revalidatePath("/purchases");
};

// שליפת רכישה לפי מזהה
export const getPurchaseById = async (id: string) => {
  return await prisma.purchase.findUnique({
    where: { id },
    include: {
      payment: true,
      session: true,
      trainee: true,
    },
  });
};

// שליפת כל הרכישות לפי מאמן
export const getAllPurchasesByTrainer = async (trainerId: string) => {
  return await prisma.purchase.findMany({
    where: { trainerId },
    include: {
      payment: true,
      session: true,
      trainee: true,
    },
    orderBy: { date: "desc" },
  });
};
