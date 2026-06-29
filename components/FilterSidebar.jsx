'use client';

export default function FilterSidebar({ filters, setFilters, onClose }) {
  const filterOptions = {
    categories: ['Jackets', 'Coats'],
    eras: ['1960s', '1970s', '1980s', '1990s'],
    genders: ['Men', 'Women', 'Unisex'],
    priceRanges: [
      { label: 'Under R1,500', min: 0, max: 1500 },
      { label: 'R1,500 - R3,000', min: 1500, max: 3000 },
      { label: 'Over R3,000', min: 3000, max: Infinity }
    ]
  };

  const handleCheckboxChange = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const handlePriceChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange?.label === range.label ? null : range
    }));
  };

  const clearAll = () => {
    setFilters({ categories: [], eras: [], genders: [], priceRange: null });
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.eras.length > 0 || filters.genders.length > 0 || filters.priceRange;

  // Reusable Checkbox Component
  const Checkbox = ({ label, type, value }) => (
    <label className="flex items-center space-x-3 cursor-pointer group py-1">
      <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors
        ${filters[type].includes(value) ? 'bg-luxury-text border-luxury-text' : 'border-luxury-muted group-hover:border-luxury-text'}`}>
        {filters[type].includes(value) && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-luxury-text group-hover:text-luxury-accent transition-colors">{label}</span>
    </label>
  );

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-2xl text-luxury-text">Filters</h2>
        <div className="flex items-center gap-4">
          {hasActiveFilters && (
            <button onClick={clearAll} className="text-xs uppercase tracking-wider text-luxury-muted hover:text-luxury-accent transition-colors">
              Clear All
            </button>
          )}
          {/* Close button for mobile */}
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-luxury-muted hover:text-luxury-text">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {/* Category */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-luxury-muted mb-3">Category</h3>
          <div className="space-y-1">
            {filterOptions.categories.map(cat => (
              <Checkbox key={cat} label={cat} type="categories" value={cat} />
            ))}
          </div>
        </div>

        {/* Era */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-luxury-muted mb-3">Era</h3>
          <div className="space-y-1">
            {filterOptions.eras.map(era => (
              <Checkbox key={era} label={era} type="eras" value={era} />
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-luxury-muted mb-3">Gender</h3>
          <div className="space-y-1">
            {filterOptions.genders.map(gen => (
              <Checkbox key={gen} label={gen} type="genders" value={gen} />
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-luxury-muted mb-3">Price Range</h3>
          <div className="space-y-1">
            {filterOptions.priceRanges.map(range => (
              <label key={range.label} className="flex items-center space-x-3 cursor-pointer group py-1">
                <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-colors
                  ${filters.priceRange?.label === range.label ? 'border-luxury-text' : 'border-luxury-muted group-hover:border-luxury-text'}`}>
                  {filters.priceRange?.label === range.label && (
                    <div className="w-2 h-2 bg-luxury-text rounded-full"></div>
                  )}
                </div>
                <span className="text-sm text-luxury-text group-hover:text-luxury-accent transition-colors">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}