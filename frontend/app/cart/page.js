'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';

const cartImage = (image) => {
  if (!image) return '/images/placeholder.jpg';
  return image.startsWith('/')
    ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80&fm=jpg'
    : image;
};

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, total, itemCount } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-600">
            Review your items before checkout. Shipping and taxes calculated at checkout.
          </p>
        </div>

        {itemCount === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600 text-lg mb-6">Your cart is empty.</p>
            <Link
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-6"
                >
                  <Image
                    src={cartImage(item.image)}
                    alt={item.name}
                    width={120}
                    height={150}
                    className="rounded-xl object-cover object-center shrink-0"
                    sizes="120px"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold line-clamp-2">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      {item.category}&nbsp;•&nbsp;{item.stock > 0 ? 'In stock' : 'Out of stock'}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item._id, item.qty - 1)}
                          disabled={item.qty <= 1}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-4 text-center font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item._id, item.qty + 1)}
                          disabled={item.qty >= item.stock || item.stock <= 0}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Subtotal: <span className="font-bold text-gray-900">${(
                        item.price * item.qty
                      ).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-60"
                  disabled={itemCount === 0}
                >
                  Proceed to Checkout
                </button>
                <p className="mt-4 text-xs text-gray-500 text-center">
                  Checkout integration is being prepared. See the checkout page for details.
                </p>
                <button
                  onClick={clearCart}
                  className="w-full mt-3 py-2 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

              href="/products"
              className="px-8 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (