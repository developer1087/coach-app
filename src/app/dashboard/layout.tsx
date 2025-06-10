// app/dashboard/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import { LogOutIcon, BellIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-l rtl:border-r border-gray-300 p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="text-2xl font-bold text-center">🏋️‍♂️ FitManager</div>
          <nav className="flex flex-col space-y-2 text-right text-gray-800">
            <Link href="/dashboard" className="hover:font-bold">דשבורד</Link>
            <Link href="/dashboard/trainees" className="hover:font-bold">מתאמנים</Link>
            <Link href="/dashboard/sessions" className="hover:font-bold">אימונים</Link>
            <Link href="/dashboard/payments" className="hover:font-bold">תשלומים</Link>
            <Link href="/dashboard/schedule" className="hover:font-bold">לו"ז</Link>
            <Link href="/dashboard/profile" className="hover:font-bold">פרופיל</Link>
            <Link href="/dashboard/settings" className="hover:font-bold">הגדרות</Link>
          </nav>
        </div>
        <Button variant="secondary" className="text-red-600 justify-start rtl:justify-end">
          <LogOutIcon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" /> התנתק
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 items-center rtl:flex-row-reverse">
            <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
            <MessageSquareIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
