"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// כל התשלומים לפי מאמן
export const getPaymentsByTrainer = async (trainerId: number) => {
  return await prisma.payment.findMany({
    where: {
      trainee: { trainerSessions: { some: { trainerId } } },
    },
    include: {
      trainee: true,
      purchases: true,
    },
    orderBy: { date: "desc" },
  });
};

// תשלום לפי מזהה
export const getPaymentById = async (id: number) => {
  return await prisma.payment.findUnique({
    where: { id },
    include: {
      trainee: true,
      purchases: true,
    },
  });
};

// יצירת תשלום
export const createPayment = async (data: {
  traineeId: number;
  amount: number;
  method: "CASH" | "CREDIT" | "TRANSFER" | "OTHER";
  date?: Date;
  purchaseIds?: number[];
}) => {
  const payment = await prisma.payment.create({
    data: {
      amount: data.amount,
      method: data.method,
      date: data.date ?? new Date(),
      traineeId: data.traineeId,
      purchases: data.purchaseIds
        ? { connect: data.purchaseIds.map((id) => ({ id })) }
        : undefined,
    },
  });

  revalidatePath("/dashboard/payments");
  return payment;
};

// עדכון תשלום
export const updatePayment = async (id: number, data: Partial<{
  amount: number;
  method: "CASH" | "CREDIT" | "TRANSFER" | "OTHER";
  date: Date;
}>) => {
  await prisma.payment.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard/payments");
};

// מחיקת תשלום
export const deletePayment = async (id: number) => {
  await prisma.payment.delete({
    where: { id },
  });

  revalidatePath("/dashboard/payments");
};
