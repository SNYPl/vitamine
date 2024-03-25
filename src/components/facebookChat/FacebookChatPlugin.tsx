"use client";
import React from "react";
import style from "./style.module.scss";
import { FacebookProvider, CustomChat } from "react-facebook";

const FacebookChatPlugin = () => {
  return (
    <FacebookProvider appId="965261118546641" chatSupport>
      <CustomChat pageId="225058834026203" minimized={true} />
    </FacebookProvider>
  );
};

export default FacebookChatPlugin;
