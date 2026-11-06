const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata = {
  title: 'Calm Techniques | PawCalm',
  description: 'Practical calming techniques for pets.',
  openGraph: { title: 'Calm Techniques | PawCalm', description: 'Practical calming techniques for pets.', type: 'website' },
  alternates: siteUrl ? { canonical: `${siteUrl}/calm-techniques` } : undefined,
};
export default function Page() {
  return <main className="min-h-screen bg-gray-50 text-gray-900 py-20"><div className="max-w-4xl mx-auto px-4"><h1 className="text-3xl font-bold text-green-800 mb-4">Calm Techniques</h1><p className="text-gray-700">Educational content coming soon.</p></div></main>;
}
