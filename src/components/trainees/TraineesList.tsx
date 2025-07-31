'use client';

// components/trainees/TraineesList.tsx
import { TraineeWithDetails } from "@/lib/types";
import TraineeCard from "./TraineeCard";

type Props = {
  trainees: TraineeWithDetails[];
};

export default function TraineesList({ trainees }: Props) {
  if (trainees.length === 0) {
    return <p className="text-gray-500">אין מתאמנים להצגה.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {trainees.map((trainee) => (
        <TraineeCard key={trainee.id} trainee={trainee} />
      ))}
    </div>
  );
}
