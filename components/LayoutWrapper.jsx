'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast'; // <-- Import Toaster

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
      
      {/* Global Toast Notifications */}
      <Toaster 
        position="bottom-right" 
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#1A1A1A', // luxury-text (dark charcoal)
            color: '#FAF9F6',      // luxury-bg (off-white)
            borderRadius: '0',     // Sharp, minimalist corners
            padding: '16px 24px',
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            border: '1px solid #EAEAEA'
          },
        }}
      />
    </>
  );
}