import React from "react";
import style from "./style.module.scss";
import { Row, Col } from "antd";

interface orderSteps {
  step: string;
}

const CartOrderStep: React.FC<orderSteps> = ({ step }) => {
  const stepInfoArray = [
    { title: "საყიდლების კალათა", num: "01", step: "step-1" },
    { title: "გადახდა", num: "02", step: "step-2" },
    { title: "გადახდის გვერდი", num: "03", step: "step-3" },
  ];

  return (
    <section className={style.shipOrder}>
      <Row>
        {stepInfoArray.map((el: any, index: any) => {
          return (
            <Col xs={24} md={8} key={el.title}>
              <div
                className={`${style.stepBlock} ${
                  el.step == step ? style.active : ""
                }`}
              >
                <div className={style.step}>
                  <h2>{el.title}</h2>
                  <span>{el.num}</span>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default CartOrderStep;
