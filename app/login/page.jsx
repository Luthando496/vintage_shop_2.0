'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication: If email contains 'admin', go to admin panel. Otherwise, home.
    if (formData.email.toLowerCase().includes('admin')) {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  const InputField = ({ label, name, type = 'text' }) => (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={(e) => setFormData({...formData, [name]: e.target.value})}
        required
        placeholder=" "
        className="peer w-full border-b border-luxury-border bg-transparent pt-5 pb-2 text-luxury-text focus:border-luxury-text focus:outline-none transition-colors"
      />
      <label className="absolute left-0 top-2 text-xs uppercase tracking-wider text-luxury-muted transition-all peer-focus:top-0 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px]">
        {label}
      </label>
    </div>
  );

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

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && <InputField label="Full Name" name="name" />}
          <InputField label="Email Address" name="email" type="email" />
          <InputField label="Password" name="password" type="password" />

          <button type="submit" className="w-full py-4 bg-luxury-text text-white text-sm font-semibold tracking-widest uppercase hover:bg-luxury-accent transition-colors mt-8">
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-luxury-muted mt-8">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsRegister(!isRegister)} className="text-luxury-text font-medium hover:text-luxury-accent transition-colors underline">
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>
        
        <p className="text-center text-xs text-luxury-muted mt-4">
          Hint: Use an email with "admin" (e.g., admin@store.com) to access the Admin Panel.
        </p>
      </div>
    </div>
  );
}