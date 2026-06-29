// app/browse/page.jsx
import { createClient } from '@/utils/supabase/server';
import BrowseClient from '@/components/BrowseClient';

export default async function BrowsePage() {
  const supabase = await createClient();

  // Fetch all available products from Supabase
  const { data: allProducts, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_sold', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching browse products:', error);
  }

  return <BrowseClient allProducts={allProducts || []} />;
}