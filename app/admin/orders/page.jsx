'use client';

import useAdminStore from '@/store/useAdminStore';
import { formatZAR } from '@/lib/mockData';

export default function AdminOrdersPage() {
  const orders = useAdminStore((state) => state.orders);
  const updateOrderStatus = useAdminStore((state) => state.updateOrderStatus);

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-luxury-text">Orders</h1>
        <p className="text-sm text-luxury-muted mt-1">Manage and update customer order statuses.</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-luxury-card border border-luxury-border p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 pb-6 border-b border-luxury-border">
              <div>
                <p className="text-xs text-luxury-muted uppercase tracking-wider">Order ID</p>
                <p className="text-lg text-luxury-text font-medium">{order.id}</p>
                <p className="text-sm text-luxury-muted mt-1">{order.customer_name} · {order.customer_email}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-luxury-muted uppercase tracking-wider">Total Amount</p>
                  <p className="text-lg text-luxury-text font-medium">{formatZAR(order.total_amount)}</p>
                </div>
                
                {/* Status Dropdown */}
                <div>
                  <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-1 text-right">Status</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border focus:outline-none transition-colors ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-gray-100 text-gray-800 border-gray-200'
                    }`}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm text-luxury-text">
                  <span>{item.product_title} × {item.quantity}</span>
                  <span className="text-luxury-muted">{formatZAR(item.price_at_purchase * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}