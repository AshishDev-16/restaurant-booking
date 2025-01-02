'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '../lib/utils';

const navItems = [
  { label: 'Overview', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Photos', path: '/photos' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Book a Table', path: '/book' },
  { label: 'Contact', path: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                pathname === item.path
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 