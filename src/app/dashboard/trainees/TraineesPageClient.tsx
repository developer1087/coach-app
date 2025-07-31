"use client";

import { TraineeWithDetails } from "@/lib/types";
import TraineesList from "@/components/trainees/TraineesList";
import AddTraineeModal from "@/components/trainees/AddTraineeModal";

export default function TraineesPageClient({ trainees }: { trainees: TraineeWithDetails[] }) {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-2">המתאמנים שלך</h1>
      <p className="text-gray-600 mb-4">נהל את רשימת המתאמנים בקלות.</p>
      <AddTraineeModal />
      <TraineesList trainees={trainees} />
    </section>
  );
}
