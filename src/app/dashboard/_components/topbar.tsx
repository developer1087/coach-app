// components/dashboard/topbar.tsx
import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow">
      <div>
        <h1 className="text-2xl font-semibold">ברוך הבא, *שם המאמן*</h1>
        <p className="text-gray-500 text-sm">בוא נתחיל לעבוד!</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}
