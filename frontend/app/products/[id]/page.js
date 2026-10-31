'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHeart, FaMinus, FaPlus } from 'react-icons/fa';
import { api } from '@/app/lib/api';
import { useCart } from '@/components/CartProvider';

const productImage = (image) => {
  if (!image) return '/images/placeholder.jpg';
  return image.startsWith('/')
    ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80&fm=jpg'
    : image;
};

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!id) {
      setError('Product ID is missing');
      setLoading(false);
      return;
    }
    api
      .getProduct(id)
      .then((data) => {
        setProduct(data.data || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.stock <= 0) {
      setError('This product is out of stock');
      return;
    }
    addItem(product, qty);
    setError(null);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="rounded-2xl h-96 w-full bg-gray-200 animate-pulse" />
            <div className="space-y-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-600">Product not found.</p>
          <Link
            href="/products"
            className="mt-6 inline-block px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          href="/products"
          className="inline-block text-sm text-green-600 hover:underline mb-6"
        >
          &larr; Back to shop
        </Link>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src={productImage(product.image)}
              alt={product.name}
              width={700}
              height={700}
              className="rounded-2xl object-cover shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.isFeatured && (
              <p className="mt-3 text-xs font-bold text-green-600 uppercase tracking-wider">
                Featured Product
              </p>
            )}
          </div>
          <div>
            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <FaHeart className="w-5 h-5 text-yellow-400" />
              <span className="text-green-600 font-bold">{product.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
            </div>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-green-50">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50">
                <p className="text-sm text-gray-500">Stock</p>
                <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-medium>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-sm text-gray-500 block mb-3">Quantity</label>
              <div className="flex items-center gap-4 max-w-xs">
                <button
                  disabled={qty <= 1 || product.stock <= 0}
                  onClick={() => setQty(qty - 1)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <FaMinus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button
                  disabled={qty >= product.stock || product.stock <= 0}
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-full px-6 py-3 rounded-xl font-medium transition-colors ${
                product.stock <= 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-green-500/30'
              }`}
            >
              {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <p className="mt-4 text-sm text-gray-500">
              {product.stock <= 0
                ? 'This item is currently unavailable.'
                : `Adds ${qty} item${qty !== 1 ? 's' : ''} to your cart.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
