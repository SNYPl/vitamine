import React from "react";
import style from "./style.module.scss";

interface fact {
  info: string;
  title: string;
}

interface SpecProps {
  supplementFacts: fact[];
}

const Specifications: React.FC<SpecProps> = ({ supplementFacts }) => {
  return (
    <article className={`${style.specifications}`}>
      <div className={`${style.container}`}>
        <table className={`${style.table}`}>
          {supplementFacts.map((el: any, id: number) => (
            <tr key={id}>
              <td>{el.title}</td>
              <td>{el.info}</td>
            </tr>
          ))}
        </table>
      </div>
    </article>
  );
};

export default Specifications;
