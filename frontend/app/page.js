import Link from 'next/link'
import Image from 'next/image'
import { FaHeart, FaPaw, FaLeaf, FaUserMd, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <FaPaw className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold text-gray-900">PetCalming Drops</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Home</Link>
              <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Products</Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Contact</Link>
            </div>
            <Link href="/products" className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
              Shop Products
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-green-50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-6 uppercase tracking-wider">
              <span className="relative -top-px w-2 h-2 rounded-full bg-green-500" />
              Natural Pet Wellness
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
              Calm Your Pet&rsquo;s Anxiety Naturally
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Gentle, veterinarian-formulated calming drops for dogs and cats. Helps soothe anxiety during thunderstorms, travel, separation, and other stressful moments.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products" className="px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-500/30">
                Shop Products
              </Link>
              <Link href="/about" className="px-8 py-4 bg-white text-gray-900 text-lg font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Carefully formulated to support your pet&rsquo;s emotional wellbeing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a556?w=400&q=80"
                  alt="Calming Drops for Dogs"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">
                  Featured
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calming Drops for Dogs</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">Natural hemp-based formula to help soothe anxious pets during thunderstorms, travel, and separation.</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-bold text-green-600">$29.99</span>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <FaStar className="w-4 h-4" />
                    4.8
                  </div>
                </div>
                <Link href="/products" className="w-full py-3 bg-green-600 text-white text-center rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Add to Cart
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1561046809-3087e5d84e0a?w=400&q=80"
                  alt="Relaxation Treats"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Relaxation Treats</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">Soft chews with chamomile and L-theanine for daily stress support in dogs of all sizes.</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-bold text-green-600">$24.99</span>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <FaStar className="w-4 h-4" />
                    4.6
                  </div>
                </div>
                <Link href="/products" className="w-full py-3 bg-green-600 text-white text-center rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Add to Cart
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1518710395125-e3ab0f95e3d0?w=400&q=80"
                  alt="Cat Calming Spray"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cat Calming Spray</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">Gentle spray for cats to reduce anxiety during vet visits, grooming, and environmental changes.</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-bold text-green-600">$19.99</span>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <FaStar className="w-4 h-4" />
                    4.5
                  </div>
                </div>
                <Link href="/products" className="w-full py-3 bg-green-600 text-white text-center rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">Why Choose PetCalming Drops?</h2>
            <p className="text-gray-600">Quality you can trust, ingredients you can feel good about.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center hover:border-green-200 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <FaLeaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Natural Ingredients</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Formulated with plant-based ingredients for gentle, effective calming support.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center hover:border-green-200 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <FaUserMd className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Veterinarian Approved</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Developed with veterinary guidance to support your pet&rsquo;s wellbeing safely.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center hover:border-green-200 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <FaPaw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Safe for Dogs &amp; Cats</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Suitable for both dogs and cats of all sizes and breeds.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">What Pet Parents Say</h2>
            <p className="text-gray-600 mb-8">Real reviews from our community. <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Sample content</span></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">&ldquo;These drops have made such a difference for Bella during storms. She is noticeably more relaxed.&rdquo;</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-xs">S</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Sarah M.</p>
                  <p className="text-xs text-gray-500">Bella (Golden Retriever)</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">&ldquo;Great quality product. Max settles down much faster now during travel and fireworks.&rdquo;</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-xs">J</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">James L.</p>
                  <p className="text-xs text-gray-500">Max (Labrador)</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 fill-current" />
                <FaStar className="w-4 h-4 text-gray-200" />
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">&ldquo;The cat spray helps Luna stay calm during vet visits. Easy to use and effective.&rdquo;</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-xs">E</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Emily R.</p>
                  <p className="text-xs text-gray-500">Luna (Cat)</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center mt-8 text-xs text-gray-400 uppercase tracking-wider">Sample reviews displayed for illustration purposes.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">About Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Pet Calming &amp; Anxiety Drops was created to help pets and their owners live happier, calmer lives together. We understand that anxiety can affect dogs and cats in many ways &mdash; from separation anxiety to noise phobias.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our products are formulated with natural, gentle ingredients and developed with veterinary guidance to support your pet&rsquo;s emotional wellbeing without harsh chemicals or sedatives.
              </p>
              <Link href="/about" className="text-green-600 font-medium hover:underline">
                Read our story &rarr;
              </Link>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80"
                alt="Happy dog outdoors"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-green-900/90 to-transparent">
                <h3 className="text-xl font-bold text-white">Natural Calming</h3>
                <p className="text-green-100 text-sm">For dogs and cats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">Have Questions?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Reach out to our team for product recommendations, dosage guidance, or any questions about helping your pet feel calmer.
          </p>
          <Link href="/contact" className="px-8 py-4 bg-white text-green-600 rounded-xl text-lg font-medium hover:bg-gray-100 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <FaPaw className="w-5 h-5 text-green-400" />
              <span className="text-lg font-bold">PetCalming Drops</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/products" className="hover:text-white transition-colors">Products</a>
              <a href="/about" className="hover:text-white transition-colors">About</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaMapMarkerAlt className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaPhone className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Pet Calming &amp; Anxiety Drops. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}