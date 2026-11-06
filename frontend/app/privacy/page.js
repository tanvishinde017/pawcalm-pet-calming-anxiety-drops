const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata = {
  title: 'Privacy Notice | PawCalm',
  description: 'Privacy notice for PawCalm.',
  openGraph: { title: 'Privacy Notice | PawCalm', description: 'Privacy notice.', type: 'website' },
  alternates: siteUrl ? { canonical: `${siteUrl}/privacy` } : undefined,
};
export default function Page() {
  return <main className="min-h-screen bg-gray-50 text-gray-900 py-20"><div className="max-w-4xl mx-auto px-4"><h1 className="text-3xl font-bold text-green-800 mb-4">Privacy Notice</h1><p className="text-gray-700">Privacy information coming soon.</p></div></main>;
}
