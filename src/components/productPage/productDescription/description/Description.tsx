import React from "react";
import style from "./style.module.scss";

const Description: React.FC = ({}) => {
  return (
    <article className={`${style.description}`}>
      <p>
        Last but not least, we write a post on blogs to follow on sustainable
        living without mentioning our very own blog, The Organic society. Our
      </p>
    </article>
  );
};

export default Description;
