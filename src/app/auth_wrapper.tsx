// src/app/auth_wrapper.tsx
"use client";
// SessionProvider must be used with Client Side Rendering
// Therfore we create a separate client side component to run AuthWrapper
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
