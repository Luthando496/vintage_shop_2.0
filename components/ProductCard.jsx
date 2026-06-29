import Link from 'next/link';
import { formatZAR } from '@/lib/mockData';

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-luxury-bg aspect-[3/4] mb-4">
        <img 
          src={product.image_url} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Quick View Tag */}
        <div className="absolute bottom-0 left-0 right-0 bg-luxury-text text-white text-center py-3 text-xs tracking-widest uppercase font-semibold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          View Details
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-luxury-muted tracking-wider uppercase">{product.era} · {product.condition}</p>
        <h3 className="font-serif text-lg text-luxury-text group-hover:text-luxury-accent transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-luxury-text font-medium text-sm">{formatZAR(product.price_zar)}</p>
      </div>
    </Link>
  );
}