'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Products', exact: true },
    { href: '/admin/products/new', label: 'Add Product' },
    { href: '/admin/orders', label: 'Orders' },
  ];

  return (
    <div className="min-h-screen flex bg-luxury-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-luxury-text text-luxury-bg flex flex-col fixed h-full">
        <div className="p-6 border-b border-luxury-bg/10">
          <Link href="/" className="font-serif text-xl font-bold tracking-wide">
            VINTAGE <span className="text-luxury-accent">&</span> CO.
          </Link>
          <p className="text-xs text-luxury-bg/50 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {links.map(link => {
            const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm font-medium tracking-wider uppercase transition-colors ${
                  isActive ? 'bg-luxury-accent text-white' : 'text-luxury-bg/70 hover:bg-luxury-bg/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-luxury-bg/10">
          <Link href="/" className="text-xs text-luxury-bg/50 hover:text-white transition-colors uppercase tracking-wider">
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 md:p-12">
        {children}
      </main>
    </div>
  );
}