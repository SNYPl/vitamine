import React from "react";
import { Skeleton } from "antd";

const Loading = () => {
  return (
    <div className="loader">
      <Skeleton active />
      <p>dawdawdawdwadawdwdadawdawd</p>
    </div>
  );
};

export default Loading;
