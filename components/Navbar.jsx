'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import useCartStore from '@/store/useCartStore';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const totalItems = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-luxury-bg/80 backdrop-blur-md z-50 border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link href="/" className="font-serif text-2xl font-bold tracking-wide text-luxury-text">
            VINTAGE <span className="text-luxury-accent">&</span> CO.
          </Link>

          <div className="hidden md:flex space-x-10 text-sm font-medium tracking-wider uppercase">
            <Link href="/" className="hover:text-luxury-accent transition-colors">Home</Link>
            <Link href="/browse" className="hover:text-luxury-accent transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-luxury-accent transition-colors">About</Link>
            <Link href="/contact" className="hover:text-luxury-accent transition-colors">Contact</Link>
          </div>

          <div className="flex items-center space-x-6">
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden md:flex items-center space-x-2 text-sm font-medium hover:text-luxury-accent transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-luxury-text text-luxury-bg flex items-center justify-center text-xs font-semibold uppercase">
                    {user.email?.charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-48 bg-luxury-card border border-luxury-border shadow-luxury z-20">
                      <div className="p-4 border-b border-luxury-border">
                        <p className="text-xs text-luxury-muted truncate">{user.email}</p>
                      </div>
                      
                      {/* --- NEW: Admin Panel Link --- */}
                      <Link href="/admin" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-3 text-xs uppercase tracking-wider text-luxury-text hover:bg-luxury-bg transition-colors border-b border-luxury-border">
                        Admin Panel
                      </Link>

                      <Link href="/tracking" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-3 text-xs uppercase tracking-wider text-luxury-text hover:bg-luxury-bg transition-colors">
                        Track Orders
                      </Link>
                      
                      <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-xs uppercase tracking-wider text-luxury-text hover:bg-luxury-bg transition-colors border-t border-luxury-border">
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden md:block text-sm font-medium hover:text-luxury-accent transition-colors">
                Account
              </Link>
            )}

            <Link href="/cart" className="relative hover:text-luxury-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-luxury-accent text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            </Link>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-4 text-center">
            <Link href="/" className="block text-sm font-medium tracking-wider uppercase" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/browse" className="block text-sm font-medium tracking-wider uppercase" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link href="/about" className="block text-sm font-medium tracking-wider uppercase" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/contact" className="block text-sm font-medium tracking-wider uppercase" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {user ? (
              <>
                <Link href="/admin" className="block text-sm font-medium tracking-wider uppercase text-luxury-accent" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
                <button onClick={handleLogout} className="block text-sm font-medium tracking-wider uppercase text-luxury-muted">Sign Out</button>
              </>
            ) : (
              <Link href="/login" className="block text-sm font-medium tracking-wider uppercase" onClick={() => setIsMenuOpen(false)}>Account</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}