'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

// FIX: Moved OUTSIDE the main component
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
  const supabase = createClient();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isRegister) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { data: { full_name: formData.name } },
        });
        if (signUpError) throw signUpError;
        alert('Account created successfully! Please log in.');
        setIsRegister(false);
        setFormData({ name: '', email: '', password: '' });
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (signInError) throw signInError;
        router.refresh();
        router.push('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-luxury-text mb-2">{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="text-luxury-muted text-sm">{isRegister ? 'Join our exclusive archive.' : 'Sign in to your account.'}</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />}
          <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />

          <button type="submit" disabled={isLoading} className="w-full py-4 bg-luxury-text text-white text-sm font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors mt-8 disabled:opacity-50">
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