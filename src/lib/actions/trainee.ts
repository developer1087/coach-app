'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createTrainee(data: {
  name: string
  email: string
  phone: string
  notes?: string
  userId: number
}) {
  const trainee = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
      role: 'TRAINEE',
      id: data.userId,
    },
  })
  revalidatePath('/dashboard')
  return trainee
}

export async function updateTrainee(id: number, data: {
  name?: string
  email?: string
  phone?: string
  notes?: string
}) {
  const trainee = await prisma.user.update({
    where: { id },
    data,
  })
  revalidatePath('/dashboard')
  return trainee
}

export async function deleteTrainee(id: number) {
  await prisma.user.delete({
    where: { id },
  })
  revalidatePath('/dashboard')
}
