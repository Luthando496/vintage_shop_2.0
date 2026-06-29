import Link from 'next/link';

const galleryItems = [
  {
    title: 'The 1970s Edit',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop',
    link: '/browse?era=1970s',
    span: 'md:col-span-2 md:row-span-2' // Large square
  },
  {
    title: 'Denim Classics',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop',
    link: '/browse?category=Jackets',
    span: 'md:col-span-1 md:row-span-1' // Small square
  },
  {
    title: 'Wool Trenches',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop',
    link: '/browse?category=Coats',
    span: 'md:col-span-1 md:row-span-1' // Small square
  },
  {
    title: 'New Arrivals',
    image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=1200&auto=format&fit=crop',
    link: '/browse',
    span: 'md:col-span-3 md:row-span-1 h-64' // Wide rectangle
  }
];

export default function GalleryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <p className="text-luxury-accent text-sm font-semibold tracking-widest uppercase mb-2">The Archive</p>
        <h2 className="font-serif text-4xl md:text-5xl text-luxury-text">Shop by Era & Style</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
        {galleryItems.map((item, index) => (
          <Link 
            href={item.link} 
            key={index} 
            className={`group relative overflow-hidden ${item.span}`}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-serif text-2xl md:text-3xl text-white font-bold tracking-wide drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}