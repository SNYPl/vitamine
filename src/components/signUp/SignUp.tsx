"use client";
import React from "react";
import style from "./style.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Button from "../button/Button";

type Inputs = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const signUp: React.FC = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className={style.signUp}>
      <h2>რეგისტრაცია</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${style.contactForm}`}
      >
        <div className={`${style.input}`}>
          <label htmlFor="username">სახელი</label>
          <input
            type="text"
            placeholder="სახელი"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
            })}
            style={{ border: errors.username ? "1px solid red" : "" }}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className={`${style.input}`}>
          <label htmlFor="emailInput">ელ.ფოსტა</label>
          <input
            type="text"
            placeholder="ელ.ფოსტა"
            id="emailInput"
            {...register("email", {
              required: {
                value: true,
                message: "fill fields",
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "wrong email format",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">პაროლი</label>
          <input
            type="password"
            placeholder={"პაროლი"}
            {...register("password", {
              required: {
                value: true,
                message: "Fill field",
              },
              minLength: {
                value: 8,
                message: "minimum length 8",
              },
              maxLength: {
                value: 15,
                message: "maximum length 15",
              },
              pattern: {
                value: /^[0-9a-z]+$/,
                message: "only lowercase letters & numbers",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className={`${style.input} ${style.password}`}>
          <label htmlFor="">გაიმეორეთ პაროლი</label>
          <input
            type="password"
            placeholder={"გაიმეორეთ პაროლი"}
            {...register("repeatPassword", {
              required: {
                value: true,
                message: "Fill field",
              },

              validate: (val) => {
                if (watch("password") !== val) {
                  return "Your passwords do not match";
                }
              },
            })}
          />
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        </div>

        <Button type="submit" className={style.btn}>
          რეგისტრაცია
        </Button>
      </form>

      <div className={style.createCont}>
        <Link href="/login">ან გაიარე ავტორიზაცია</Link>
      </div>
    </section>
  );
};

export default signUp;
