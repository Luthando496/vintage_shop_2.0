'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/useCartStore';
import { createClient } from '@/utils/supabase/client';
import { formatZAR } from '@/lib/mockData';

// FIX: Moved OUTSIDE the main component
const InputField = ({ label, name, type = 'text', value, onChange }) => (
  <div className="relative">
    <input type={type} name={name} value={value} onChange={onChange} required placeholder=" "
      className="peer w-full border-b border-luxury-border bg-transparent pt-5 pb-2 text-luxury-text focus:border-luxury-text focus:outline-none transition-colors" />
    <label className="absolute left-0 top-2 text-xs uppercase tracking-wider text-luxury-muted transition-all peer-focus:top-0 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px]">
      {label}
    </label>
  </div>
);

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const { items, getSubtotal, getVat, getTotal, clearCart } = useCartStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', postalCode: ''
  });

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call our API route to create the Stripe session and save the pending order
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items,
          customerDetails: formData,
          subtotal: getSubtotal(),
          vat: getVat(),
          total: getTotal(),
        }),
      });

      const session = await response.json();

      if (session.url) {
        // Redirect the user to the secure Stripe Checkout page!
        window.location.href = session.url;
      } else {
        throw new Error('Failed to create checkout session');
      }

    } catch (error) {
      console.error('Checkout Error:', error);
      alert('There was an error processing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl md:text-5xl text-luxury-text mb-12 text-center">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-2xl text-luxury-text mb-8">Shipping Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2"><InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} /></div>
            <div className="md:col-span-2"><InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} /></div>
            <div className="md:col-span-2"><InputField label="Street Address" name="address" value={formData.address} onChange={handleChange} /></div>
            <div><InputField label="City" name="city" value={formData.city} onChange={handleChange} /></div>
            <div><InputField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} /></div>
          </div>

          <h2 className="font-serif text-2xl text-luxury-text mt-16 mb-8">Payment</h2>
          <div className="p-8 border border-luxury-border bg-luxury-card text-center">
            <p className="text-luxury-muted text-sm mb-4">Secure payment powered by Stripe</p>
            <div className="flex justify-center gap-4 text-luxury-muted">
              <span className="text-xs uppercase tracking-wider border border-luxury-border px-3 py-1">Visa</span>
              <span className="text-xs uppercase tracking-wider border border-luxury-border px-3 py-1">Mastercard</span>
            </div>
            <p className="text-xs text-luxury-muted mt-6">(Currently using mock checkout. Stripe integration coming soon!)</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-luxury-card border border-luxury-border p-8 sticky top-28">
            <h2 className="font-serif text-2xl text-luxury-text mb-6">Your Order</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 flex-shrink-0 bg-luxury-bg overflow-hidden relative">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-luxury-text text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-luxury-text font-medium line-clamp-1">{item.title}</p>
                    <p className="text-xs text-luxury-muted">{item.size}</p>
                  </div>
                  <p className="text-sm text-luxury-text font-medium">{formatZAR(item.price_zar * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm border-t border-luxury-border pt-4">
              <div className="flex justify-between text-luxury-muted"><span>Subtotal</span><span className="text-luxury-text">{formatZAR(getSubtotal())}</span></div>
              <div className="flex justify-between text-luxury-muted"><span>VAT (15%)</span><span className="text-luxury-text">{formatZAR(getVat())}</span></div>
            </div>

            <div className="flex justify-between text-lg font-semibold text-luxury-text mt-4 pt-4 border-t border-luxury-border">
              <span>Total</span><span>{formatZAR(getTotal())}</span>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full mt-8 py-4 bg-luxury-text text-white text-sm font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {isSubmitting ? 'Processing...' : `Pay ${formatZAR(getTotal())}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}