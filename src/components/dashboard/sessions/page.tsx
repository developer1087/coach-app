import { auth } from "@/auth"; // בהתאמה למיקום שלך
import { getAllSessionsForTrainer } from "@/lib/db/sessions";
import SessionsClient from "@/components/sessions/sessions-client";

export default async function SessionsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    // ניתן להפנות לדף התחברות או להחזיר 401
    return <div>Unauthorized</div>;
  }

  const sessions = await getAllSessionsForTrainer(user.id);

  return (
    <div className="p-4">
      <SessionsClient sessions={sessions} />
    </div>
  );
}
