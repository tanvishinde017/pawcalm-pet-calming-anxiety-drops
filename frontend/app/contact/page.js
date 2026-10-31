'use client';

import React from 'react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-600 mb-8">
          Have questions about our products or need help choosing the right calming solution for your dog? We're here to help.
        </p>
        <form>
          <div className="mb-4">
            <label className="sr-only">Name</label>
            <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500" />
          </div>
          <div className="mb-4">
            <label className="sr-only">Email</label>
            <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500" />
          </div>
          <div className="mb-4">
            <label className="sr-only">Message</label>
            <textarea rows={4} placeholder="Tell us about your dog..." className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 resize-none"></textarea>
          </div>
          <button type="submit" className="w-full px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
            Send Message
          </button>
        </form>
        <p className="mt-8 text-center text-gray-500">123 Peaceful Paws Lane, Dog City, CA 90210</p>
      </div>
    </main>
  )
}