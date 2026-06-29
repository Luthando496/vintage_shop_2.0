'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'The Winter Archive',
    subtitle: 'Curated wool and cashmere coats from the 1960s to 1980s.',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=1600&auto=format&fit=crop',
    link: '/browse?category=Coats'
  },
  {
    id: 2,
    title: 'Rebel Leather',
    subtitle: 'Iconic 1970s and 80s leather jackets. Worn in, perfectly broken.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1600&auto=format&fit=crop',
    link: '/browse?category=Jackets'
  },
  {
    id: 3,
    title: 'Timeless Elegance',
    subtitle: 'Discover pieces that transcend trends and last a lifetime.',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1600&auto=format&fit=crop',
    link: '/browse'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh] overflow-hidden bg-luxury-text">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with dark overlay for text readability */}
          <div className="absolute inset-0">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Text Content */}
          <div className="relative h-full flex flex-col justify-center items-center text-center px-6 text-white">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl font-light max-w-2xl mb-8 text-white/90 drop-shadow-md">
              {slide.subtitle}
            </p>
            <Link 
              href={slide.link}
              className="px-8 py-3 bg-white text-luxury-text text-sm font-semibold tracking-widest uppercase hover:bg-luxury-accent hover:text-white transition-all duration-300"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      ))}

      {/* Minimalist Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-1 transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}