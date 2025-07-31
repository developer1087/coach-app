// userActions.ts
import { prisma } from '@/lib/prisma';

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function updateUser(id: number, data: Partial<{ name: string; email: string; role: 'TRAINER' | 'TRAINEE' }>) {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}
