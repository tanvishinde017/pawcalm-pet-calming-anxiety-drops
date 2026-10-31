'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaPaw, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/components/CartProvider';

export const Nav = () => {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          <FaPaw className="w-7 h-7 text-green-600" />
          <span className="font-serif text-2xl font-bold text-green-700 tracking-tight">Paw<span className="text-gray-900">Calm</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="/cart"
            className="relative p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            <FaShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">{itemCount}</span>
            )}
          </a>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
            aria-label="Open menu"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center pt-20 md:pt-32">
          <Link
            href="/"
            className="text-3xl font-bold text-green-700 mb-8 font-serif"
            onClick={() => setMenuOpen(false)}
          >
            Paw<span className="text-gray-900">Calm</span>
          </Link>
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-2xl font-medium text-gray-700 hover:text-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="text-2xl font-medium text-gray-700 hover:text-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            <Link href="/about" className="text-2xl font-medium text-gray-700 hover:text-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className="text-2xl font-medium text-gray-700 hover:text-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
            <Link href="/cart" className="text-2xl font-medium text-gray-700 hover:text-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
              Cart ({itemCount})
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 p-2 rounded-md hover:bg-gray-100 text-gray-600"
            aria-label="Close menu"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
      )}
    </nav>
  );
};
