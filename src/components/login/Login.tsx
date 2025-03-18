"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.module.scss';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function LoginComponent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.push('/'); // Go to homepage instead of back
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Set a cookie to remember the user's preference
      if (rememberMe) {
        document.cookie = `rememberUser=true; path=/; max-age=${30 * 24 * 60 * 60}`;
      } else {
        document.cookie = 'rememberUser=false; path=/; max-age=0';
      }

      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      if (result && result.error) {
        setError(result.error || 'Invalid email or password');
        setLoading(false);
        return;
      }

      // Redirect to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className={styles.loadingSpinner}>Loading...</div>;
  }

  return (
    <div className={styles.loginComponent}>
      <h1>Welcome Back</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.checkbox}>
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
        </div>
        
        <button 
          type="submit" 
          className={styles.loginButton}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
      
      <div className={styles.links}>
        <Link href="/forgotPassword">Forgot password?</Link>
        <Link href="/signup">Don t have an account? Sign up</Link>
      </div>
    </div>
  );
}
