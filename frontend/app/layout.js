import './globals.css'
import { Nav } from '@/components/ui/Nav'
import { Footer } from '@/components/ui/Footer'
import { CartProvider } from '@/components/CartProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased text-forest bg-cream">
        <CartProvider>
          <Nav />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
