'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/useCartStore';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [status, setStatus] = useState('verifying');
  const [orderId, setOrderId] = useState(null);

    useEffect(() => {
    // Paystack passes 'reference' instead of 'session_id'
    const reference = searchParams.get('reference'); 
    const oId = searchParams.get('order_id');

    if (!reference) {
      router.push('/');
      return;
    }

    const verifyPayment = async () => {
      try {
        // Pass 'reference' to our API route
        const res = await fetch(`/api/verify-payment?reference=${reference}&order_id=${oId}`);
        const data = await res.json();

        if (data.status === 'success') {
          setStatus('success');
          setOrderId(data.order_id);
          clearCart();
        } else {
          setStatus('pending');
        }
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [searchParams, router, clearCart]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg text-center">
        
        {status === 'verifying' && (
          <div className="space-y-6">
            <svg className="animate-spin h-12 w-12 text-luxury-accent mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h1 className="font-serif text-3xl text-luxury-text">Verifying Payment...</h1>
            <p className="text-luxury-muted">Please wait while we confirm your order.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-4xl text-luxury-text mb-2">Thank You!</h1>
              <p className="text-luxury-muted text-lg">Your payment was successful.</p>
            </div>
            
            <div className="bg-luxury-card border border-luxury-border p-6 text-left">
              <p className="text-xs text-luxury-muted uppercase tracking-wider mb-1">Order ID</p>
              <p className="text-sm text-luxury-text font-medium break-all">{orderId}</p>
              <p className="text-xs text-luxury-muted mt-4">
                We have sent a confirmation to your email. You can track your order's progress using this ID.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href={`/tracking`} className="px-8 py-3 bg-luxury-text text-white text-xs font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors">
                Track Order
              </Link>
              <Link href={`/browse`} className="px-8 py-3 border border-luxury-border text-luxury-text text-xs font-semibold tracking-widest uppercase hover:bg-luxury-bg transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {(status === 'pending' || status === 'error') && (
          <div className="space-y-6">
            <h1 className="font-serif text-3xl text-luxury-text">Payment Pending</h1>
            <p className="text-luxury-muted">We are still waiting for confirmation from the bank. Please check your email shortly.</p>
            <Link href="/" className="inline-block px-8 py-3 bg-luxury-text text-white text-xs font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors">
              Return Home
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}