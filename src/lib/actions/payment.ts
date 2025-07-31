// app/actions/paymentActions.ts
import { prisma } from '@/lib/prisma';
import { PaymentMethod } from '@prisma/client';

// יצירת תשלום חדש
export async function createPayment(data: {
  amount: number;
  method: PaymentMethod;
  traineeId: number;
  purchaseId?: number | null;
  date?: Date;
}) {
  return await prisma.payment.create({
    data: {
      amount: data.amount,
      method: data.method,
      traineeId: data.traineeId,
      purchases: data.purchaseId ? {
        connect: { id: data.purchaseId }
      } : undefined,
      date: data.date ?? new Date(),
    },
  });
}

// עדכון תשלום קיים
export async function updatePayment(id: number, data: Partial<{
  amount: number;
  method: PaymentMethod;
  date: Date;
}>) {
  return await prisma.payment.update({
    where: { id },
    data,
  });
}

// מחיקת תשלום
export async function deletePayment(id: number) {
  return await prisma.payment.delete({
    where: { id },
  });
}

// קבלת תשלום לפי מזהה
export async function getPaymentById(id: number) {
  return await prisma.payment.findUnique({
    where: { id },
  });
}

// קבלת כל התשלומים של מתאמן
export async function getPaymentsByTrainee(traineeId: number) {
  return await prisma.payment.findMany({
    where: { traineeId },
    orderBy: { date: 'desc' },
  });
}
