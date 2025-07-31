"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SessionType } from "@prisma/client";

export async function createPurchase(data: {
  userId: number;
  sessionType: SessionType;
  quantity: number;
  price: number;
  paymentId?: number;
}) {
  const purchase = await prisma.purchase.create({
    data: {
      userId: data.userId,
      sessionType: data.sessionType,
      quantity: data.quantity,
      price: data.price,
      paymentId: data.paymentId,
    },
  });

  revalidatePath("/dashboard/purchases");
  return purchase;
}

export async function updatePurchase(id: number, data: {
  quantity?: number;
  price?: number;
  paymentId?: number;
}) {
  await prisma.purchase.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard/purchases");
}

export async function deletePurchase(id: number) {
  await prisma.purchase.delete({
    where: { id },
  });

  revalidatePath("/dashboard/purchases");
} 