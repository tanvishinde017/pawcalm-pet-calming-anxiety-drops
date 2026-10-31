'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

export default function CheckoutPage() {
  const { itemCount, total } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-amber-500">&#9888;</span>
            <h2 className="text-2xl font-bold">Checkout – Coming Soon</h2>
          </div>
          <p className="text-gray-600 mb-8">
            Checkout and payment integration are not yet connected to a payment provider. This page is
            prepared so you can add Stripe/PayPal integration later without changing the cart or product pages.
          </p>

          <div className="space-y-6 mb-10">
            <div className="border rounded-xl p-4">
              <h3 className="font-bold mb-3 text-sm uppercase tracking-wider text-gray-500">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Items in cart</span>
                  <span className="font-medium">{itemCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="font-bold text-amber-800 mb-2 text-sm">What&rsquo;s needed to go live</h3>
              <ul className="text-sm text-amber-700 space-y-2 list-disc list-inside">
                <li>Set up a Stripe (or PayPal) account and publishable/secret keys.</li>
                <li>Add <code className="bg-amber-200 px-1 py-0.5 rounded text-xs">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to frontend env.</li>
                <li>Add Stripe secret key to backend env and create a <code className="bg-amber-200 px-1 py-0.5 rounded text-xs">POST /api/checkout/session</code> route.</li>
                <li>Add order persistence (Order model) and a webhook to confirm payments.</li>
                <li>Set <code className="bg-amber-200 px-1 py-0.5 rounded text-xs">NEXT_PUBLIC_API_URL</code> to your production backend on Vercel.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link
              href="/cart"
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Back to Cart
            </Link>
            <button
              disabled
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gray-300 text-gray-500 font-medium text-center"
            >
              Place Order (disabled until integration)
            </button>
          </div>

          <p className="mt-10 text-center text-xs text-gray-400">
            No payment information is collected on this page in the current version.
          </p>
        </div>
      </div>
    </main>
  );
}
