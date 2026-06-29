export default function BrandPhilosophy() {
  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-8 py-32 text-center">
      <div className="w-16 h-px bg-luxury-accent mx-auto mb-8"></div>
      <h2 className="font-serif text-3xl md:text-4xl text-luxury-text mb-8 leading-snug">
        "Fashion fades, but style and quality remain."
      </h2>
      <p className="text-luxury-muted text-lg leading-relaxed max-w-2xl mx-auto mb-12">
        Every jacket and coat in our archive is hand-selected for its exceptional craftsmanship, 
        timeless silhouette, and historical significance. We believe in sustainable luxury—giving 
        beautiful, vintage garments a second life in your wardrobe.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-12 text-left">
        <div className="flex-1">
          <h3 className="font-serif text-xl text-luxury-text mb-2">Authenticated</h3>
          <p className="text-sm text-luxury-muted">Every piece is verified for era, material, and authenticity.</p>
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-xl text-luxury-text mb-2">Restored</h3>
          <p className="text-sm text-luxury-muted">Professionally cleaned and repaired to meet modern luxury standards.</p>
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-xl text-luxury-text mb-2">Curated</h3>
          <p className="text-sm text-luxury-muted">Only the top 1% of vintage finds make it into our collection.</p>
        </div>
      </div>
    </section>
  );
}