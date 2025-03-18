"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Inputs = {
  email: string;
};

const ForgotPasswordComponent: React.FC = ({}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const forgotPassword = useMutation(
    (data: any) => axios.post(`/api/forgotPassword`, { ...data }),
    {
      onSuccess: (data: any) => {
        setSuccess(true);
        return data;
      },
      onError: (error: any) => {
        console.error("Registration error:", error);
        setError(error.response?.data?.error || 'Failed to send reset link');
        return error;
      },
    }
  );

  const { data, isLoading, isError, isSuccess, status } = forgotPassword;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    forgotPassword.mutate(data);
  };

  const handleSubmitCustom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.forgotPasswordComponent}>
      <h1>Reset Password</h1>
      
      {error && <div className={style.error}>{error}</div>}
      
      {success ? (
        <div className={style.success}>
          <h2>Email Sent!</h2>
          <p>If an account exists with that email, you ll receive a password reset link shortly.</p>
          <button 
            onClick={() => router.push('/login')} 
            className={style.backButton}
          >
            Back to Login
          </button>
        </div>
      ) : (
        <>
          <p className={style.instruction}>
            Enter your email address and we ll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleSubmitCustom}>
            <div className={style.formGroup}>
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
            
            <button 
              type="submit" 
              className={style.resetButton}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </>
      )}
      
      <div className={style.links}>
        <Link href="/login">Remember your password? Sign in</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
