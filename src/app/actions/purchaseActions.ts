"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// כל הרכישות לפי מאמן
export const getPurchasesByTrainer = async (trainerId: number) => {
  return await prisma.purchase.findMany({
    where: {
      user: {
        trainerSessions: {
          some: { trainerId },
        },
      },
    },
    include: {
      user: true,
      payment: true,
      items: {
        include: {
          session: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// רכישה לפי מזהה
export const getPurchaseById = async (id: number) => {
  return await prisma.purchase.findUnique({
    where: { id },
    include: {
      user: true,
      payment: true,
      items: {
        include: {
          session: true,
        },
      },
    },
  });
};

// יצירת רכישה
export const createPurchase = async (data: {
  userId: number;
  sessionType: "PERSONAL" | "PAIR" | "GROUP";
  quantity?: number;
  price: number;
  paymentId?: number;
}) => {
  const purchase = await prisma.purchase.create({
    data,
  });

  revalidatePath("/dashboard/purchases");
  return purchase;
};

// עדכון רכישה
export const updatePurchase = async (id: number, data: Partial<{
  sessionType: "PERSONAL" | "PAIR" | "GROUP";
  quantity?: number;
  price: number;
}>) => {
  await prisma.purchase.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard/purchases");
};

// מחיקת רכישה
export const deletePurchase = async (id: number) => {
  await prisma.purchase.delete({
    where: { id },
  });

  revalidatePath("/dashboard/purchases");
};
