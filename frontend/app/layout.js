import './globals.css'
import { Nav } from '@/components/ui/Nav'
import { Footer } from '@/components/ui/Footer'
import { CartProvider } from '@/components/CartProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-900 bg-gray-50">
        <CartProvider>
          <Nav />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}