const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata = {
  title: 'Resources | PawCalm',
  description: 'Educational articles for pet wellness.',
  openGraph: { title: 'Resources | PawCalm', description: 'Educational articles.', type: 'website' },
  alternates: siteUrl ? { canonical: `${siteUrl}/resources` } : undefined,
};
export default function Layout({ children }) { return children; }
