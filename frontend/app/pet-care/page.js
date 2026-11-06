const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata = {
  title: 'Pet Care Guides | PawCalm',
  description: 'Pet care guides for responsible pet owners.',
  openGraph: { title: 'Pet Care Guides | PawCalm', description: 'Pet care guides.', type: 'website' },
  alternates: siteUrl ? { canonical: `${siteUrl}/pet-care` } : undefined,
};
export default function Page() {
  return <main className="min-h-screen bg-gray-50 text-gray-900 py-20"><div className="max-w-4xl mx-auto px-4"><h1 className="text-3xl font-bold text-green-800 mb-4">Pet Care Guides</h1><p className="text-gray-700">Educational content coming soon.</p></div></main>;
}
