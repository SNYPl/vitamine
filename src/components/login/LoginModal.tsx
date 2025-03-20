"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./loginModal.module.scss";
import { Modal, message } from "antd";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

export default function LoginModal({
  isOpen,
  onClose,
  redirectUrl = "/",
}: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Store remember me preference
      document.cookie = `rememberUser=${rememberMe}; path=/; max-age=${
        rememberMe ? 30 * 24 * 60 * 60 : 0
      }`;

      console.log(`Attempting to sign in with email: ${email}`);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        message.error(result.error);
        setLoading(false);
        return;
      }

      if (result?.ok) {
        message.success("Login successful!");
        onClose();

        // Only redirect if a specific URL was provided
        if (redirectUrl && redirectUrl !== "/") {
          router.push(redirectUrl);
        }

        // Refresh the page to update auth state
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Login Required"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
      destroyOnClose
    >
      <div className={styles.loginModal}>
        <p className={styles.loginPrompt}>
          Please log in to add items to your wishlist
        </p>

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
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.registerPrompt}>
          <p>
            Don't have an account?{" "}
            <a href="/signup" onClick={() => onClose()}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
