import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/app/lib/api';

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      api.getStats().then((res) => setStats(res.data || {})).catch(setError),
      api.getProducts().then((res) => setProducts(res.data || [])).catch(setError),
      api.getOrders().then((res) => setOrders(res.data || [])).catch(setError),
      api.getUsers().then((res) => setUsers(res.data || [])).catch(setError),
      api.getEnquiries().then((res) => setEnquiries(res.data || [])).catch(setError),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
            <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <h1 className="text-3xl font-bold mb-4">Error</h1>
            <p className="mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">Try Again</button>
          </div>
        </div>
      </section>
    );
  }

  return <div className="min-h-screen">{children}</div>;
}

export default AdminLayout;