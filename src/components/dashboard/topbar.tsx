// components/dashboard/topbar.tsx
"use client";

import { BellIcon, MessageSquareIcon } from "lucide-react";

export default function Topbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 py-3 flex justify-end items-center">
        <div className="flex gap-4 items-center rtl:flex-row-reverse">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <BellIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MessageSquareIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
