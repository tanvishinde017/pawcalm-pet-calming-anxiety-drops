'use client';

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/app/lib/formatCurrency';

export default function AdminStatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data.data || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          <div className="animate-pulse bg-white rounded-xl p-8 shadow-sm" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">Try Again</button>
        </div>
      </section>
    );
  }

  if (!stats) {
    return <p>No statistics available</p>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalProducts || 0}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalOrders || 0}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Customers</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.totalCustomers || 0}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalRevenue || 0)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
            <p className="text-gray-500 text-sm">Order data would appear here</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Top Customers</h3>
            <p className="text-gray-500 text-sm">Customer data would appear here</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue This Month</h3>
            <p className="text-gray-500 text-sm">₹ {formatCurrency(stats.monthlyRevenue || 0)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}