import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { api } from '@/app/lib/api';
import { ProductCard } from '@/components/ui/ProductCard';
import { formatCurrency } from '@/app/lib/formatCurrency';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = category === 'all' ? {} : { category };
    api
      .getProducts(params)
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  const filtered = category === 'all' ? products : products.filter((p) => p.category === category);

  if (loading) {
    return (<section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Shop All Products</h1><p className="text-gray-600 animate-pulse">Loading products...</p></div></section>);
  }

  if (error) {
    return (<section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Shop All Products</h1><p className="text-red-600 mb-6">Unable to load products: {error}</p><p className="text-sm text-gray-500">Make sure the backend server is running on port 4000 and NEXT_PUBLIC_API_URL is set.</p><button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">Try Again</button></div></section>);
  }

  return (<main className="min-h-screen bg-white">
      <Nav />

      {/* Promotional Announcement Bar */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <span className="font-medium">🎉 Free shipping on all orders above ₹499 | Limited stock available - Shop now!</span>
          <Link href="/cart" className="text-white font-medium hover:underline">View Cart</Link>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative py-24 lg:py-32 bg-gray-50">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=1500&q=80&fm=jpg"
            alt="Happy dog enjoying calm moments"
            fill
            className="object-cover opacity-80"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-6 uppercase tracking-wider">
              <span className="relative -top-px w-2 h-2 rounded-full bg-green-500" />Premium Indian Pet Care
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight">
              A Calmer, Happier Life for Every Paw.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              India's trusted online store for pet wellness and calming solutions. We bring you the best from Drools, Royal Canin, and other trusted brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-xl hover:bg-green-700 transition-colors shadow-lg">
                Shop Now
              </Link>
              <Link href="/about" className="px-8 py-4 bg-white text-gray-900 text-lg font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700&q=80&fm=jpg"
              alt="Calm dog resting"
              width={700}
              height={500}
              className="rounded-2xl object-cover shadow-xl"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}