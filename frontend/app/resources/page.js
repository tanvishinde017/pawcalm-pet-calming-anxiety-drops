'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { articles, categories } from '@/app/lib/articles';

export default function ResourcesPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const filtered = useMemo(() => articles.filter((a) => {
    const matchesQ = (a.title + ' ' + a.description).toLowerCase().includes(query.toLowerCase());
    const matchesC = cat === 'All' || a.category === cat;
    return matchesQ && matchesC;
  }), [query, cat]);

  return (
    <main className="min-h-screen bg-cream text-forest py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources & Articles</h1>
        <p className="text-gray-600 mb-8">Educational articles to support your pet's well-being.</p>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-forest focus:outline-none" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="px-4 py-3 rounded-xl border border-gray-300 focus:border-forest focus:outline-none">
            <option>All</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button onClick={() => { setQuery(''); setCat('All'); }} className="px-4 py-3 rounded-xl bg-beige text-forest font-medium">Reset</button>
        </div>
        {filtered.length === 0 ? (
          <p className="text-gray-500">No articles found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <article key={a.slug} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <Image src={a.image} alt={a.title} width={400} height={240} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <span className="text-xs text-teal font-medium">{a.category} · {a.readingTime} min read</span>
                  <h2 className="text-lg font-bold mt-2 mb-2">{a.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">{a.description}</p>
                  <Link href={`/resources/${a.slug}`} className="text-forest font-medium hover:underline">Read More →</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
