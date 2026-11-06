import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { articles, getArticle } from '@/app/lib/articles';

export async function generateMetadata({ params }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | PawCalm`,
    description: article.description,
    openGraph: { title: article.title, description: article.description, type: 'article', images: [article.image] },
    alternates: siteUrl ? { canonical: `${siteUrl}/resources/${article.slug}` } : undefined,
  };
}


export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default function ArticlePage({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);
  return (
    <main className="min-h-screen bg-cream text-forest py-12">
      <div className="max-w-3xl mx-auto px-4">
        <nav className="text-sm text-gray-500 mb-6"><Link href="/resources" className="hover:underline">Resources</Link> / {article.title}</nav>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{article.title}</h1>
        <p className="text-sm text-teal mb-6">{article.category} · {article.readingTime} min read</p>
        <Image src={article.image} alt={article.title} width={800} height={450} className="w-full rounded-2xl object-cover mb-8" />
        <p className="text-gray-700 leading-relaxed mb-6">{article.description} This article offers general educational guidance and is not a substitute for veterinary advice.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">Practical tips</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Observe your pet's body language and respond calmly.</li>
          <li>Maintain predictable routines.</li>
          <li>Provide a quiet, comfortable resting area.</li>
          <li>Consult a veterinarian for persistent concerns.</li>
        </ul>
        <div className="mt-10 p-4 bg-beige rounded-xl text-sm text-gray-700">
          Veterinary disclaimer: This content is educational and not a diagnosis or treatment plan.
        </div>
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4">Related articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/resources/${r.slug}`} className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md">
                <span className="text-sm font-medium text-forest">{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8"><Link href="/resources" className="text-forest font-medium hover:underline">← Back to Resources</Link></div>
      </div>
    </main>
  );
}
