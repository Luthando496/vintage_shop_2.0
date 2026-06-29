'use client';

import { useState } from 'react';
import useCartStore from '@/store/useCartStore';

export default function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <button 
      onClick={handleAdd} 
      disabled={isAdded}
      className={`w-full py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-300 mb-4 ${
        isAdded 
          ? 'bg-green-800 text-white cursor-default' 
          : 'bg-luxury-text text-white hover:bg-luxury-accent'
      }`}
    >
      {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
    </button>
  );
}