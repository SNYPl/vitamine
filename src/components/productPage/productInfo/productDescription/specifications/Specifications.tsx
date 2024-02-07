import React from "react";
import style from "./style.module.scss";

const Specifications: React.FC = ({}) => {
  return (
    <article className={`${style.specifications}`}>
      <div className={`${style.container}`}>
        <table className={`${style.table}`}>
          <tr>
            <td>Weight</td>
            <td>1kg</td>
          </tr>
          <tr>
            <td>Dimension</td>
            <td>30x30x</td>
          </tr>
        </table>
      </div>
    </article>
  );
};

export default Specifications;
