"use client";
import React from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className={`${style.contact}`}>
      <div className={`${style.contactText}`}>
        <h3>გამოგვიგზავნეთ შეტყობინება</h3>
        <p>
          ჩვენი თანამშრომლები მოგვიანებით დაგირეკავთ და უპასუხებენ თქვენს
          შეკითხვებს.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style.contactForm}`}
      >
        <article className={`${style.mailInputs}`}>
          <div className={`${style.nameInput}`}>
            <input
              type="text"
              placeholder="სახელი"
              {...register("username", {
                required: {
                  value: true,
                  message: "გრაფა ცარიელია",
                },
                minLength: {
                  value: 3,
                  message: "მინიმუმ 3 ასო",
                },
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className={`${style.mailInput}`}>
            <input
              type="text"
              placeholder="ელ.ფოსტა"
              id="email"
              {...register("email", {
                // onChange: () => setError(""),
                required: {
                  value: true,
                  message: "გრაფა ცარიელია",
                },
                minLength: {
                  value: 3,
                  message: "მინიმუმ 3 ასო",
                },
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "არასწორი ელ.ფოსტის ფორმატი",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </article>
        <textarea
          {...register("message")}
          placeholder="დატოვეთ შეტყობინება.."
          className={`${style.textAreaInput}`}
          required
          rows={6}
        />
        <button type="submit" className={`${style.submitBtn}`}>
          გაგზავნა
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
