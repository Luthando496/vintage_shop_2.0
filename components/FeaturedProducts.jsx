// components/FeaturedProducts.jsx
import Link from 'next/link';
import { formatZAR } from '@/lib/mockData'; 
import ProductCard from './ProductCard';

// We add `= []` so it defaults to an empty array if 'products' is undefined
export default function FeaturedProducts({ products = [] }) {
  return (
    <section className="bg-luxury-card py-24 border-y border-luxury-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <p className="text-luxury-accent text-sm font-semibold tracking-widest uppercase mb-2">Handpicked</p>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-text">Featured Pieces</h2>
          </div>
          <Link href="/browse" className="hidden md:block text-sm font-semibold tracking-wider uppercase text-luxury-text hover:text-luxury-accent transition-colors border-b border-luxury-text hover:border-luxury-accent pb-1">
            View All Inventory
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-luxury-border">
            <p className="text-luxury-muted">No featured pieces available yet. Add some in the Admin Panel!</p>
          </div>
        )}
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/browse" className="text-sm font-semibold tracking-wider uppercase text-luxury-text hover:text-luxury-accent transition-colors border-b border-luxury-text hover:border-luxury-accent pb-1">
            View All Inventory
          </Link>
        </div>
      </div>
    </section>
  );
}