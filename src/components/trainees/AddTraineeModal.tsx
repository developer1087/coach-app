"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Button  from "@/components/ui/button";
import { useState } from "react";
import AddTraineeForm from "@/components/trainees/AddTraineeForm";

export default function AddTraineeModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>+ הוסף מתאמן</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>הוספת מתאמן חדש</DialogTitle>
        </DialogHeader>
        <AddTraineeForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
