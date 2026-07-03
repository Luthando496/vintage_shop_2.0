'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function OrderStatusUpdater({ orderId, currentStatus }) {
  const supabase = createClient();
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  const handleUpdate = async (newStatus) => {
    setStatus(newStatus);
    setIsUpdating(true);
    
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
    
    setIsUpdating(false);
  };

  return (
    <select
      value={status}
      onChange={(e) => handleUpdate(e.target.value)}
      disabled={isUpdating}
      className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border focus:outline-none transition-colors disabled:opacity-50 ${
        status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' :
        status === 'Shipped' ? 'bg-blue-100 text-blue-800 border-blue-200' :
        status === 'Processing' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
        'bg-gray-100 text-gray-800 border-gray-200'
      }`}
    >
      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}