// proxy.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// Notice the function name is now 'proxy'
export async function proxy(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );

  // 1. Get the currently logged-in user
  const { data: { user } } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // 2. PROTECT ANY ROUTE STARTING WITH /admin
  if (url.pathname.startsWith('/admin')) {
    
    // If they are NOT logged in, kick them to the login page
    if (!user) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // If they ARE logged in, check the database to see if they are an admin
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    // If they don't have a profile, or is_admin is false, kick them to the home page
    if (error || !profile || !profile.is_admin) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

// Tell Next.js which routes to run this proxy on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};