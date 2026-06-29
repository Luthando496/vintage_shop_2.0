// app/product/[id]/page.jsx
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { formatZAR } from '@/lib/mockData'; // Still using this helper for currency formatting
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default async function ProductDetailPage({ params }) {
  // Next.js 15 requires params to be awaited
  const { id } = await params; 
  const supabase = await createClient();

  // 1. Fetch the specific product
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (productError || !product) {
    notFound();
  }

  // 2. Fetch 3 similar products (same category, exclude current product, exclude sold)
  const { data: similarProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .eq('is_sold', false)
    .neq('id', id)
    .limit(3);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      
      {/* Elegant Breadcrumbs */}
      <nav className="text-sm text-luxury-muted mb-10">
        <Link href="/" className="hover:text-luxury-text transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/browse" className="hover:text-luxury-text transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-luxury-text truncate max-w-[200px] inline-block align-bottom">{product.title}</span>
      </nav>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
        
        {/* Left: Image Gallery */}
        {/* Note: If your DB doesn't have multiple images yet, we fallback to the single image_url */}
        <ProductGallery images={product.images?.length > 0 ? product.images : [product.image_url]} title={product.title} />

        {/* Right: Product Details */}
        <div className="lg:py-4">
          <p className="text-xs text-luxury-accent tracking-widest uppercase mb-3 font-medium">
            {product.era} · {product.category}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-luxury-text mb-4 leading-tight">
            {product.title}
          </h1>
          <p className="text-2xl md:text-3xl text-luxury-text font-medium mb-10">
            {formatZAR(product.price_zar)}
          </p>

          {/* Specs Table */}
          <div className="border-t border-b border-luxury-border py-6 mb-10 divide-y divide-luxury-border">
            <div className="flex justify-between text-sm py-3">
              <span className="text-luxury-muted uppercase tracking-wider text-xs">Condition</span>
              <span className="text-luxury-text font-medium">{product.condition}</span>
            </div>
            <div className="flex justify-between text-sm py-3">
              <span className="text-luxury-muted uppercase tracking-wider text-xs">Size</span>
              <span className="text-luxury-text font-medium">{product.size}</span>
            </div>
            <div className="flex justify-between text-sm py-3">
              <span className="text-luxury-muted uppercase tracking-wider text-xs">Gender</span>
              <span className="text-luxury-text font-medium">{product.gender}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-luxury-muted mb-4">The Story</h3>
            <p className="text-luxury-text leading-relaxed text-[15px]">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Button */}
          {/* We will connect this to the real Cart logic in the next step! */}
          <button className="w-full py-4 bg-luxury-text text-white text-sm font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors duration-300 mb-4">
            Add to Cart
          </button>
          
          <p className="text-center text-xs text-luxury-muted tracking-wide">
            Free shipping on orders over R2,000 · Authenticity guaranteed
          </p>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts && similarProducts.length > 0 && (
        <section className="border-t border-luxury-border pt-20">
          <div className="text-center mb-14">
            <p className="text-luxury-accent text-sm font-semibold tracking-widest uppercase mb-2">Curated For You</p>
            <h2 className="font-serif text-3xl md:text-4xl text-luxury-text">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}