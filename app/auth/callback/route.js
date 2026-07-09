// app/auth/callback/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // If there was a redirect URL (like /checkout), go there. Otherwise, home.
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If there was an error, redirect to login with an error message
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}