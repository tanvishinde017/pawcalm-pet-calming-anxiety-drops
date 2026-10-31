import Link from 'next/link';
import { FaPaw, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <FaPaw className="w-6 h-6 text-green-400" />
            <span className="text-xl font-bold font-serif tracking-tight">Paw<span className="text-gray-400">Calm</span></span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            PawCalm – Pet Wellness &amp; Care. A calmer, happier life for every paw.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Shop</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Support</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="w-5 h-5" />
              <span>123 Peaceful Paws Lane, Dog City, CA 90210</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="w-5 h-5" />
              <span className="hover:text-white transition-colors">+1 (555) 010-2030</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="w-5 h-5" />
              <span className="hover:text-white transition-colors">hello@pawcalm.example</span>
            </li>
            <li className="flex items-center gap-3">
              <FaClock className="w-5 h-5" />
              <span>Mon - Fri, 9am - 6pm PT</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-6">Sign up for pet wellness tips and product updates.</p>
          <form className="flex gap-2" action="#" noValidate>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
            />
            <button type="submit" className="px-5 py-3 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} PawCalm – Pet Wellness &amp; Care. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
            <span className="sr-only">Instagram</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);
