'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaPaw } from 'react-icons/fa';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/anxiety', label: 'Understanding Anxiety' },
  { href: '/calm-techniques', label: 'Calm Techniques' },
  { href: '/pet-care', label: 'Pet Care Guides' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <FaPaw className="w-6 h-6 text-[#294C3B]" />
          <span className="font-serif text-xl font-bold text-[#294C3B]">Paw<span className="text-gray-900">Calm</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`text-sm font-medium transition-colors ${pathname === l.href ? 'text-[#294C3B]' : 'text-gray-600 hover:text-[#294C3B]'}`}>{l.label}</Link>
          ))}
          <Link href="/resources" className="px-4 py-2 rounded-xl bg-[#294C3B] text-white text-sm font-medium hover:bg-[#1f3a2d] transition-colors">Explore Guides</Link>
        </div>
        <button className="md:hidden p-2" aria-label="Open menu" onClick={() => setMenuOpen(true)}><FaBars className="w-6 h-6 text-gray-600" /></button>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center">
          <button className="absolute top-6 right-6 p-2" aria-label="Close menu" onClick={() => setMenuOpen(false)}><FaTimes className="w-6 h-6" /></button>
          <div className="flex flex-col gap-4 text-center">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-gray-700 hover:text-[#294C3B]">{l.label}</Link>
            ))}
            <Link href="/resources" onClick={() => setMenuOpen(false)} className="mt-4 px-6 py-3 rounded-xl bg-[#294C3B] text-white font-medium">Explore Guides</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
