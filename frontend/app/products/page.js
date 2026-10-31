'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

export default function ProductsPage() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">Shop All Products</h1>
          <Link href="/products/new" className="btn-secondary px-4 py-2 rounded-full text-sm font-medium transition-colors">
            New Arrivals
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl overflow-shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative aspect-w-1 aspect-h-1">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full rounded-t-2xl transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isFeatured && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">Featured</span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-bold mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {product.description.substring(0, 100)}...
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <FaHeart className="w-3 h-3" />{' '}
                    {product.rating.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          {products.length === 0 && <p className="text-gray-600">No products found</p>}
          <button className="mt-8 px-8 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}