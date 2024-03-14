import React from "react";
import style from "./style.module.scss";

interface DescriptionProps {
  name: string;
  about: string;
  description: string[];
  otherIngredients: any;
  use: string;
  warning: string;
}

const Description: React.FC<DescriptionProps> = ({
  name,
  about,
  description,
  otherIngredients,
  use,
  warning,
}) => {
  const aboutParagraphs = about?.split("*");
  return (
    <article className={`${style.description}`}>
      <div className={`${style.about}`}>
        <p className={`${style.aboutTitle}`}>{name}</p>
        {aboutParagraphs.map((el: string, id: number) => (
          <p className={`${style.aboutItem}`} key={id}>
            {el}
          </p>
        ))}
      </div>

      <div className={`${style.descriptionList}`}>
        <h3>{name} -ის ძირითადი თვისებები და მახასიათებლები:</h3>
        <ul>
          {description?.map((el: string, id: number) => (
            <li key={id}>{el}</li>
          ))}
        </ul>
      </div>

      <div className={`${style.usage}`}>
        <h3>მიღების წესი:</h3>
        <p>{use}</p>
      </div>

      <div className={`${style.otherIngredients}`}>
        <h3>სხვა ინგრენდიენტები:</h3>
        <ul>
          {otherIngredients?.map((el: string, id: number) => (
            <li key={id}>{el}</li>
          ))}
        </ul>
      </div>

      <div className={`${style.warning}`}>
        <h3>გაფრთხილება:</h3>
        <p>{warning}</p>
      </div>
    </article>
  );
};

export default Description;
