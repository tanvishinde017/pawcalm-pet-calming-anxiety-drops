'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHeart } from 'react-icons/fa';

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;

  if (!id) {
    return <p className="text-red-600">Product not found</p>
  }

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data) => {
        setProduct(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <SkeletonDetail />;
  if (error) return <ErrorState message={error.message} backPath="/products" router={router} />;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-2xl object-cover shadow-lg"
            />
          </div>
          <div>
            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded">Featured</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <FaHeart className="w-4 h-4 text-yellow-500" />
              <span className="text-green-600 font-bold">{product.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
            </div>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-green-50">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-2xl font-bold">$${product.price.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50">
                <p className="text-sm text-gray-500">Stock</p>
                <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button className="px-3 py-1 rounded bg-gray-200">-</button>
                <span>1</span>
                <button className="px-3 py-1 rounded bg-gray-200">+</button>
              </div>
            </div>

            <button className="w-full px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors mt-4">
              Add to Cart
            </button>

            <Link href="/" className="mt-4 inline-block text-green-600 hover underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const SkeletonDetail = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="rounded-2xl h-64 w-full bg-gray-200 animate-bounce"></div>
      <div className="space-y-4">
        <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
        <div className="h-6 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

const ErrorState = ({ message, backPath, router }) => {
  return (
    <div className="py-12 text-center">
      <p className="text-red-600">{message}</p>
      <button
        onClick={() => router.push(backPath)}
        className="mt-4 px-6 py-2 rounded bg-green-600 text-white">
        Go Back
      </button>
    </div>
  );
};