"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { Badge } from "antd";
import LoginModal from "@/components/login/LoginModal";

const WishlistLink = ({ count = 0 }) => {
  const { data: session } = useSession();
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  const handleClick = (e) => {
    if (!session) {
      e.preventDefault();
      setLoginModalOpen(true);
    }
  };

  return (
    <>
      <Badge count={count} size="small">
        <Link href="/wishlist" onClick={handleClick}>
          <FaHeart />
          <span>Wishlist</span>
        </Link>
      </Badge>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        redirectUrl="/wishlist"
      />
    </>
  );
};

export default WishlistLink;
