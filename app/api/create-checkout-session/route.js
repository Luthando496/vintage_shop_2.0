// app/api/create-checkout-session/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export async function POST(request) {
  try {
    const { items, customerDetails, subtotal, vat, total } = await request.json();

    // 1. Insert the order into Supabase as 'Pending'
    const fullAddress = `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.postalCode}`;
    
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_name: customerDetails.name,
        customer_email: customerDetails.email,
        shipping_address: fullAddress,
        subtotal: subtotal,
        vat: vat,
        total_amount: total,
        status: 'Pending',
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert the order items
    const orderItemsToInsert = items.map(item => ({
      order_id: orderData.id,
      product_id: item.id,
      price_at_purchase: item.price_zar
    }));
    await supabase.from('order_items').insert(orderItemsToInsert);

    // 3. Initialize Paystack Transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customerDetails.email,
        amount: Math.round(total * 100), // Paystack expects amount in cents (e.g., R10.00 = 1000)
        currency: 'ZAR',
        reference: orderData.id, // We use our Supabase Order ID as the Paystack reference!
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?order_id=${orderData.id}`,
        metadata: {
          order_id: orderData.id,
        }
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      throw new Error(paystackData.message || 'Failed to initialize Paystack');
    }

    // 4. Return the redirect URL to the frontend
    return NextResponse.json({ url: paystackData.data.authorization_url });

  } catch (error) {
    console.error('Paystack Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}