"use client";
import React from "react";
import style from "./style.module.scss";
import Button from "@/components/button/Button";
import { signOut } from "next-auth/react";
import Link from "next/link";

const SignOut = ({ user }: { user: any }) => {
  const signOutFunction = () => {
    signOut();
  };

  return (
    <div className={style.profileCont}>
      <p className={style.profile}>
        <i className="fas fa-user" /> გამარჯობა,{" "}
        <Link href="/profile">{user?.name}</Link>
      </p>
      <Button onSubmitButton={signOutFunction}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i> გასვლა
      </Button>
    </div>
  );
};

export default SignOut;
