// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase-client";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BellIcon,
  LogOutIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  UsersIcon,
  CalendarCheckIcon,
  CreditCardIcon,
  ClipboardCheckIcon,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>טוען...</p>;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">ברוך הבא, {user?.email}</h1>
          <p className="text-sm text-gray-600">בוא נתחיל לעבוד!</p>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
          <MessageSquareIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="text-sm flex gap-1 items-center"
          >
            <LogOutIcon className="w-4 h-4" /> התנתק
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <h2 className="text-xl font-bold">12</h2>
          <p className="text-gray-500">מתאמנים פעילים</p>
        </Card>
        <Card>
          <h2 className="text-xl font-bold">34</h2>
          <p className="text-gray-500">אימונים החודש</p>
        </Card>
        <Card>
          <h2 className="text-xl font-bold">₪2,400</h2>
          <p className="text-gray-500">תשלומים החודש</p>
        </Card>
      </div>

      {/* Checklist */}
      <div>
        <h3 className="text-lg font-semibold mb-2">משימות</h3>
        <Card>
          <ul className="space-y-2 text-sm">
            <li>✅ לשלוח חשבונית לרוני</li>
            <li>⬜ לתאם אימון עם רועי</li>
            <li>⬜ לדבר עם הרו"ח</li>
          </ul>
        </Card>
      </div>

      {/* Recent Trainees */}
      <div>
        <h3 className="text-lg font-semibold mb-2">מתאמנים חדשים</h3>
        <Card>
          <ul className="space-y-2 text-sm">
            <li>רוני לוי</li>
            <li>דנה כהן</li>
            <li>רועי ישראלי</li>
          </ul>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-2">פעולות מהירות</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Button variant="secondary" className="flex gap-2 items-center justify-center">
            <UsersIcon className="w-4 h-4" /> מתאמן חדש
          </Button>
          <Button variant="secondary" className="flex gap-2 items-center justify-center">
            <CalendarCheckIcon className="w-4 h-4" /> אימון חדש
          </Button>
          <Button variant="secondary" className="flex gap-2 items-center justify-center">
            <CreditCardIcon className="w-4 h-4" /> תשלום חדש
          </Button>
          <Button variant="secondary" className="flex gap-2 items-center justify-center">
            <ClipboardCheckIcon className="w-4 h-4" /> משימה חדשה
          </Button>
        </div>
      </div>
    </div>
  );
}
