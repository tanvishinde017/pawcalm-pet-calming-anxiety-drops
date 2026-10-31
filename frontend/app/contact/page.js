'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/app/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return 'Please fill in all required fields.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus('error');
      setStatusMessage(error);
      return;
    }

    setSubmitting(true);
    try {
      await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      setStatus('success');
      setStatusMessage("Thank you! Your message has been sent. We'll get back to you soon.");
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setStatusMessage(
        err.message || 'Something went wrong. Please try again later.'
      );
    } finally {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
          <p className="text-lg text-gray-600">
            Have questions about our products or need help choosing the right calming solution for your dog? We're here to help.
          </p>
        </div>

        {status === 'success' && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
            {statusMessage}
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone number (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="e.g. Product question, order help, wholesale"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your dog and how we can help..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:outline-none resize-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-14 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            123 Peaceful Paws Lane, Dog City, CA 90210 &bull; hello@pawcalm.example
          </p>
          <p className="mt-2 text-gray-400 text-xs">
            Mon - Fri, 9am - 6pm PT
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link href="/" className="text-green-600 text-sm font-medium hover:underline">
            &larr; Return to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

      setSubmitting(false);
    }
  };
