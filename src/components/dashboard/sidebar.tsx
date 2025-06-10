// components/dashboard/sidebar.tsx
import Link from "next/link";
import { LogOut, Users, Calendar, DollarSign, BarChart2, Settings, Bell } from "lucide-react";

const links = [
  { href: "/dashboard/trainees", label: "מתאמנים", icon: <Users size={20} /> },
  { href: "/dashboard/sessions", label: "אימונים", icon: <Calendar size={20} /> },
  { href: "/dashboard/payments", label: "תשלומים", icon: <DollarSign size={20} /> },
  { href: "/dashboard/schedule", label: "לו״ז", icon: <BarChart2 size={20} /> },
  { href: "/dashboard/profile", label: "פרופיל", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4 space-y-4">
      <div className="text-xl font-bold text-blue-600">🏋️‍♂️ FitManager</div>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            {link.icon}
            {link.label}
          </Link>
        ))}
        <button className="flex items-center gap-2 text-red-500 hover:text-red-600 mt-8">
          <LogOut size={20} />
          יציאה
        </button>
      </nav>
    </div>
  );
}
