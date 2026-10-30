import Image from 'next/image'
import Link from 'next/link'
import { AiFillSend, AiOutlineMail, AiOutlinePhone, AiOutlineLocation } from 'react-icons/ai'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-600 mb-8">
              Have questions about our products or need help choosing the right calming solution for your dog? We're here to help.
            </p>
            
            <form className="space-y-4">
              <div>
                <label className="sr-only">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="sr-only">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="sr-only">Phone</label>
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="sr-only">Subject</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                >
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="order">Order Support</option>
                  <option value="vet">Veterinary Consultation</option>
                </select>
              </div>
              <div>
                <label className="sr-only">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your dog and what you're looking for..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <AiFillLocation className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">123 Peaceful Paws Lane <br />
                    Dog City, CA 90210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AiFillMail className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@petcalmingdrops.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AiOutlinePhone className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-4">Office Hours</h3>
              <p className="text-gray-500 text-sm">
                Mon-Fri: 9am - 6pm PT | Sat: 10am - 3pm PT | Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}