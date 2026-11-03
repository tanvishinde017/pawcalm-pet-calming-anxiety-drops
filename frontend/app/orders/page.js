'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/app/lib/api';
import { formatCurrency } from '@/app/lib/formatCurrency';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .getOrders()
      .then((res) => {
        // Filter to only show current user's orders - will be handled by backend
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load orders');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Order History</h1>
            <div className="animate-pulse bg-white rounded-xl p-8 shadow-sm" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <h1 className="text-3xl font-bold mb-4">Error</h1>
            <p className="mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Order History</h1>
            <p className="text-gray-600 mb-6">
              No orders found. Start shopping and place your first order!
            </p>
            <Link
              href="/products"
              className="px-8 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Order History</h1>
          <Link href="/products" className="px-5 py-2 rounded-xl bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Order #{order.orderId || order._id.toString().slice(-6)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatCurrency(order.total)}</p>
                    <p className="text-xs text-gray-500">
                      {order.orderStatus || 'Pending'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Products:</span>
                    {order.items
                      .map(
                        (item) =>
                          `${item.name} (x${item.qty}) ${item.packSize || ''}`
                      )
                      .join(', ')}
                    {order.items.length > 0 ? '' : 'None'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Subtotal:</span>
                    {formatCurrency(order.subtotal)}
                  </p>
                  {order.paymentMethod && (
                    <p className="text-gray-600">
                      <span className="font-medium">Payment:</span>
                      {order.paymentMethod}
                    </p>
                  )}
                  {order.paymentStatus && (
                    <p className="text-gray-600">
                      <span className="font-medium">Status:</span>
                      {order.paymentStatus}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}