// app/dashboard/trainees/page.tsx
import { getTrainees } from "@/lib/actions/trainee.actions"; 
import TraineeCard from "@/components/trainees/TraineeCard";

export default async function TraineesPage() {
  const trainees = await getTrainees();

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">המתאמנים שלך</h1>
          <p className="text-muted-foreground text-sm">נהל את רשימת המתאמנים בקלות.</p>
        </div>
        <button className="btn-primary">הוסף מתאמן</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainees.map((trainee) => (
          <TraineeCard key={trainee.id} trainee={trainee} />
        ))}
      </div>
    </div>
  );
}
