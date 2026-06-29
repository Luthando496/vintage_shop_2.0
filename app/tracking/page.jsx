'use client';

import { useState } from 'react';
import { mockOrders, formatZAR } from '@/lib/mockData';

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    setError('');
    const found = mockOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase().trim());
    if (found) {
      setOrder(found);
    } else {
      setOrder(null);
      setError('Order not found. Please check your Order ID.');
    }
  };

  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIndex = order ? steps.indexOf(order.status) : -1;

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-luxury-text mb-4">Track Your Order</h1>
        <p className="text-luxury-muted">Enter your Order ID to see the latest status.</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-4 mb-12 max-w-lg mx-auto">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Order ID (e.g., ord-12345)"
          className="flex-1 px-4 py-3 border border-luxury-border bg-luxury-card text-luxury-text focus:outline-none focus:border-luxury-text transition-colors"
          required
        />
        <button type="submit" className="px-8 py-3 bg-luxury-text text-white text-sm font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors">
          Track
        </button>
      </form>

      {error && <p className="text-center text-red-500 mb-8">{error}</p>}

      {order && (
        <div className="bg-luxury-card border border-luxury-border p-8 md:p-12">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-luxury-border">
            <div>
              <p className="text-xs text-luxury-muted uppercase tracking-wider">Order ID</p>
              <p className="text-lg text-luxury-text font-medium">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-luxury-muted uppercase tracking-wider">Total</p>
              <p className="text-lg text-luxury-text font-medium">{formatZAR(order.total_amount)}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      isCompleted ? 'bg-luxury-text border-luxury-text' : 'bg-luxury-bg border-luxury-border'
                    } ${isCurrent ? 'ring-4 ring-luxury-accent/20' : ''}`}></div>
                    {index < steps.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-2 ${isCompleted ? 'bg-luxury-text' : 'bg-luxury-border'}`}></div>
                    )}
                  </div>
                  <div className="pb-8">
                    <p className={`text-sm font-semibold uppercase tracking-wider ${isCompleted ? 'text-luxury-text' : 'text-luxury-muted'}`}>
                      {step}
                    </p>
                    {isCurrent && <p className="text-xs text-luxury-accent mt-1">Current Status</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <p className="text-center text-xs text-luxury-muted mt-8">
        Hint for testing: Use Order IDs <strong>ord-12345</strong> or <strong>ord-67890</strong>
      </p>
    </div>
  );
}