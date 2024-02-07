import React from "react";
import style from "./style.module.scss";

const Review: React.FC = ({}) => {
  return (
    <article className={`${style.review}`}>
      <h3>Coming soon....</h3>

      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 100"
          width="200"
          height="100"
        >
          <rect width="100%" height="100%" fill="#FFA500" />

          <text
            x="50%"
            y="60%"
            font-family="Arial, sans-serif"
            font-size="40"
            fill="#FFFFFF"
            text-anchor="middle"
          >
            vit
            <tspan font-weight="bold" fill="#FFFFFF">
              V
            </tspan>
            it
          </text>
        </svg>
      </div>
    </article>
  );
};

export default Review;
