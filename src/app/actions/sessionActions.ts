'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { SessionStatus, SessionType } from '@prisma/client'

export async function createSession(data: {
  date: Date
  type: SessionType
  status: SessionStatus
  traineeId: number
  trainerId: number
}) {
  await prisma.session.create({
    data,
  })

  revalidatePath('/dashboard')
}

export async function updateSession(id: number, data: {
  date?: Date
  type?: SessionType
  status?: SessionStatus
}) {
  await prisma.session.update({
    where: { id },
    data,
  })

  revalidatePath('/dashboard')
}

export async function deleteSession(id: number) {
  await prisma.session.delete({
    where: { id },
  })

  revalidatePath('/dashboard')
}
