// lib/actions/trainee.actions.ts

import { prisma } from "@/lib/prisma";

export async function getTrainees() {
  const trainees = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      sessions: true,
      payments: true,
    },
  });

  return trainees.map((t) => ({
    id: t.id,
    name: t.name,
    phone: t.phone,
    sessionsCount: t.sessions.length,
    balance:
      t.payments.reduce((sum, p) => sum + p.amount, 0) -
      t.sessions.reduce((sum, s) => sum + s.price, 0),
  }));
}
