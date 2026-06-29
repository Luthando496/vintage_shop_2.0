'use client';

import { useState } from 'react';

export default function ProductGallery({ images, title }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 sticky top-28">
      
      {/* Thumbnails (Left side on desktop, bottom on mobile) */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible md:w-24 flex-shrink-0 pb-2 md:pb-0">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`w-20 h-24 flex-shrink-0 border-2 transition-all duration-300 ${
              mainImage === img ? 'border-luxury-text' : 'border-transparent hover:border-luxury-muted'
            }`}
          >
            <img 
              src={img} 
              alt={`${title} thumbnail ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
          </button>
        ))}
      </div>
      
      {/* Main Image */}
      <div className="flex-1 aspect-[3/4] bg-luxury-bg overflow-hidden">
        <img 
          src={mainImage} 
          alt={title} 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>
    </div>
  );
}