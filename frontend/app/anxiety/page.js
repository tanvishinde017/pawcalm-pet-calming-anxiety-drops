const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata = {
  title: 'Understanding Anxiety | PawCalm',
  description: 'Learn about pet anxiety and emotional well-being.',
  openGraph: { title: 'Understanding Anxiety | PawCalm', description: 'Learn about pet anxiety.', type: 'website' },
  alternates: siteUrl ? { canonical: `${siteUrl}/anxiety` } : undefined,
};
export default function Page() {
  return <main className="min-h-screen bg-gray-50 text-gray-900 py-20"><div className="max-w-4xl mx-auto px-4"><h1 className="text-3xl font-bold text-green-800 mb-4">Understanding Anxiety</h1><p className="text-gray-700">Educational content coming soon.</p></div></main>;
}
