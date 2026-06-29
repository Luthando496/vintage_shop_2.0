import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-luxury-text text-luxury-bg mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl font-bold mb-4">
              VINTAGE <span className="text-luxury-accent">&</span> CO.
            </h2>
            <p className="text-luxury-bg/70 max-w-sm text-sm leading-relaxed">
              Curating timeless vintage jackets and coats. Every piece tells a story, carefully selected for the modern wardrobe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-luxury-accent">Shop</h3>
            <ul className="space-y-3 text-sm text-luxury-bg/70">
              <li><Link href="/browse" className="hover:text-white transition-colors">All Jackets & Coats</Link></li>
              <li><Link href="/browse?category=Jackets" className="hover:text-white transition-colors">Jackets</Link></li>
              <li><Link href="/browse?category=Coats" className="hover:text-white transition-colors">Coats</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-luxury-accent">Support</h3>
            <ul className="space-y-3 text-sm text-luxury-bg/70">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/tracking" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-luxury-bg/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-luxury-bg/50">
          <p>&copy; {new Date().getFullYear()} Vintage & Co. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Crafted with care in South Africa.</p>
        </div>
      </div>
    </footer>
  );
}