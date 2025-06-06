'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inbox, Mail, ChevronRight, UserCircle2 } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Requests', href: '/requests', icon: <Inbox size={18} /> },
    { label: 'Email', href: '/email', icon: <Mail size={18} /> }
  ];

  return (
    <aside className="w-[15%] min-h-screen bg-white border-r flex flex-col justify-between py-6 px-4">
      {/* Top Logo */}
      <div>
        <div className="text-2xl font-black mb-10 tracking-tight italic">Logo</div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                pathname === item.href
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
              <ChevronRight className="ml-auto h-4 w-4 opacity-40" />
            </Link>
          ))}
        </nav>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 text-sm text-gray-600 mt-12 border-t pt-4">
        <UserCircle2 className="w-8 h-8 text-gray-400" />
        <div>
          <div className="font-semibold text-gray-800">Evano</div>
          <div className="text-xs text-gray-500">Business Dev</div>
        </div>
      </div>
    </aside>
  );
}
