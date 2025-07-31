"use server";

import { prisma } from "@/lib/prisma";
import { TraineeWithDetails } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getTrainees(): Promise<TraineeWithDetails[]> {
  return await prisma.user.findMany({
    where: { role: "TRAINEE" },
    include: {
      sessions: true,
      payments: true,
      purchases: true,
    },
  });
}

export async function addTrainee(formData: FormData): Promise<void> {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string | null;
  
  await prisma.user.create({
    data: {
      name,
      phone,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      role: "TRAINEE",
      isActive: true,
    },
  });
  
  revalidatePath('/dashboard/trainees');
} 