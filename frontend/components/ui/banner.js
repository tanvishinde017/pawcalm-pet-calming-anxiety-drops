import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaPaw, FaLeaf, FaBorderNone } from 'react-icons/fa'
import { 
  Droplets, 
  PawPrint, 
  Leaf, 
  Sun,
  ShieldCheck,
  Heart,
  TrendingUp,
  Search,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

export const Banner = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[length:600px_600px] bg-gradient-[ellipse_circle_rgba(255,255,255,0.3,_30%)_60%,_transparent_0] animate-gradient"></div>
      
      <div className="relative flex flex-col items-center justify-center px-6 pt-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
          Calming Drops for Happy, Healthy Pups
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
          Natural, vet-approved formulas to help your dog relax during thunderstorms, separation anxiety, and travel stress.
        </p>
        
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/products" className="btn-primary px-6 py-3 rounded-full font-medium transition-colors hover:opacity-90">
            Shop All Products
          </Link>
          <Link href="/about" className="btn-secondary px-6 py-3 rounded-full font-medium transition-colors hover:opacity-90">
            Learn More
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform -rotate-6 bg-green-100/30 px-8 py-20 text-center opacity-50">
        <FaPaw className="text-5xl mb-4 block animate-bounce-slow"></FaPaw>
        <p className="text-lg text-gray-600">
          Made with ❤️ for your furry family members
        </p>
      </div>
    </section>
  )
}