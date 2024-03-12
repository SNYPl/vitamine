"use client";
import React from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";
import { Spin } from "antd";

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

  const sendMessageMutation = useMutation(
    (data: Inputs) => axios.post(`/api/contact`, { ...data }),
    {
      onSuccess: (data: any) => {
        return data;
      },
      onError: (error: any) => {
        console.error("Registration error:", error);
        return error;
      },
    }
  );

  const { error, data, isLoading, isError, isSuccess } = sendMessageMutation;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    sendMessageMutation.mutate(data);
    console.log(data);
  };

  return (
    <section className={`${style.contact}`}>
      <div className={`${style.contactText}`}>
        <h3>გამოგვიგზავნეთ შეტყობინება</h3>
        <p>ჩვენი თანამშრომლები დაგიკავშირდებიან.</p>
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
            {errors.username && (
              <p className={style.error}>{errors.username.message}</p>
            )}
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
            {errors.email && (
              <p className={style.error}>{errors.email.message}</p>
            )}
          </div>
        </article>
        <textarea
          {...register("message", {
            required: {
              value: true,
              message: "გრაფა ცარიელია",
            },
            minLength: {
              value: 10,
              message: "მინიმუმ 10 ასო",
            },
          })}
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
