"use client";
import Link from "next/link";
import React from "react";
import { setLoginModal } from "@/store/slices/modals";
import { useDispatch } from "react-redux";

const LoginBtn: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Link href="/login" onClick={() => dispatch(setLoginModal(true))}>
      <i className="fas fa-user" />
      შესვლა
    </Link>
  );
};

export default LoginBtn;
