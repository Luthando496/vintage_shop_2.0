'use client';

import Link from 'next/link';
import useCartStore from '@/store/useCartStore';
import { formatZAR } from '@/lib/mockData';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getVat, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="font-serif text-4xl text-luxury-text mb-4">Your Cart is Empty</h1>
        <p className="text-luxury-muted mb-8">Discover our curated collection of vintage outerwear.</p>
        <Link href="/browse" className="inline-block px-8 py-3 bg-luxury-text text-white text-sm font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl md:text-5xl text-luxury-text mb-12 text-center">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 p-6 bg-luxury-card border border-luxury-border">
              <Link href={`/product/${item.id}`} className="w-24 h-32 flex-shrink-0 overflow-hidden bg-luxury-bg">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              </Link>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-luxury-muted tracking-wider uppercase">{item.era} · {item.size}</p>
                    <Link href={`/product/${item.id}`} className="font-serif text-lg text-luxury-text hover:text-luxury-accent transition-colors">
                      {item.title}
                    </Link>
                  </div>
                  <p className="font-medium text-luxury-text">{formatZAR(item.price_zar * item.quantity)}</p>
                </div>

                <div className="mt-auto flex justify-between items-center pt-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-luxury-border">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-luxury-muted hover:text-luxury-text transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-medium text-luxury-text border-x border-luxury-border">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-luxury-muted hover:text-luxury-text transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-xs uppercase tracking-wider text-luxury-muted hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-luxury-card border border-luxury-border p-8 sticky top-28">
            <h2 className="font-serif text-2xl text-luxury-text mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm border-b border-luxury-border pb-6 mb-6">
              <div className="flex justify-between text-luxury-muted">
                <span>Subtotal</span>
                <span className="text-luxury-text font-medium">{formatZAR(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-luxury-muted">
                <span>VAT (15%)</span>
                <span className="text-luxury-text font-medium">{formatZAR(getVat())}</span>
              </div>
              <div className="flex justify-between text-luxury-muted">
                <span>Shipping</span>
                <span className="text-luxury-text font-medium">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-semibold text-luxury-text mb-8">
              <span>Total</span>
              <span>{formatZAR(getTotal())}</span>
            </div>

            <Link 
              href="/checkout" 
              className="block w-full text-center py-4 bg-luxury-text text-white text-sm font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors"
            >
              Proceed to Checkout
            </Link>
            
            <Link href="/browse" className="block text-center mt-4 text-xs uppercase tracking-wider text-luxury-muted hover:text-luxury-text transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}