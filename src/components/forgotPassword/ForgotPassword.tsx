"use client";
import React from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Button from "../button/Button";

type Inputs = {
  username: string;
  password: string;
};

const ForgotPassword: React.FC = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className={style.forgot}>
      <h2>პაროლის აღდგენა</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style.contactForm}`}
      >
        <div className={`${style.input}`}>
          <label htmlFor="username">სახელი ან ელ.ფოსტა</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
            })}
            style={{ border: errors.username ? "1px solid red" : "" }}
          />
        </div>

        <Button type="submit" className={style.btn}>
          აღდგენა
        </Button>
      </form>
    </section>
  );
};

export default ForgotPassword;
