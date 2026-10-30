import Link from 'next/link'
import { FaBars, FaXmark } from 'react-icons/fa'

export const Nav = ({ menuOpen, setMenuOpen, links }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-serif text-2xl font-bold text-green-600">
            <span className="text-3xl">Calm</span>Drops
          </Link>
        </div>
        
        <div className="hidden md:block flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">Home</Link>
          <Link href="/products" className="text-gray-600 hover:text-green-600 transition-colors">Products</Link>
          <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">About</Link>
          <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">Contact</Link>
        </div>
        
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 pt-20">
          <Link href="/" className="text-2xl font-bold text-green-600">Home</Link>
          <Link href="/products" className="text-2xl hover:text-green-600">Products</Link>
          <Link href="/about" className="text-2xl hover:text-green-600">About</Link>
          <Link href="/contact" className="text-2xl hover:text-green-600">Contact</Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <FaXmark className="w-6 h-6" />
          </button>
        </div>
      )}
    </nav>
  )
}