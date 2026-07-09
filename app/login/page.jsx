'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast'; // <-- Import the toast library

// Moved OUTSIDE the main component
const InputField = ({ label, name, type = 'text', value, onChange }) => (
  <div className="relative">
    <input type={type} name={name} value={value} onChange={onChange} required placeholder=" "
      className="peer w-full border-b border-luxury-border bg-transparent pt-5 pb-2 text-luxury-text focus:border-luxury-text focus:outline-none transition-colors" />
    <label className="absolute left-0 top-2 text-xs uppercase tracking-wider text-luxury-muted transition-all peer-focus:top-0 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px]">
      {label}
    </label>
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const redirectParam = searchParams.get('redirect');
    const errorParam = searchParams.get('error');
    if (redirectParam) {
      sessionStorage.setItem('login_redirect', redirectParam);
    }
    if (errorParam) {
      toast.error('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (isRegister) {
      // --- REGISTER ---
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { full_name: formData.name } },
      });

      if (signUpError) {
        toast.error(signUpError.message); // Show toast instead of console error
        setIsLoading(false);
        return;
      }
      
      toast.success('Account created successfully! Please log in.');
      setIsRegister(false);
      setFormData({ name: '', email: '', password: '' });
      setIsLoading(false);

    } else {
      // --- LOGIN ---
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        // Show a friendly, luxury-styled toast instead of a scary console error!
        toast.error('Invalid email or password. Please try again.');
        setIsLoading(false);
        return; // Stop execution without throwing to the console
      }
      
      toast.success('Welcome back!');
      router.refresh();
      const redirectTo = sessionStorage.getItem('login_redirect') || '/';
      sessionStorage.removeItem('login_redirect');
      router.push(redirectTo);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');
    
    try {
      const redirectTo = sessionStorage.getItem('login_redirect') || '/';
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
        },
      });
      
      if (error) throw error;
    } catch (err) {
      console.error(err);
      toast.error('Failed to sign in with Google.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-luxury-text mb-2">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-luxury-muted text-sm">
            {isRegister ? 'Join our exclusive archive.' : 'Sign in to your account.'}
          </p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-3 py-4 border border-luxury-border bg-luxury-card text-luxury-text text-sm font-semibold tracking-wider uppercase hover:bg-luxury-bg transition-colors disabled:opacity-50 mb-6"
        >
          {isGoogleLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-luxury-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wider">
            <span className="bg-luxury-bg px-4 text-luxury-muted">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />}
          <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />

          <button type="submit" disabled={isLoading}
            className="w-full py-4 bg-luxury-text text-white text-sm font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors mt-8 disabled:opacity-50">
            {isLoading ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <p className="text-center text-sm text-luxury-muted mt-8">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-luxury-text font-medium hover:text-luxury-accent transition-colors underline">
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}