// app/admin/orders/page.jsx
import { createClient } from '@/utils/supabase/server';
import { formatZAR } from '@/lib/mockData';
import OrderStatusUpdater from '@/components/OrderStatusUpdater';

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  // Fetch all orders from Supabase, ordered by newest first
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        price_at_purchase,
        product_id,
        products ( title )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-luxury-text">Orders</h1>
        <p className="text-sm text-luxury-muted mt-1">Manage and update customer order statuses.</p>
      </div>

      <div className="space-y-6">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-luxury-card border border-luxury-border p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 pb-6 border-b border-luxury-border">
                <div>
                  <p className="text-xs text-luxury-muted uppercase tracking-wider">Order ID</p>
                  <p className="text-lg text-luxury-text font-medium truncate max-w-xs">{order.id}</p>
                  <p className="text-sm text-luxury-muted mt-1">{order.customer_name} · {order.customer_email}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-luxury-muted uppercase tracking-wider">Total Amount</p>
                    <p className="text-lg text-luxury-text font-medium">{formatZAR(order.total_amount)}</p>
                  </div>
                  
                  {/* The interactive dropdown component */}
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-1 text-right">Status</label>
                    <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {order.order_items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-luxury-text">
                    <span>{item.products?.title || 'Unknown Product'} × 1</span>
                    <span className="text-luxury-muted">{formatZAR(item.price_at_purchase)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border border-dashed border-luxury-border">
            <p className="text-luxury-muted">No orders yet. They will appear here once customers make a purchase.</p>
          </div>
        )}
      </div>
    </div>
  );
}