import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

// DB image paths (e.g. /images/calming-salmon.jpg) don't exist locally, so we map
// products to real pet photos from Unsplash deterministically by product name.
const PET_IMAGES = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80&fm=jpg',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80&fm=jpg',
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&q=80&fm=jpg',
  'https://images.unsplash.com/photo-1545232867-e06398189e21?w=500&q=80&fm=jpg',
  'https://images.unsplash.com/photo-1585110396000-9291d1375ac3?w=500&q=80&fm=jpg',
];

const pickImage = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  }
  return PET_IMAGES[Math.abs(hash) % PET_IMAGES.length];
};

export const ProductCard = ({ product }) => {
  const image =
    product.image && !product.image.startsWith('/')
      ? product.image
      : pickImage(product.name);

  return (
    <Link href={`/products/${product._id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 280px"
          />
          {product.isFeatured && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">
              Featured
            </span>
          )}
          <span className="absolute top-3 right-3 px-2 py-1 bg-gray-900/80 text-white text-xs font-bold rounded">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description.slice(0, 120)}...</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <FaStar className="w-3 h-3 text-yellow-400" />
              <span className="font-medium text-gray-700">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-green-600 font-bold">{product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
