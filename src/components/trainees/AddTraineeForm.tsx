"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { addTrainee } from "@/app/dashboard/trainees/actions";
import { toast } from "sonner";

export default function AddTraineeForm({ onSuccess }: { onSuccess: () => void }) {
  async function handleSubmit(formData: FormData) {
    try {
      await addTrainee(formData);
      toast.success("המתאמן נוסף בהצלחה");
      onSuccess();
    } catch (err) {
      toast.error("שגיאה בהוספה");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 mt-4">
      <Input name="name" placeholder="שם מתאמן" required />
      <Input name="phone" placeholder="טלפון" />
      <Button type="submit" className="w-full">שמור</Button>
    </form>
  );
}
