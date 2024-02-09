import React from "react";
import style from "./style.module.scss";
import ParamInfo from "../shopPage/paramInfo/ParamInfo";
import ContactInfo from "./contactInfo/ContactInfo";
import ContactForm from "./contactForm/ContactForm";

const Contact: React.FC = ({}) => {
  return (
    <section className={`${style.contact}`}>
      <ParamInfo />
      <ContactInfo />
      <ContactForm />
    </section>
  );
};

export default Contact;
