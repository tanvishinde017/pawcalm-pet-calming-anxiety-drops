import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-green-50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-6 uppercase tracking-wider">
              <span className="relative -top-px w-2 h-2 rounded-full bg-green-500" />
              Natural Pet Wellness
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
              A Calmer, Happier Life for Every Paw.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
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

          <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-16">
            <Image
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=900&q=80&fm=jpg"
              alt="Relaxed golden retriever"
              fill
              className="object-cover object-center opacity-60 -mt-16 md:-mt-0"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Carefully formulated to support your pet&rsquo;s emotional wellbeing.</p>
          </div>
          <div id="featured-products" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured products are displayed on the /products page */}
          </div>
          <div className="mt-16 text-center">
            <Link href="/products" className="px-8 py-3 bg-green-600 text-white text-lg font-medium rounded-xl hover:bg-green-700 transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">Why PawCalm?</h2>
              <ul className="space-y-6 text-gray-600">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 flex-shrink-0">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Natural Ingredients</h3>
                    <p className="text-sm">Gentle formulas made with premium natural ingredients, safe for long-term use.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 flex-shrink-0">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Veterinarian Formulated</h3>
                    <p className="text-sm">Developed with veterinary guidance to support your pet&rsquo;s emotional wellbeing.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 flex-shrink-0">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Fast-Acting Relief</h3>
                    <p className="text-sm">Formulas designed to help pets relax during thunderstorms, travel, and separation.</p>
                  </div>
                </li>
              </ul>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700&q=80&fm=jpg"
              alt="Happy calm dog"
              width={700}
              height={500}
              className="rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">Have Questions?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Reach out to our team for product recommendations or any questions about helping your pet feel calmer.
          </p>
          <Link href="/contact" className="px-8 py-4 bg-white text-green-600 rounded-xl text-lg font-medium hover:bg-gray-100 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
