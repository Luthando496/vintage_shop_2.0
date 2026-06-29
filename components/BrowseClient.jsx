// components/BrowseClient.jsx
'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';

export default function BrowseClient({ allProducts }) {
  const [filters, setFilters] = useState({
    categories: [],
    eras: [],
    genders: [],
    priceRange: null
  });
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter the products based on the selected filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
      if (filters.eras.length > 0 && !filters.eras.includes(product.era)) return false;
      if (filters.genders.length > 0 && !filters.genders.includes(product.gender)) return false;

      if (filters.priceRange) {
        if (product.price_zar < filters.priceRange.min || product.price_zar > filters.priceRange.max) return false;
      }
      return true;
    });
  }, [filters, allProducts]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-luxury-text mb-4">The Archive</h1>
        <p className="text-luxury-muted max-w-xl mx-auto">
          Explore our curated collection of vintage jackets and coats. Every piece is one-of-a-kind.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <p className="text-sm text-luxury-muted">{filteredProducts.length} Items</p>
          <button onClick={() => setIsMobileFilterOpen(true)} className="flex items-center gap-2 px-4 py-2 border border-luxury-border text-sm font-medium tracking-wider uppercase hover:bg-luxury-text hover:text-white transition-colors">
            Filters
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)}></div>
            <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-luxury-bg p-6 overflow-y-auto shadow-xl">
              <FilterSidebar filters={filters} setFilters={setFilters} onClose={() => setIsMobileFilterOpen(false)} />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className="hidden lg:flex justify-between items-center mb-8">
            <p className="text-sm text-luxury-muted">{filteredProducts.length} Items</p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-luxury-border">
              <h3 className="font-serif text-2xl text-luxury-text mb-2">No pieces found</h3>
              <p className="text-luxury-muted">Try adjusting your filters to discover more archive pieces.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}