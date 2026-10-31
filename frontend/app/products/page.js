'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/app/lib/api';
import { ProductCard } from '@/components/ui/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'calming-drops', label: 'Calming Drops' },
    { value: 'treats', label: 'Treats' },
    { value: 'toys', label: 'Toys' },
    { value: 'accessories', label: 'Accessories' },
  ];

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
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Shop All Products</h1>
          <p className="text-gray-600 animate-pulse">Loading products&hellip;</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Shop All Products</h1>
          <p className="text-red-600 mb-6">Unable to load products: {error}</p>
          <p className="text-sm text-gray-500">
            Make sure the backend server is running on port 4000 and NEXT_PUBLIC_API_URL is set.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Shop All Products</h1>
            <p className="text-gray-600">
              {products.length} product{products.length !== 1 ? 's' : ''} available for calmer, happier pets.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat.value
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-6">No products found in this category.</p>
            <button
              onClick={() => setCategory('all')}
              className="px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
