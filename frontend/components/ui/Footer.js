import Link from 'next/link';
import { FaPaw } from 'react-icons/fa';

export const Footer = () => (
  <footer className="bg-[#294C3B] text-white py-12">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4"><FaPaw className="w-6 h-6 text-[#A8B5A0]" /><span className="font-serif text-xl font-bold">Paw<span className="text-gray-300">Calm</span></span></div>
        <p className="text-gray-300 text-sm">A calmer, happier life for every paw. Educational pet wellness resources.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Explore</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><Link href="/about" className="hover:text-white">About Us</Link></li>
          <li><Link href="/anxiety" className="hover:text-white">Understanding Anxiety</Link></li>
          <li><Link href="/calm-techniques" className="hover:text-white">Calm Techniques</Link></li>
          <li><Link href="/pet-care" className="hover:text-white">Pet Care Guides</Link></li>
          <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Support</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          <li><Link href="/privacy" className="hover:text-white">Privacy Notice</Link></li>
        </ul>
      </div>
      <div>
        <p className="text-sm text-gray-300">hello@pawcalm.example</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-white/20 text-xs text-gray-400 text-center">
      &copy; {new Date().getFullYear()} PawCalm. All rights reserved. Educational content only; not veterinary advice.
    </div>
  </footer>
);
