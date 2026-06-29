// app/admin/page.jsx
import { createClient } from '@/utils/supabase/server';
import { formatZAR } from '@/lib/mockData'; // Keep the currency formatter
import Link from 'next/link';

export default async function AdminProductsPage() {
  const supabase = await createClient();

  // Fetch all products from Supabase (including sold ones, so she can see her whole inventory)
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin products:', error);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl text-luxury-text">Inventory</h1>
          <p className="text-sm text-luxury-muted mt-1">{products?.length || 0} total pieces</p>
        </div>
        <Link href="/admin/products/new" className="px-6 py-3 bg-luxury-text text-white text-xs font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors">
          + Add New Piece
        </Link>
      </div>

      <div className="bg-luxury-card border border-luxury-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-luxury-bg border-b border-luxury-border">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-luxury-muted">Product</th>
              <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-luxury-muted">Era</th>
              <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-luxury-muted">Size</th>
              <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-luxury-muted">Price</th>
              <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-luxury-muted">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-border">
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-luxury-bg/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image_url} alt={product.title} className="w-12 h-16 object-cover" />
                      <p className="text-sm font-medium text-luxury-text line-clamp-1">{product.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-luxury-muted">{product.era}</td>
                  <td className="px-6 py-4 text-sm text-luxury-muted">{product.size}</td>
                  <td className="px-6 py-4 text-sm text-luxury-text font-medium">{formatZAR(product.price_zar)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold tracking-wider uppercase ${
                      product.is_sold ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.is_sold ? 'Sold' : 'Available'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-luxury-muted">
                  No products in inventory yet. Add your first piece!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}