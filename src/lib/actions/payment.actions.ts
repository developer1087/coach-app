// lib/payment.actions.ts

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// יצירת תשלום
export const createPayment = async (data: {
  trainerId: string;
  traineeId: string;
  amount: number;
  date: Date;
  method: string;
  notes?: string;
  purchaseIds?: string[]; // ניתן לשייך ל־1+ purchases
}) => {
  const payment = await prisma.payment.create({
    data: {
      trainerId: data.trainerId,
      traineeId: data.traineeId,
      amount: data.amount,
      date: data.date,
      method: data.method,
      notes: data.notes,
      purchases: data.purchaseIds
        ? {
            connect: data.purchaseIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  revalidatePath("/payments");
  return payment;
};

// עדכון תשלום
export const updatePayment = async (
  id: string,
  data: {
    amount?: number;
    date?: Date;
    method?: string;
    notes?: string;
  }
) => {
  await prisma.payment.update({
    where: { id },
    data,
  });

  revalidatePath("/payments");
};

// מחיקת תשלום
export const deletePayment = async (id: string) => {
  await prisma.payment.delete({
    where: { id },
  });

  revalidatePath("/payments");
};

// שליפת תשלום לפי מזהה
export const getPaymentById = async (id: string) => {
  return await prisma.payment.findUnique({
    where: { id },
    include: {
      purchases: true,
      trainee: true,
    },
  });
};

// שליפת כל התשלומים לפי מאמן
export const getAllPaymentsByTrainer = async (trainerId: string) => {
  return await prisma.payment.findMany({
    where: { trainerId },
    include: {
      purchases: true,
      trainee: true,
    },
    orderBy: { date: "desc" },
  });
};
