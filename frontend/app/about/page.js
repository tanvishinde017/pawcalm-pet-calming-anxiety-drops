import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Pet Calming & Anxiety Drops</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are dedicated to providing natural, effective solutions for anxious dogs and their families.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-4">
              <li>
                Improve the quality of life for anxious dogs everywhere
              </li>
              <li>
                Provide veterinarian-approved, natural calming solutions
              </li>
              <li>
                Educate pet owners about stress reduction for dogs
              </li>
              <li>
                Build trust through transparency and quality
              </li>
            </ul>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700&q=80&fm=jpg"
            alt="Happy dog enjoying calm moments"
            width={700}
            height={500}
            className="rounded-2xl object-cover shadow-lg"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-3">Dr. Sarah Johnson, DVM</h3>
              <p className="text-gray-500 text-sm">Veterinary Advisor</p>
              <p className="text-gray-400 text-xs">Graduated UC Davis School of Veterinary Medicine, 15+ years experience in behavioral medicine</p>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-3">Michael Chen</h3>
              <p className="text-gray-500 text-sm">Product Developer</p>
              <p className="text-gray-400 text-xs">Formulation specialist with 8 years in natural pet product development</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}