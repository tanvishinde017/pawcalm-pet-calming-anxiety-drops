const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata = {
  title: 'Contact | PawCalm',
  description: 'Get in touch with PawCalm.',
  openGraph: { title: 'Contact | PawCalm', description: 'Contact PawCalm.', type: 'website' },
  alternates: siteUrl ? { canonical: `${siteUrl}/contact` } : undefined,
};
export default function Layout({ children }) { return children; }
