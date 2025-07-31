// components/dashboard/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "דשבורד" },
    { href: "/dashboard/trainees", label: "מתאמנים" },
    { href: "/dashboard/sessions", label: "אימונים" },
    { href: "/dashboard/payments", label: "תשלומים" },
    { href: "/dashboard/schedule", label: "לו״ז" },
    { href: "/dashboard/profile", label: "פרופיל" },
    { href: "/dashboard/settings", label: "הגדרות" },
  ];

  return (
    <aside className="w-64 bg-gray-100 border-l rtl:border-r border-gray-300 p-4 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="text-2xl font-bold text-center">🏋️‍♂️ FitManager</div>
        <nav className="flex flex-col space-y-2 text-right text-gray-800">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:font-bold",
                pathname === item.href && "font-bold text-blue-600"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <Button variant="secondary" className="text-red-600 justify-start rtl:justify-end">
        <LogOutIcon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" /> התנתק
      </Button>
    </aside>
  );
}
