// app/api/verify-payment/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference'); // Paystack appends ?reference=xxx to the URL
  const orderId = searchParams.get('order_id');

  if (!reference) {
    return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
  }

  try {
    // 1. Verify the transaction with Paystack
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await verifyResponse.json();

    // 2. Check if payment was successful
    if (data.status && data.data.status === 'success') {
      // 3. Update our Supabase order status from 'Pending' to 'Processing'
      if (orderId) {
        await supabase
          .from('orders')
          .update({ status: 'Processing' })
          .eq('id', orderId);
      }

      return NextResponse.json({ status: 'success', order_id: orderId });
    } else {
      return NextResponse.json({ status: 'pending' });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}