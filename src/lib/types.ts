// lib/types.ts
import { User, Session, Payment, Purchase } from "@prisma/client";

export type TraineeWithDetails = User & {
  sessions: Session[];
  payments: Payment[];
  purchases: Purchase[];
};

export type SessionWithDetails = Session & {
  trainee: User;
  trainer: User;
};

export type PaymentWithDetails = Payment & {
  trainee: User;
  purchases: Purchase[];
};
