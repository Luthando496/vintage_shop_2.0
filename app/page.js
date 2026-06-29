// app/page.js
import HeroCarousel from '@/components/HeroCarousel';
import GalleryGrid from '@/components/GalleryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrandPhilosophy from '@/components/BrandPhilosophy';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  // FIX: We MUST await createClient() because it is an async function
  const supabase = await createClient();

  // --- THIS IS THE SUPABASE FETCHING FUNCTION ---
  const { data: featuredProducts, error } = await supabase
    .from('products')
    .select('*')
    // .eq('is_sold', false)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Supabase Fetch Error:', error);
  }
  // ----------------------------------------------

  return (
    <>
      <HeroCarousel />
      <GalleryGrid />
      
      {/* We pass the fetched data to the component here */}
      <FeaturedProducts products={featuredProducts || []} />
      
      <BrandPhilosophy />
    </>
  );
}