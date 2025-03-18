"use client";

export function getRememberUser(): boolean {
  if (typeof document === 'undefined') {
    return false; // Server-side
  }
  
  // Get all cookies
  const cookies = document.cookie.split(';');
  
  // Find the rememberUser cookie
  const rememberUserCookie = cookies.find(
    cookie => cookie.trim().startsWith('rememberUser=')
  );
  
  if (!rememberUserCookie) {
    return false;
  }
  
  // Get the value
  const value = rememberUserCookie.split('=')[1];
  
  return value === 'true';
}
