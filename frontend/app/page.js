import Image from 'next/image';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata = {
  title: 'PawCalm – Pet Wellness & Care',
  description: 'Educational pet wellness resources for calmer, happier pets.',
  openGraph: { title: 'PawCalm – Pet Wellness & Care', description: 'Educational pet wellness resources.', images: ['/og.jpg'] },
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
};


export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="relative bg-gradient-to-br from-green-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">A Calmer, Happier Life for Every Paw</h1>
            <p className="text-lg text-gray-700 mb-8">Evidence-informed guidance on pet anxiety, calming techniques and responsible care.</p>
            <Link href="/anxiety" className="inline-block px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">Understand Anxiety</Link>
          </div>
          <Image src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80" alt="Calm dog resting" width={800} height={600} className="rounded-2xl object-cover shadow-lg" />
        </div>
      </section>
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-green-800">Explore</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { href: '/calm-techniques', title: 'Calm Techniques' },
            { href: '/pet-care', title: 'Pet Care Guides' },
            { href: '/resources', title: 'Resources' },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-green-700">{c.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="py-12 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-sm text-gray-700">
          <strong>Veterinary disclaimer:</strong> This site provides educational information only and is not a substitute for professional veterinary advice.
        </div>
      </section>
    </main>
  );
}
