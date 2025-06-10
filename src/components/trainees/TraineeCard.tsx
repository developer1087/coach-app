// components/trainees/TraineeCard.tsx
"use client";

import Link from "next/link";

export default function TraineeCard({ trainee }: { trainee: any }) {
  return (
    <div className="rounded-2xl shadow-md border p-4 flex flex-col gap-2 bg-white hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{trainee.name}</h2>
      <p className="text-sm text-muted-foreground">{trainee.phone}</p>
      <p className="text-sm">אימונים: {trainee.sessionsCount || 0}</p>
      <p className={`text-sm ${trainee.balance < 0 ? "text-red-500" : "text-green-600"}`}>
        יתרה: ₪{trainee.balance}
      </p>

      <div className="mt-auto flex justify-between text-sm pt-2">
        <Link href={`/dashboard/trainee/${trainee.id}`} className="text-blue-600 hover:underline">
          פרטים
        </Link>
        <button className="text-gray-600 hover:text-black">ערוך</button>
      </div>
    </div>
  );
}
